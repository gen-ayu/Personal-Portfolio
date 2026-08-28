import bwPortraitSrc from "@/imports/Adobe_Express_-_file-1.png";
import colorPortraitSrc from "@/imports/ColorPortfolio.png";

const assetPathPrefix = "/assets";
const imgEmail = `${assetPathPrefix}/f49a6.svg`;
const imgWebsite = `${assetPathPrefix}/3620d.svg`;
const imgLocation = `${assetPathPrefix}/dd8d8.svg`;
const imgArrow = `${assetPathPrefix}/b7f9a.svg`;

interface HeroSectionProps {
  isRevealLayer?: boolean;
}

export default function HeroSection({ isRevealLayer = false }: HeroSectionProps) {
  const currentPortrait = isRevealLayer ? colorPortraitSrc : bwPortraitSrc;

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
      className="min-h-screen lg:h-screen lg:max-h-screen w-full flex flex-col justify-between relative overflow-x-hidden lg:overflow-hidden selection:bg-neutral-900 selection:text-[#F3EFE9]"
      style={{ backgroundColor: "#F3EFE9", color: "#111111" }}
    >
      {/* ── Top Header ─────────────────────────────────────────── */}
      <header className="w-full flex items-start justify-between px-6 sm:px-10 lg:px-14 pt-6 sm:pt-8 pb-0 relative z-30 shrink-0">
        {/* Left: Tagline */}
        <div className="flex flex-col gap-0.5 select-none">
          <span
            className="text-[#111111] text-[11px] sm:text-[11.5px] tracking-[1.8px] uppercase font-bold leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            DESIGNING MEANINGFUL
          </span>
          <span
            className="text-[#111111] text-[11px] sm:text-[11.5px] tracking-[1.8px] uppercase font-bold leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            DIGITAL EXPERIENCES
          </span>
        </div>

        {/* Right: Portfolio Year */}
        <div className="flex flex-col gap-0.5 items-end text-right select-none">
          <span
            className="text-[#111111] text-[11px] sm:text-[11.5px] tracking-[1.8px] uppercase font-bold leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            PORTFOLIO
          </span>
          <span
            className="text-[#111111] text-[11px] sm:text-[11.5px] tracking-[1.8px] uppercase font-bold leading-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            2026
          </span>
        </div>
      </header>

      {/* ── Main Hero Area ─────────────────────────────────────── */}
      <main className="w-full flex-1 min-h-0 flex flex-col lg:flex-row items-stretch justify-between px-6 sm:px-10 lg:px-14 pt-6 sm:pt-10 lg:pt-12 pb-0 relative z-10">
        {/* Left Column: Typography & Bio */}
        <div className="flex-1 flex flex-col justify-end pb-5 sm:pb-7 lg:pb-8 z-20 max-w-2xl">
          <h1
            className="text-[#222222] font-bold uppercase tracking-[-0.02em] leading-[0.86] text-[clamp(75px,12.8vw,190px)] select-none"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            AYUSH<br />ANAND
          </h1>

          <p
            className="mt-6 sm:mt-7 text-[#111111] text-[clamp(12.5px,1.3vw,18.5px)] tracking-[4.2px] uppercase font-bold select-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            DEVELOPER &amp; PROBLEM SOLVER
          </p>

          <p
            className="mt-4 mb-6 sm:mb-7 text-[#222222] text-[clamp(13px,1.05vw,16px)] leading-[1.55] font-medium max-w-[460px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            I build digital experiences that are intentional, impactful, and built to last.
          </p>

          {/* Left Decorative Underline */}
          <div className="hero-underline bg-[#111111] h-[3.5px] w-[80px]" />
        </div>

        {/* Right Column: Circle Backdrop + Foreground Portrait with Color Reveal on Hover */}
        <div className="flex-1 min-h-0 relative flex items-end justify-center lg:justify-end h-full">
          {/* Background Dark Circle */}
          <div
            className="hero-backdrop-circle absolute rounded-full bg-[#222222] pointer-events-none transition-transform duration-700"
            style={{
              width: "min(35.5vw, 58vh, 530px)",
              height: "min(35.5vw, 58vh, 530px)",
              right: "clamp(-6px, 0.5vw, 20px)",
              top: "48%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          />

          {/* Foreground Portrait Container */}
          <div
            className="portrait-container relative w-full h-full min-h-0 flex items-end justify-center lg:justify-end cursor-pointer"
            style={{ zIndex: 10 }}
            title="Ayush Anand"
          >
            <img
              src={currentPortrait}
              alt="Ayush Anand"
              className="max-w-none select-none"
              style={{
                height: "min(58vw, 84vh, 830px)",
                width: "auto",
                objectFit: "contain",
                objectPosition: "center bottom",
                marginRight: "clamp(10px, 3.5vw, 55px)",
                marginBottom: "-1px",
                filter: isRevealLayer
                  ? "drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.09))"
                  : "grayscale(100%) contrast(105%) drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.09))",
              }}
            />
          </div>
        </div>
      </main>

      {/* ── Horizontal Divider Line ────────────────────────────── */}
      <div className="w-full px-6 sm:px-10 lg:px-14 relative z-20 shrink-0">
        <hr className="w-full border-t border-black/25 m-0 p-0" />
      </div>

      {/* ── Bottom Section / Contact Footer Strip ─── */}
      <footer className="w-full px-6 sm:px-10 lg:px-14 pt-3.5 sm:pt-4 pb-4 sm:pb-5 relative z-20 shrink-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-4">
          {/* Contact Information Blocks */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-9 lg:gap-11">
            {/* Email Block */}
            <a
              href="mailto:hello@ayushanand.dev"
              className="flex items-center gap-3 group"
            >
              <img
                alt=""
                src={imgEmail}
                className="w-[20px] h-[20px] shrink-0"
              />
              <div className="flex flex-col">
                <span
                  className="text-[#111111] text-[9.5px] sm:text-[10px] tracking-[1.6px] uppercase font-bold leading-none mb-1 group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  EMAIL
                </span>
                <span
                  className="text-[#111111] text-[13px] sm:text-[13.5px] font-medium leading-none group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  hello@ayushanand.dev
                </span>
              </div>
            </a>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-[1px] h-7 bg-black/20 shrink-0" />

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
                className="w-[20px] h-[20px] shrink-0"
              />
              <div className="flex flex-col">
                <span
                  className="text-[#111111] text-[9.5px] sm:text-[10px] tracking-[1.6px] uppercase font-bold leading-none mb-1 group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  WEBSITE
                </span>
                <span
                  className="text-[#111111] text-[13px] sm:text-[13.5px] font-medium leading-none group-hover:text-[#FF5722] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  ayushanand.dev
                </span>
              </div>
            </a>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-[1px] h-7 bg-black/20 shrink-0" />

            {/* Location Block */}
            <div className="flex items-center gap-3">
              <img
                alt=""
                src={imgLocation}
                className="w-[20px] h-[20px] shrink-0"
              />
              <div className="flex flex-col">
                <span
                  className="text-[#111111] text-[9.5px] sm:text-[10px] tracking-[1.6px] uppercase font-bold leading-none mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  LOCATION
                </span>
                <span
                  className="text-[#111111] text-[13px] sm:text-[13.5px] font-medium leading-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  India
                </span>
              </div>
            </div>
          </div>

          {/* CTA Box - Compact Height */}
          <button
            onClick={handleScrollToContact}
            className="w-full sm:w-[225px] lg:w-[245px] border border-[#111111] px-3.5 py-2 sm:py-2.5 flex flex-col justify-between gap-2.5 shrink-0 bg-transparent min-h-[64px] hover:border-[#FF5722] group cursor-pointer transition-all duration-200"
          >
            <p
              className="text-[#111111] text-[9.5px] sm:text-[10px] tracking-[1.4px] uppercase font-bold leading-[1.35] text-left group-hover:text-[#FF5722] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              LET'S BUILD<br />
              SOMETHING<br />
              GREAT TOGETHER
            </p>
            <div className="flex justify-end -mt-3.5">
              <img
                alt=""
                src={imgArrow}
                className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform"
              />
            </div>
          </button>
        </div>
      </footer>
    </section>
  );
}
