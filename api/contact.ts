import { Resend } from "resend";

// Simple in-memory rate limiter: max 5 requests per 15 minutes per IP
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

// Note: In-memory rate limiting only works within a single serverless instance.
// For production, consider using a persistent store like Upstash Redis.

export interface ContactRequestBody {
  email?: string;
  message?: string;
  hp?: string; // Honeypot field
}

export async function handleContactSubmission(
  body: ContactRequestBody,
  clientIp: string = "unknown",
  env: Record<string, string | undefined> = process.env
): Promise<{ status: number; body: { success?: boolean; message?: string; error?: string } }> {
  // 1. Honeypot check (silently drop bot submissions)
  if (body.hp && body.hp.trim().length > 0) {
    return {
      status: 200,
      body: { success: true, message: "Message received" },
    };
  }

  // 2. Rate limiting check
  if (clientIp !== "unknown" && isRateLimited(clientIp)) {
    return {
      status: 429,
      body: {
        error: "Too many requests. Please wait a few minutes before sending another message.",
      },
    };
  }

  // 3. Payload validation
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!email) {
    return {
      status: 400,
      body: { error: "Email address is required." },
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 254) {
    return {
      status: 400,
      body: { error: "Please enter a valid email address." },
    };
  }

  if (!message) {
    return {
      status: 400,
      body: { error: "Message cannot be empty." },
    };
  }

  if (message.length < 5) {
    return {
      status: 400,
      body: { error: "Message is too short (minimum 5 characters)." },
    };
  }

  if (message.length > 5000) {
    return {
      status: 400,
      body: { error: "Message is too long (maximum 5000 characters)." },
    };
  }

  // 4. Resend API setup
  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim().length === 0 || apiKey.startsWith("re_your_api_key")) {
    return {
      status: 500,
      body: {
        error:
          "Email service is not configured yet. Please set a valid RESEND_API_KEY in your .env file.",
      },
    };
  }

  const toEmail =
    env.CONTACT_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "hello@ayushanand.dev";
  const fromEmail =
    env.CONTACT_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  try {
    const resend = new Resend(apiKey);
    const escapedMessage = message
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    const emailResponse = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Portfolio Inquiry] Message from ${email}`,
      text: `New message from: ${email}\nDate: ${new Date().toUTCString()}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #F3EFE9; color: #111111; border-radius: 8px; border: 1px solid #d5cfc5;">
          <h2 style="font-size: 20px; font-weight: bold; text-transform: uppercase; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #FF5722; padding-bottom: 8px;">
            New Portfolio Message
          </h2>
          <table style="width: 100%; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="font-weight: bold; width: 80px; padding: 4px 0; color: #555;">From:</td>
              <td style="padding: 4px 0;"><a href="mailto:${email}" style="color: #FF5722; text-decoration: none; font-weight: 500;">${email}</a></td>
            </tr>
            <tr>
              <td style="font-weight: bold; width: 80px; padding: 4px 0; color: #555;">Received:</td>
              <td style="padding: 4px 0; color: #666;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <div style="margin-top: 16px;">
            <div style="font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #777; margin-bottom: 8px;">Message:</div>
            <div style="background-color: #FFFFFF; border-left: 4px solid #FF5722; padding: 16px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; border-radius: 4px; color: #111111;">${escapedMessage}</div>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #888; text-align: center; border-top: 1px solid #e0dad0; padding-top: 12px;">
            Hit reply directly to reply to <strong>${email}</strong>.
          </p>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend API Error:", emailResponse.error);
      return {
        status: 400,
        body: { error: emailResponse.error.message || "Failed to send email." },
      };
    }

    return {
      status: 200,
      body: { success: true, message: "Message sent successfully!" },
    };
  } catch (err: any) {
    console.error("Error sending contact email:", err);
    return {
      status: 500,
      body: { error: err.message || "Internal server error while sending email." },
    };
  }
}

// Serverless function default export (for Vercel / Netlify / Node standard handlers)
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const clientIp =
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
    req.socket?.remoteAddress ||
    "unknown";

  const result = await handleContactSubmission(req.body, clientIp);
  return res.status(result.status).json(result.body);
}
