import { useEffect, useState, useRef } from "react";

interface ScrollWheelProps {
  activeSection: number; // 1 to 5
  scrollProgress: number; // 0 (at orientation strip) to 1 (at footer bottom)
  isVisible: boolean; // visible after orientation strip enters view
}

export default function ScrollWheel({
  activeSection,
  scrollProgress,
  isVisible,
}: ScrollWheelProps) {
  const [displayedSection, setDisplayedSection] = useState(activeSection);
  const [previousSection, setPreviousSection] = useState(activeSection);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Total complete 360° revolutions across the entire scrollable area
  const TOTAL_REVOLUTIONS = 4; // 4 * 360° = 1440°
  const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
  const rotation = clampedProgress * (TOTAL_REVOLUTIONS * 360);

  // Track scroll motion state and direction
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 160);

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Sync displayed section and trigger odometer flip
  useEffect(() => {
    if (activeSection !== displayedSection) {
      setPreviousSection(displayedSection);
      setDisplayedSection(activeSection);
    }
  }, [activeSection, displayedSection]);

  // Position starts near the top of the 80vh track (4%) and travels downward to 96%
  const topPercentage = 4 + clampedProgress * 92;

  // Format section numbers (01 - 05)
  const currentNumStr = String(displayedSection).padStart(2, "0");
  const prevNumStr = String(previousSection).padStart(2, "0");

  return (
    <aside
      aria-label="Scroll Progress Indicator"
      className="fixed right-0 top-[10vh] h-[80vh] w-8 z-50 pointer-events-none hidden md:flex flex-col items-center select-none transition-opacity duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s ease",
      }}
    >
      {/* ── Thin Vertical Guide Line (Centered on wheel, flush with right edge) ── */}
      <div className="scroll-wheel-track absolute top-0 bottom-0 right-[14px] w-[1px] bg-black/25" />

      {/* ── Traveling Wheel Container ── */}
      <div
        className="absolute right-0 flex flex-col items-center transition-transform duration-75 ease-out w-7"
        style={{
          top: `${topPercentage}%`,
          transform: "translateY(-50%)",
        }}
      >
        {/* Wheel graphic: scales up during active scroll motion and rotates */}
        <div
          className={`scroll-wheel-disc relative w-7 h-7 rounded-full bg-black border border-black flex items-center justify-center overflow-hidden transition-all ${
            isScrolling
              ? "shadow-[0_0_12px_rgba(0,0,0,0.35)]"
              : "shadow-md"
          }`}
          style={{
            transform: `rotate(${rotation}deg) scale(${isScrolling ? 1.25 : 1})`,
            transition: "transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease",
          }}
        >
          {/* Subtle Dial Spokes / Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="scroll-wheel-spoke w-full h-[0.5px] bg-white" />
            <div className="scroll-wheel-spoke absolute h-full w-[0.5px] bg-white" />
          </div>

          {/* Number on the wheel — rotates with wheel & has odometer animation */}
          <div className="scroll-wheel-number relative z-10 font-mono font-bold text-[9.5px] tracking-tight text-white flex items-center justify-center">
            <div className="odometer-wrapper h-[12px] overflow-hidden relative w-[16px] text-center flex items-center justify-center">
              <div
                key={displayedSection}
                className={`flex flex-col items-center ${
                  scrollDirection === "down"
                    ? "animate-[odometerDown_0.22s_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
                    : "animate-[odometerUp_0.22s_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
                }`}
              >
                <span className="h-[12px] leading-[12px]">{currentNumStr}</span>
              </div>
            </div>
          </div>

          {/* Orange Accent Pip at Top Edge of Wheel */}
          <div className="scroll-wheel-pip absolute top-[2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF5722] shadow-[0_0_3px_#FF5722]" />
        </div>
      </div>
    </aside>
  );
}
