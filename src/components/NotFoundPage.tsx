import { useEffect, useState } from "react";

// TODO: once chibidesk's own site is live, update url to the real domain and set external: true
const CHIBIDESK_LINK = {
  url: "#chibidesk-project", // current: scrolls to the ChibiDesk project card on this site
  external: false,           // set to true once pointing to the real ChibiDesk website
};

interface NotFoundPageProps {
  onGoHome: () => void;
  onGoToChibidesk: (targetHash?: string) => void;
  isRevealLayer?: boolean;
}

export default function NotFoundPage({
  onGoHome,
  onGoToChibidesk,
  isRevealLayer = false,
}: NotFoundPageProps) {
  const [currentPathname, setCurrentPathname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPathname(window.location.pathname || "/unknown");
    }
  }, []);

  const renderActionButtons = () => (
    <>
      {/* Primary Action: Back to homepage */}
      <button
        type="button"
        onClick={onGoHome}
        className="px-7 py-3.5 bg-[#111111] text-[#F3EFE9] text-[13px] font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#FF5722] hover:text-white shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        ← Back to homepage
      </button>

      {/* Secondary Action: Driven by CHIBIDESK_LINK constant */}
      {CHIBIDESK_LINK.external ? (
        <a
          href={CHIBIDESK_LINK.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-bold uppercase tracking-wider text-[#111111] hover:text-[#FF5722] transition-colors inline-flex items-center gap-1.5 self-start sm:self-center py-2 group cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span>Visit ChibiDesk</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onGoToChibidesk(CHIBIDESK_LINK.url)}
          className="text-[13px] font-bold uppercase tracking-wider text-[#111111] hover:text-[#FF5722] transition-colors inline-flex items-center gap-1.5 self-start sm:self-center py-2 group cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span>See ChibiDesk</span>
          <span className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
        </button>
      )}
    </>
  );

  return (
    <div className="w-full min-h-screen bg-[#F3EFE9] text-[#111111] flex flex-col justify-between p-6 sm:p-10 lg:px-14 lg:py-10 relative z-10 selection:bg-neutral-900 selection:text-[#F3EFE9]">
      {/* ── Top Header Bar ────────────────────────────────────────── */}
      <header className="max-w-7xl w-full mx-auto flex items-center justify-between border-b border-black/15 pb-4">
        <button
          type="button"
          onClick={onGoHome}
          className="text-[#111111] text-[13px] sm:text-[14px] font-bold tracking-wider uppercase hover:text-[#FF5722] transition-colors text-left cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Ayush Anand
        </button>

        <span
          className="text-[#222222]/50 font-mono text-[11px] uppercase tracking-widest hidden md:inline-block"
        >
          Portfolio // System Exception
        </span>

        <span
          className="text-[#FF5722] font-mono text-[11px] sm:text-[12px] uppercase tracking-widest font-semibold"
        >
          [ 404 / NOT FOUND ]
        </span>
      </header>

      {/* ── Center Content: Responsive 2-Column Desktop Composition ─ */}
      <main className="max-w-7xl w-full mx-auto my-auto py-10 sm:py-14 lg:py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-14">
        {/* Left Column: Typography & Desktop Navigation Actions */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <span className="text-[#FF5722] font-mono text-[13px] sm:text-[14px] font-bold tracking-wider uppercase block mb-2 sm:mb-3">
            00 / Exception
          </span>

          {/* Oversized display type matching Hero typography */}
          <h1
            className="text-[#222222] font-bold uppercase tracking-[-0.025em] leading-[0.84] text-[clamp(80px,13.5vw,210px)] select-none"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            404
          </h1>

          <p
            className="mt-4 sm:mt-6 text-[#111111] text-[clamp(13px,1.2vw,17px)] tracking-[3.8px] uppercase font-bold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Page Not Found
          </p>

          <p
            className="mt-3 text-[#222222]/80 text-[15px] sm:text-[16px] leading-relaxed max-w-lg font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The requested address does not exist on this server, or the link you followed has expired.
          </p>

          {/* Decorative Underline matching Hero style */}
          <div className="hero-underline bg-[#111111] h-[3.5px] w-[80px] my-6 sm:my-8" />

          {/* Desktop-only action buttons (displayed under left column on lg+) */}
          <div className="hidden lg:flex flex-row items-center gap-6">
            {renderActionButtons()}
          </div>
        </div>

        {/* Right Column: Diagnostic Readout & Mobile Navigation Actions */}
        <div className="w-full lg:w-[460px] xl:w-[500px] shrink-0 flex flex-col">
          <div className="border border-black/15 bg-black/[0.02] p-6 sm:p-8 rounded-none relative">
            {/* Panel Top Strip */}
            <div className="text-[#222222]/50 font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase mb-4 border-b border-black/10 pb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
                <span>DIAGNOSTIC READOUT</span>
              </div>
              <span>ERR_CODE: 0x404</span>
            </div>

            {/* Exact Readout Lines */}
            <pre
              className="font-mono text-[12.5px] sm:text-[13.5px] text-[#111111] leading-relaxed whitespace-pre-wrap select-text"
            >
{`OVERLAY STATUS: PAGE NOT FOUND
ACTIVE PROCESS: 404.exe
SERVER DEPENDENCY: required (that's the problem)
CHIBIDESK DEPENDENCY: none — runs 100% offline`}
            </pre>

            {/* Supplementary Diagnostic Telemetry Bar */}
            <div className="mt-5 pt-3.5 border-t border-black/10 flex flex-col gap-1 text-[11px] font-mono text-[#222222]/60">
              <div className="flex items-center justify-between">
                <span>REQUESTED PATH:</span>
                <span className="text-[#111111] font-semibold truncate max-w-[220px]">
                  {currentPathname || "/404"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>ENVIRONMENT:</span>
                <span>PRODUCTION / WEB</span>
              </div>
            </div>
          </div>

          {/* Mobile-only action buttons (positioned AFTER the diagnostic readout panel) */}
          <div className="flex lg:hidden flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            {renderActionButtons()}
          </div>
        </div>
      </main>

      {/* ── Footer Bar ────────────────────────────────────────────── */}
      <footer className="max-w-7xl w-full mx-auto border-t border-black/15 pt-4 text-[#222222]/60 text-[12px] font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>© 2026 AYUSH ANAND</span>
        <div className="flex items-center gap-4">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF5722]" />
          <span>STATUS: STANDALONE MODE</span>
        </div>
      </footer>
    </div>
  );
}
