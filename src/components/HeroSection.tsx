import { useEffect, useRef } from "react";
import colorPortraitSrc from "@/imports/ColorPortfolio2.png";

const assetPathPrefix = "/assets";
const imgEmail = `${assetPathPrefix}/f49a6.svg`;
const imgWebsite = `${assetPathPrefix}/3620d.svg`;
const imgLocation = `${assetPathPrefix}/dd8d8.svg`;
const imgArrow = `${assetPathPrefix}/b7f9a.svg`;

const PORTRAIT_CIRCLE_RADIUS = 95; // Radius in pixels for the circular reveal lens
const INACTIVITY_TIMEOUT_MS = 500; // 0.5s inactivity before shrinking out

interface HeroSectionProps {
  isRevealLayer?: boolean;
}

export default function HeroSection({ isRevealLayer = false }: HeroSectionProps) {
  const portraitRef = useRef<HTMLDivElement>(null);
  const colorImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isRevealLayer) return;
    const colorImg = colorImgRef.current;
    const container = portraitRef.current;
    if (!colorImg || !container) return;

    let targetRadius = 0;
    let currentRadius = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isRunning = false;
    let animationFrameId: number;
    let lastTime = performance.now();
    let inactivityTimer: number | undefined;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smoothly ease the reveal radius and coordinates
      const speed = targetRadius > currentRadius ? 16 : 12;
      currentRadius += (targetRadius - currentRadius) * (1 - Math.exp(-speed * dt));
      currentX += (targetX - currentX) * (1 - Math.exp(-32 * dt));
      currentY += (targetY - currentY) * (1 - Math.exp(-32 * dt));

      if (Math.abs(currentRadius) < 0.2 && targetRadius === 0) {
        currentRadius = 0;
      }

      colorImg.style.clipPath = `circle(${currentRadius.toFixed(2)}px at ${currentX.toFixed(1)}px ${currentY.toFixed(1)}px)`;

      if (currentRadius === 0 && targetRadius === 0) {
        isRunning = false;
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      targetRadius = PORTRAIT_CIRCLE_RADIUS;
      startLoop();

      if (inactivityTimer) {
        window.clearTimeout(inactivityTimer);
      }
      inactivityTimer = window.setTimeout(() => {
        targetRadius = 0;
        startLoop();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      currentX = targetX;
      currentY = targetY;
      targetRadius = PORTRAIT_CIRCLE_RADIUS;
      startLoop();

      if (inactivityTimer) {
        window.clearTimeout(inactivityTimer);
      }
      inactivityTimer = window.setTimeout(() => {
        targetRadius = 0;
        startLoop();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const handleMouseLeave = () => {
      if (inactivityTimer) {
        window.clearTimeout(inactivityTimer);
      }
      targetRadius = 0;
      startLoop();
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRevealLayer]);

  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen lg:h-screen lg:max-h-screen w-full flex flex-col justify-between relative overflow-hidden selection:bg-neutral-900 selection:text-[#F3EFE9]"
      style={{ backgroundColor: "#F3EFE9", color: "#111111" }}
    >
      {/* ── Top Header ─────────────────────────────────────────── */}
      <header
        className="w-full flex items-start justify-between px-4 sm:px-8 lg:px-14 pt-3.5 sm:pt-6 lg:pt-8 pb-0 relative z-30 shrink-0 reveal"
        style={{ "--delay": "0ms" } as React.CSSProperties}
      >
        {/* Left: Tagline */}
        <div className="flex flex-col gap-0.5 select-none">
          <span
            className="text-[#111111] text-[9.5px] sm:text-[11.5px] tracking-[1.4px] sm:tracking-[1.8px] uppercase font-bold leading-[14px] sm:leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            DESIGNING MEANINGFUL
          </span>
          <span
            className="text-[#111111] text-[9.5px] sm:text-[11.5px] tracking-[1.4px] sm:tracking-[1.8px] uppercase font-bold leading-[14px] sm:leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            DIGITAL EXPERIENCES
          </span>
        </div>

        {/* Right: Portfolio Year */}
        <div className="flex flex-col gap-0.5 items-end text-right select-none">
          <span
            className="text-[#111111] text-[9.5px] sm:text-[11.5px] tracking-[1.4px] sm:tracking-[1.8px] uppercase font-bold leading-[14px] sm:leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            PORTFOLIO
          </span>
          <span
            className="text-[#111111] text-[9.5px] sm:text-[11.5px] tracking-[1.4px] sm:tracking-[1.8px] uppercase font-bold leading-[14px] sm:leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            2026
          </span>
        </div>
      </header>

      {/* ── Mobile Main Hero Area (< lg) ───────────────────────── */}
      <main className="lg:hidden w-full flex-1 min-h-0 flex flex-col justify-center px-4 sm:px-8 py-2 relative z-10 overflow-hidden">
        {/* Horizontal Composition: Name (Left 58%) + Portrait (Right 42%) */}
        <div className="w-full flex flex-row items-end justify-between gap-2 sm:gap-4 relative">
          {/* Left: Dominant Name Typography */}
          <div className="w-[58%] flex flex-col justify-end z-20 pb-0.5">
            <h1
              className="text-[#222222] font-bold uppercase tracking-[-0.02em] leading-[0.84] text-[clamp(40px,11.8vw,68px)] select-none reveal"
              style={{ fontFamily: "'Oswald', sans-serif", "--delay": "100ms" } as React.CSSProperties}
            >
              AYUSH<br />ANAND
            </h1>
          </div>

          {/* Right: Portrait & Circular Black Background */}
          <div
            className="w-[42%] relative flex items-end justify-center pointer-events-none reveal"
            style={{ "--delay": "180ms" } as React.CSSProperties}
          >
            {/* Background Dark Circle */}
            <div
              className="hero-backdrop-circle absolute rounded-full bg-[#222222] pointer-events-none transition-transform duration-700 w-[min(38vw,165px)] h-[min(38vw,165px)] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
              style={{ zIndex: 1 }}
            />

            {/* Tight Foreground Portrait */}
            <div
              className="portrait-container relative inline-flex items-end justify-center select-none"
              style={{ zIndex: 10, marginBottom: "-1px" }}
            >
              <img
                src={colorPortraitSrc}
                alt="Ayush Anand (B&W)"
                className="max-w-none select-none block w-full h-auto max-h-[clamp(145px,40vw,225px)] object-contain object-bottom"
                style={{
                  filter: isRevealLayer
                    ? "drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.09))"
                    : "grayscale(100%) contrast(105%) drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.09))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Subtitle, Description & Underline (Placed directly below the Name + Portrait composition) */}
        <div className="w-full flex flex-col mt-2.5 sm:mt-4 z-20">
          <p
            className="text-[#111111] text-[10.5px] sm:text-[12.5px] tracking-[2px] sm:tracking-[3.2px] uppercase font-bold select-none reveal"
            style={{ fontFamily: "'Inter', sans-serif", "--delay": "220ms" } as React.CSSProperties}
          >
            DEVELOPER &amp; PROBLEM SOLVER
          </p>

          <p
            className="mt-1.5 mb-2.5 sm:mb-3.5 text-[#222222] text-[12px] sm:text-[13.5px] leading-[1.45] font-medium max-w-[380px] reveal"
            style={{ fontFamily: "'Inter', sans-serif", "--delay": "320ms" } as React.CSSProperties}
          >
            I build digital experiences that are intentional, impactful, and built to last.
          </p>

          <div
            className="hero-underline bg-[#111111] h-[2.5px] sm:h-[3px] w-[50px] sm:w-[65px] reveal"
            style={{ "--delay": "400ms" } as React.CSSProperties}
          />
        </div>
      </main>

      {/* ── Desktop Main Hero Area (lg:) ───────────────────────── */}
      <main className="hidden lg:flex w-full flex-1 min-h-0 flex-row items-stretch justify-between px-14 pt-12 pb-0 relative z-10 overflow-hidden">
        {/* Left Column: Typography & Bio */}
        <div className="flex-1 flex flex-col justify-end pb-8 z-20 max-w-2xl">
          <h1
            className="text-[#222222] font-bold uppercase tracking-[-0.02em] leading-[0.86] text-[clamp(75px,12.8vw,190px)] select-none reveal"
            style={{ fontFamily: "'Oswald', sans-serif", "--delay": "100ms" } as React.CSSProperties}
          >
            AYUSH<br />ANAND
          </h1>

          <p
            className="mt-7 text-[#111111] text-[clamp(12.5px,1.3vw,18.5px)] tracking-[4.2px] uppercase font-bold select-none reveal"
            style={{ fontFamily: "'Inter', sans-serif", "--delay": "220ms" } as React.CSSProperties}
          >
            DEVELOPER &amp; PROBLEM SOLVER
          </p>

          <p
            className="mt-4 mb-7 text-[#222222] text-[clamp(13px,1.05vw,16px)] leading-[1.55] font-medium max-w-[460px] reveal"
            style={{ fontFamily: "'Inter', sans-serif", "--delay": "320ms" } as React.CSSProperties}
          >
            I build digital experiences that are intentional, impactful, and built to last.
          </p>

          {/* Left Decorative Underline */}
          <div
            className="hero-underline bg-[#111111] h-[3.5px] w-[80px] reveal"
            style={{ "--delay": "400ms" } as React.CSSProperties}
          />
        </div>

        {/* Right Column: Circle Backdrop + Tight Foreground Portrait with Circular Color Reveal */}
        <div
          className="flex-1 min-h-0 relative flex items-end justify-end h-full pointer-events-none reveal"
          style={{ "--delay": "180ms" } as React.CSSProperties}
        >
          {/* Background Dark Circle */}
          <div
            className="hero-backdrop-circle absolute rounded-full bg-[#222222] pointer-events-none transition-transform duration-700"
            style={{
              width: "min(35.5vw, 58vh, 530px)",
              height: "min(35.5vw, 58vh, 530px)",
              right: "calc(clamp(-6px, 0.5vw, 20px) + 60px)",
              top: "40%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          />

          {/* Tight Foreground Portrait Container */}
          <div
            ref={portraitRef}
            className="portrait-container relative inline-flex items-end justify-center pointer-events-auto cursor-pointer select-none"
            style={{
              zIndex: 10,
              marginRight: "clamp(10px, 3.5vw, 55px)",
              marginBottom: "-1px",
            }}
          >
            {/* Black and White Base Portrait */}
            <img
              src={colorPortraitSrc}
              alt="Ayush Anand (B&W)"
              className="max-w-none select-none block"
              style={{
                height: "min(58vw, 84vh, 830px)",
                width: "auto",
                objectFit: "contain",
                objectPosition: "center bottom",
                filter: isRevealLayer
                  ? "drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.09))"
                  : "grayscale(100%) contrast(105%) drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.09))",
              }}
            />

            {/* Color Portrait Stacked on Top - Clipped to Cursor Circle */}
            <img
              ref={colorImgRef}
              src={colorPortraitSrc}
              alt="Ayush Anand (Color Reveal)"
              className="color-portrait max-w-none select-none absolute inset-0 w-full h-full pointer-events-none"
              style={{
                objectFit: "contain",
                objectPosition: "center bottom",
                willChange: "clip-path",
                clipPath: isRevealLayer ? undefined : "circle(0px at -100px -100px)",
                filter:
                  "drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.09))",
              }}
            />
          </div>
        </div>
      </main>

      {/* ── Horizontal Divider Line ────────────────────────────── */}
      <div className="w-full px-4 sm:px-8 lg:px-14 relative z-20 shrink-0">
        <hr className="w-full border-t border-black/25 m-0 p-0" />
      </div>

      {/* ── Bottom Section / Contact Footer Strip ─── */}
      <footer
        className="w-full px-4 sm:px-8 lg:px-14 pt-2.5 sm:pt-4 pb-3 sm:pb-5 relative z-20 shrink-0 reveal"
        style={{ "--delay": "450ms" } as React.CSSProperties}
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 lg:gap-4">
          {/* Contact Information Blocks */}
          <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-6 lg:gap-11">
            {/* Email Block */}
            <a
              href="mailto:ayush.anand.giri@gmail.com"
              className="flex items-center gap-1.5 sm:gap-3 group shrink-0"
            >
              <img
                alt=""
                src={imgEmail}
                className="w-3.5 h-3.5 sm:w-[20px] sm:h-[20px] shrink-0"
              />
              <div className="flex flex-col">
                <span
                  className="text-[#111111] text-[8.5px] sm:text-[10px] tracking-[1.4px] sm:tracking-[1.6px] uppercase font-bold leading-none mb-0.5 sm:mb-1 group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  EMAIL
                </span>
                <span
                  className="text-[#111111] text-[10.5px] sm:text-[13.5px] font-medium leading-none group-hover:text-[#FF5722] transition-colors truncate max-w-[135px] xs:max-w-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  ayush.anand.giri@gmail.com
                </span>
              </div>
            </a>

            {/* Vertical Separator */}
            <div className="hidden xs:block w-[1px] h-5 sm:h-7 bg-black/20 shrink-0" />

            {/* Website Block */}
            <a
              href="https://ayushanand.dev"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 sm:gap-3 group shrink-0"
            >
              <img
                alt=""
                src={imgWebsite}
                className="w-3.5 h-3.5 sm:w-[20px] sm:h-[20px] shrink-0"
              />
              <div className="flex flex-col">
                <span
                  className="text-[#111111] text-[8.5px] sm:text-[10px] tracking-[1.4px] sm:tracking-[1.6px] uppercase font-bold leading-none mb-0.5 sm:mb-1 group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  WEBSITE
                </span>
                <span
                  className="text-[#111111] text-[10.5px] sm:text-[13.5px] font-medium leading-none group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  ayushanand.dev
                </span>
              </div>
            </a>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-[1px] h-5 sm:h-7 bg-black/20 shrink-0" />

            {/* Location Block */}
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-3 shrink-0">
              <img
                alt=""
                src={imgLocation}
                className="w-3.5 h-3.5 sm:w-[20px] sm:h-[20px] shrink-0"
              />
              <div className="flex flex-col">
                <span
                  className="text-[#111111] text-[8.5px] sm:text-[10px] tracking-[1.4px] sm:tracking-[1.6px] uppercase font-bold leading-none mb-0.5 sm:mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  LOCATION
                </span>
                <span
                  className="text-[#111111] text-[10.5px] sm:text-[13.5px] font-medium leading-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  India
                </span>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <button
            onClick={handleScrollToContact}
            className="w-full sm:w-[225px] lg:w-[245px] border border-[#111111] px-3 py-2 sm:py-2.5 flex flex-row sm:flex-col justify-between items-center sm:items-stretch gap-2 shrink-0 bg-transparent min-h-[42px] sm:min-h-[64px] hover:border-[#FF5722] group cursor-pointer transition-all duration-200"
          >
            <p
              className="text-[#111111] text-[8.5px] sm:text-[10px] tracking-[1.1px] sm:tracking-[1.4px] uppercase font-bold leading-tight sm:leading-[1.35] text-left group-hover:text-[#FF5722] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="sm:hidden">LET'S BUILD SOMETHING GREAT TOGETHER</span>
              <span className="hidden sm:inline">LET'S BUILD<br />SOMETHING<br />GREAT TOGETHER</span>
            </p>
            <div className="flex justify-end sm:-mt-3.5 shrink-0">
              <img
                alt=""
                src={imgArrow}
                className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform"
              />
            </div>
          </button>
        </div>
      </footer>
    </section>
  );
}
