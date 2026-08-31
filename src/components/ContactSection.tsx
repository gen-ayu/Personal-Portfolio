import { useState } from "react";

export interface ContactFormState {
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  message: string;
  setMessage: (message: string) => void;
  honeypot: string;
  setHoneypot: (hp: string) => void;
  status: "idle" | "loading" | "success" | "error";
  setStatus: (status: "idle" | "loading" | "success" | "error") => void;
  errorMessage: string;
  setErrorMessage: (msg: string) => void;
}

interface ContactSectionProps {
  isRevealLayer?: boolean;
  formState?: ContactFormState;
}

export default function ContactSection({
  isRevealLayer = false,
  formState: externalFormState,
}: ContactSectionProps) {
  // Local state fallback if no external state is provided
  const [localIsFormOpen, setLocalIsFormOpen] = useState(false);
  const [localEmail, setLocalEmail] = useState("");
  const [localMessage, setLocalMessage] = useState("");
  const [localHoneypot, setLocalHoneypot] = useState("");
  const [localStatus, setLocalStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [localErrorMessage, setLocalErrorMessage] = useState("");

  const isFormOpen = externalFormState ? externalFormState.isFormOpen : localIsFormOpen;
  const setIsFormOpen = externalFormState ? externalFormState.setIsFormOpen : setLocalIsFormOpen;
  const email = externalFormState ? externalFormState.email : localEmail;
  const setEmail = externalFormState ? externalFormState.setEmail : setLocalEmail;
  const message = externalFormState ? externalFormState.message : localMessage;
  const setMessage = externalFormState ? externalFormState.setMessage : setLocalMessage;
  const honeypot = externalFormState ? externalFormState.honeypot : localHoneypot;
  const setHoneypot = externalFormState ? externalFormState.setHoneypot : setLocalHoneypot;
  const status = externalFormState ? externalFormState.status : localStatus;
  const setStatus = externalFormState ? externalFormState.setStatus : setLocalStatus;
  const errorMessage = externalFormState ? externalFormState.errorMessage : localErrorMessage;
  const setErrorMessage = externalFormState ? externalFormState.setErrorMessage : setLocalErrorMessage;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRevealLayer) return; // Prevent duplicate submissions from reveal layer
    setErrorMessage("");

    // Client-side validation
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!trimmedMessage) {
      setErrorMessage("Please write a message before submitting.");
      setStatus("error");
      return;
    }

    if (trimmedMessage.length < 5) {
      setErrorMessage("Message is too short (minimum 5 characters).");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          message: trimmedMessage,
          hp: honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setEmail("");
      setMessage("");
      setHoneypot("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again or email directly."
      );
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#F3EFE9] text-[#111111] pt-14 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-8 lg:px-14 relative z-10 selection:bg-neutral-900 selection:text-[#F3EFE9]"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh] sm:min-h-[70vh]">
        {/* Top Area: Big Headline & Intro */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8 mb-8 sm:mb-16">
            <div className="max-w-4xl reveal" style={{ "--delay": "0ms" } as React.CSSProperties}>
              <span className="text-[#FF5722] font-mono text-[13px] sm:text-[14px] font-semibold tracking-wider block mb-2 sm:mb-3">
                05 / 05
              </span>
              <h2
                className="text-[clamp(44px,11.5vw,165px)] font-bold uppercase tracking-[-0.03em] leading-[0.84] text-[#111111]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Let's<br />
                make<br />
                something.
              </h2>
            </div>

            <div
              className="lg:max-w-md lg:pt-10 w-full reveal"
              style={{ "--delay": "120ms" } as React.CSSProperties}
            >
              <p className="text-[#222222]/85 text-[14.5px] sm:text-[17px] leading-relaxed font-sans">
                Have a sharp problem, a half-formed idea, or a product that needs a little more care? I would like to hear about it.
              </p>

              {/* Contact Actions / Interactive Form with Smooth Open/Close Animation */}
              <div className="mt-6 sm:mt-10 relative">
                {/* Collapsed Link View */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isFormOpen
                      ? "opacity-0 pointer-events-none -translate-y-2 max-h-0 overflow-hidden"
                      : "opacity-100 translate-y-0 max-h-[160px] flex flex-col gap-3.5 sm:gap-4"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(true);
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    className="inline-flex items-center gap-2.5 sm:gap-3 text-[12.5px] sm:text-[14px] font-bold tracking-[1.5px] sm:tracking-[2px] uppercase text-[#111111] hover:text-[#FF5722] border-b border-black/50 hover:border-[#FF5722] pb-1.5 w-fit group cursor-pointer text-left transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span>START A CONVERSATION</span>
                    <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <a
                    href="https://drive.google.com/file/d/1ivuQYSnACICeMG0jYIJxLGTpxrwNemO5/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 sm:gap-3 text-[12.5px] sm:text-[14px] font-bold tracking-[1.5px] sm:tracking-[2px] uppercase text-[#111111] hover:text-[#FF5722] border-b border-black/50 hover:border-[#FF5722] pb-1.5 w-fit group"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span>REQUEST RESUME</span>
                    <span className="text-base group-hover:translate-y-1 transition-transform">↓</span>
                  </a>
                </div>

                {/* Expanded Form Box with Smooth Slide/Fade Transition */}
                <div
                  className={`contact-form-box bg-[#EAE4DC] border border-[#111111]/30 rounded-none relative transition-all duration-500 ease-in-out overflow-hidden ${
                    isFormOpen
                      ? "opacity-100 translate-y-0 max-h-[600px] p-4 sm:p-6 pointer-events-auto shadow-sm"
                      : "opacity-0 translate-y-3 max-h-0 p-0 border-transparent pointer-events-none"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/15 contact-form-divider">
                    <span
                      className="contact-header-title text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-[1.5px] text-[#111111]"
                    >
                      SEND A DIRECT MESSAGE
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="contact-close-btn text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-black/70 hover:text-[#FF5722] cursor-pointer transition-colors"
                    >
                      [ CLOSE × ]
                    </button>
                  </div>

                  {status === "success" ? (
                    <div className="py-4 text-center">
                      <div className="w-9 h-9 mx-auto mb-3 rounded-full bg-[#FF5722]/15 text-[#FF5722] flex items-center justify-center font-bold text-lg">
                        ✓
                      </div>
                      <p
                        className="font-bold text-[14px] uppercase tracking-wider text-[#111111] mb-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Message Sent
                      </p>
                      <p className="text-[13px] text-[#222222]/80 font-sans mb-5">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          setErrorMessage("");
                        }}
                        className="text-[11px] font-mono font-bold tracking-wider uppercase underline hover:text-[#FF5722] cursor-pointer"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
                      {/* Honeypot anti-spam field (hidden from humans) */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          name="website_url_hp"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>

                      {/* Email Field */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-email"
                          className="contact-field-label text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-[1.5px] text-[#111111]"
                        >
                          YOUR EMAIL <span className="text-[#FF5722]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={status === "loading" || isRevealLayer}
                          className="contact-input w-full bg-[#F3EFE9] border border-black/35 px-3 py-2 text-[16px] sm:text-[13.5px] text-[#111111] placeholder:text-black/35 focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>

                      {/* Message Field */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-message"
                          className="contact-field-label text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-[1.5px] text-[#111111]"
                        >
                          YOUR MESSAGE <span className="text-[#FF5722]">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={4}
                          placeholder="Tell me about your project, idea, or challenge..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          disabled={status === "loading" || isRevealLayer}
                          className="contact-textarea w-full bg-[#F3EFE9] border border-black/35 px-3 py-2 text-[16px] sm:text-[13.5px] text-[#111111] placeholder:text-black/35 focus:outline-none focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] transition-colors resize-y min-h-[90px]"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        />
                      </div>

                      {/* Error Alert */}
                      {status === "error" && errorMessage && (
                        <div className="p-2.5 bg-red-500/10 border border-red-500/30 text-red-900 text-[12px] leading-snug">
                          {errorMessage}
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="flex items-center justify-between pt-1 gap-3">
                        <button
                          type="button"
                          onClick={() => setIsFormOpen(false)}
                          className="contact-cancel-btn text-[10.5px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-black/60 hover:text-black cursor-pointer transition-colors"
                        >
                          CANCEL
                        </button>

                        <button
                          type="submit"
                          disabled={status === "loading" || isRevealLayer}
                          className="contact-submit-btn bg-[#111111] text-[#F3EFE9] px-4 sm:px-5 py-2.5 text-[10.5px] sm:text-[11.5px] font-mono font-bold tracking-[1.5px] sm:tracking-[2px] uppercase hover:bg-[#FF5722] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-2"
                        >
                          {status === "loading" ? (
                            <>
                              <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>SENDING...</span>
                            </>
                          ) : (
                            <>
                              <span>SEND MESSAGE</span>
                              <span>→</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Brand, Socials, Back to Top */}
        <div
          className="pt-8 sm:pt-12 mt-8 sm:mt-12 border-t border-black/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 reveal"
          style={{ "--delay": "160ms" } as React.CSSProperties}
        >
          <span
            className="font-mono text-[11px] sm:text-[11.5px] uppercase tracking-[2px] sm:tracking-[2.2px] text-[#111111] font-bold"
          >
            AYUSH ANAND / 2026
          </span>

          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <a
              href="https://github.com/gen-ayu"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#111111] hover:text-[#FF5722]"
            >
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GITHUB</span>
            </a>

            <a
              href="https://www.linkedin.com/in/ayush-anand-giri"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#111111] hover:text-[#FF5722]"
            >
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LINKEDIN</span>
            </a>

            <button
              onClick={handleScrollToTop}
              className="text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-[#111111] hover:text-[#FF5722] flex items-center gap-1.5 cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
