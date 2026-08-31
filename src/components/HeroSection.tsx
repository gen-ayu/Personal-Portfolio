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
      className="h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between relative overflow-hidden selection:bg-neutral-900 selection:text-[#F3EFE9]"
      style={{ backgroundColor: "#F3EFE9", color: "#111111" }}
    >
      {/* ── Top Header ─────────────────────────────────────────── */}
      <header
        className="w-full flex items-start justify-between px-5 sm:px-8 lg:px-14 pt-4 sm:pt-6 lg:pt-8 pb-0 relative z-30 shrink-0 reveal"
        style={{ "--delay": "0ms" } as React.CSSProperties}
      >
        {/* Left: Tagline */}
        <div className="flex flex-col gap-0.5 select-none">
          <span
            className="text-[#111111] text-[9px] sm:text-[11.5px] tracking-[1.4px] sm:tracking-[1.8px] uppercase font-bold leading-[13px] sm:leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            DESIGNING MEANINGFUL
          </span>
          <span
            className="text-[#111111] text-[9px] sm:text-[11.5px] tracking-[1.4px] sm:tracking-[1.8px] uppercase font-bold leading-[13px] sm:leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            DIGITAL EXPERIENCES
          </span>
        </div>

        {/* Right: Portfolio Year */}
        <div className="flex flex-col gap-0.5 items-end text-right select-none">
          <span
            className="text-[#111111] text-[9px] sm:text-[11.5px] tracking-[1.4px] sm:tracking-[1.8px] uppercase font-bold leading-[13px] sm:leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            PORTFOLIO
          </span>
          <span
            className="text-[#111111] text-[9px] sm:text-[11.5px] tracking-[1.4px] sm:tracking-[1.8px] uppercase font-bold leading-[13px] sm:leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            2026
          </span>
        </div>
      </header>

      {/* ── Mobile Main Hero Area (< lg) ───────────────────────── */}
      <main className="lg:hidden w-full flex-1 min-h-0 relative overflow-hidden px-5 sm:px-8 pt-2 pb-0 flex flex-col justify-between z-10">
        {/* Background Dark Circle */}
        <div
          className="hero-backdrop-circle absolute rounded-full bg-[#181818] pointer-events-none transition-transform duration-700 w-[78vw] h-[78vw] max-w-[340px] max-h-[340px] right-[-14vw] sm:right-[-6vw] top-[10%] sm:top-[12%]"
          style={{ zIndex: 1 }}
        />

        {/* Large Editorial Portrait (Occupies 60–65% width, anchored to bottom right) */}
        <div
          className="portrait-container absolute right-[-10vw] sm:right-[-3vw] bottom-0 h-[82%] max-h-[480px] w-auto select-none pointer-events-none flex items-end justify-end"
          style={{ zIndex: 10 }}
        >
          <img
            src={colorPortraitSrc}
            alt="Ayush Anand (B&W)"
            className="max-w-none select-none block h-full w-auto object-contain object-bottom"
            style={{
              filter: isRevealLayer
                ? "drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.09))"
                : "grayscale(100%) contrast(108%) drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.09))",
            }}
          />
        </div>

        {/* Foreground Typography Layer (Overlaps the portrait and circle) */}
        <div className="relative z-20 flex flex-col justify-start max-w-[75%] sm:max-w-[70%] pt-1 sm:pt-3">
          {/* Extremely Large AYUSH ANAND Typography */}
          <h1
            className="text-[#181818] font-bold uppercase tracking-[-0.03em] leading-[0.80] text-[clamp(64px,19.2vw,92px)] select-none reveal"
            style={{
              fontFamily: "'Oswald', sans-serif",
              WebkitTextStroke: "1px rgba(243, 239, 233, 0.95)",
              paintOrder: "stroke fill",
              "--delay": "100ms",
            } as React.CSSProperties}
          >
            AYUSH<br />ANAND
          </h1>

          {/* Subtitle */}
          <p
            className="mt-3.5 sm:mt-5 text-[#111111] text-[10.5px] sm:text-[12.5px] tracking-[2.4px] sm:tracking-[3.4px] uppercase font-bold select-none reveal"
            style={{ fontFamily: "'Inter', sans-serif", "--delay": "220ms" } as React.CSSProperties}
          >
            DEVELOPER &amp; PROBLEM SOLVER
          </p>

          {/* Bio Description */}
          <p
            className="mt-2 mb-3 sm:mb-4 text-[#222222] text-[12px] sm:text-[13.5px] leading-[1.42] font-medium max-w-[205px] sm:max-w-[240px] reveal"
            style={{ fontFamily: "'Inter', sans-serif", "--delay": "320ms" } as React.CSSProperties}
          >
            I build digital experiences that are intentional, impactful, and built to last.
          </p>

          {/* Decorative Underline */}
          <div
            className="hero-underline bg-[#111111] h-[3px] w-[46px] sm:w-[58px] reveal"
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

      {/* ── Mobile Footer Strip (< lg) ─────────────────────────── */}
      <div className="lg:hidden w-full relative z-20 shrink-0">
        <div className="w-full px-5 sm:px-8">
          <hr className="w-full border-t border-black/25 m-0 p-0" />
        </div>

        <footer
          className="w-full px-5 sm:px-8 pt-2.5 pb-3 flex flex-col gap-2 reveal"
          style={{ "--delay": "450ms" } as React.CSSProperties}
        >
          {/* Row 1: Email, Centered SCROLL Pill, Website */}
          <div className="flex items-center justify-between">
            {/* Email */}
            <a
              href="mailto:ayush.anand.giri@gmail.com"
              className="flex items-center gap-1.5 group shrink-0"
            >
              <img
                alt=""
                src={imgEmail}
                className="w-3.5 h-3.5 shrink-0"
              />
              <div className="flex flex-col">
                <span
                  className="text-[#111111] text-[8px] tracking-[1.4px] uppercase font-bold leading-none mb-0.5 group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  EMAIL
                </span>
                <span
                  className="text-[#111111] text-[10px] font-medium leading-none group-hover:text-[#FF5722] transition-colors truncate max-w-[115px] xs:max-w-[140px]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  ayush.anand.giri@gmail.com
                </span>
              </div>
            </a>

            {/* Centered SCROLL Pill */}
            <button
              onClick={() =>
                window.scrollBy({
                  top: window.innerHeight * 0.75,
                  behavior: "smooth",
                })
              }
              className="bg-[#EAE4DC] border border-black/25 px-3 py-1 rounded-full text-[#111111] text-[9.5px] font-bold tracking-[2px] uppercase flex items-center gap-1 select-none cursor-pointer hover:border-[#FF5722] hover:text-[#FF5722] transition-colors shrink-0 shadow-2xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>SCROLL</span>
              <span className="text-[11px] leading-none">↓</span>
            </button>

            {/* Website */}
            <a
              href="https://ayushanand.dev"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 group shrink-0 text-right"
            >
              <div className="flex flex-col items-end">
                <span
                  className="text-[#111111] text-[8px] tracking-[1.4px] uppercase font-bold leading-none mb-0.5 group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  WEBSITE
                </span>
                <span
                  className="text-[#111111] text-[10px] font-medium leading-none group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  ayushanand.dev
                </span>
              </div>
              <img
                alt=""
                src={imgWebsite}
                className="w-3.5 h-3.5 shrink-0"
              />
            </a>
          </div>

          {/* Row 2: Full Width CTA Button */}
          <button
            onClick={handleScrollToContact}
            className="w-full border border-black px-3.5 py-2 flex items-center justify-between bg-transparent hover:border-[#FF5722] group cursor-pointer transition-all duration-200 mt-0.5"
          >
            <span
              className="text-[#111111] text-[9px] tracking-[1.3px] uppercase font-bold leading-none group-hover:text-[#FF5722] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              LET'S BUILD SOMETHING GREAT TOGETHER
            </span>
            <img
              alt=""
              src={imgArrow}
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0"
            />
          </button>
        </footer>
      </div>

      {/* ── Desktop Footer Strip (lg:) ─────────────────────────── */}
      <div className="hidden lg:block w-full relative z-20 shrink-0">
        <div className="w-full px-14">
          <hr className="w-full border-t border-black/25 m-0 p-0" />
        </div>

        <footer
          className="w-full px-14 pt-4 pb-5 relative z-20 reveal"
          style={{ "--delay": "450ms" } as React.CSSProperties}
        >
          <div className="flex flex-row items-center justify-between gap-4">
            {/* Contact Information Blocks */}
            <div className="flex items-center gap-11">
              {/* Email Block */}
              <a
                href="mailto:ayush.anand.giri@gmail.com"
                className="flex items-center gap-3 group"
              >
                <img
                  alt=""
                  src={imgEmail}
                  className="w-5 h-5 shrink-0"
                />
                <div className="flex flex-col">
                  <span
                    className="text-[#111111] text-[10px] tracking-[1.6px] uppercase font-bold leading-none mb-1 group-hover:text-[#FF5722] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    EMAIL
                  </span>
                  <span
                    className="text-[#111111] text-[13.5px] font-medium leading-none group-hover:text-[#FF5722] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ayush.anand.giri@gmail.com
                  </span>
                </div>
              </a>

              <div className="w-[1px] h-7 bg-black/20 shrink-0" />

              {/* Website Block */}
              <a
                href="https://ayushanand.dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 group"
              >
                <img
                  alt=""
                  src={imgWebsite}
                  className="w-5 h-5 shrink-0"
                />
                <div className="flex flex-col">
                  <span
                    className="text-[#111111] text-[10px] tracking-[1.6px] uppercase font-bold leading-none mb-1 group-hover:text-[#FF5722] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    WEBSITE
                  </span>
                  <span
                    className="text-[#111111] text-[13.5px] font-medium leading-none group-hover:text-[#FF5722] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ayushanand.dev
                  </span>
                </div>
              </a>

              <div className="w-[1px] h-7 bg-black/20 shrink-0" />

              {/* Location Block */}
              <div className="flex items-center gap-3">
                <img
                  alt=""
                  src={imgLocation}
                  className="w-5 h-5 shrink-0"
                />
                <div className="flex flex-col">
                  <span
                    className="text-[#111111] text-[10px] tracking-[1.6px] uppercase font-bold leading-none mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    LOCATION
                  </span>
                  <span
                    className="text-[#111111] text-[13.5px] font-medium leading-none"
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
              className="w-[245px] border border-[#111111] px-3.5 py-2.5 flex flex-col justify-between items-stretch gap-2.5 shrink-0 bg-transparent min-h-[64px] hover:border-[#FF5722] group cursor-pointer transition-all duration-200"
            >
              <p
                className="text-[#111111] text-[10px] tracking-[1.4px] uppercase font-bold leading-[1.35] text-left group-hover:text-[#FF5722] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                LET'S BUILD<br />SOMETHING<br />GREAT TOGETHER
              </p>
              <div className="flex justify-end -mt-3.5 shrink-0">
                <img
                  alt=""
                  src={imgArrow}
                  className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
