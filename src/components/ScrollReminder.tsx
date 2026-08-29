import { useState, useEffect, useRef } from "react";

export default function ScrollReminder() {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<number | null>(null);
  const hasMovedRef = useRef(false);

  const resetInactivityTimer = () => {
    // Disappear smoothly under 500ms upon scroll/activity
    setIsVisible(false);

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    // 5 seconds inactivity timer
    timerRef.current = window.setTimeout(() => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const canScrollFurther = maxScroll - window.scrollY > 250;

      if (canScrollFurther) {
        setIsVisible(true);
      }
    }, 5000);
  };

  useEffect(() => {
    // Initial 3-second timer on first load
    timerRef.current = window.setTimeout(() => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll - window.scrollY > 250) {
        setIsVisible(true);
      }
    }, 3000);

    const handleScrollOrInteract = () => {
      hasMovedRef.current = true;
      resetInactivityTimer();
    };

    window.addEventListener("scroll", handleScrollOrInteract, { passive: true });
    window.addEventListener("wheel", handleScrollOrInteract, { passive: true });
    window.addEventListener("touchstart", handleScrollOrInteract, { passive: true });

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      window.removeEventListener("scroll", handleScrollOrInteract);
      window.removeEventListener("wheel", handleScrollOrInteract);
      window.removeEventListener("touchstart", handleScrollOrInteract);
    };
  }, []);

  const handleScrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.75, behavior: "smooth" });
  };

  return (
    <aside
      onClick={handleScrollDown}
      aria-label="Scroll down reminder"
      className="fixed left-1/2 md:left-[55%] -translate-x-1/2 bottom-[72px] sm:bottom-[78px] lg:bottom-[84px] z-40 flex items-center gap-1.5 text-[#111111]/75 bg-[#F3EFE9] px-3.5 py-1.5 rounded-full border border-black/25 shadow-xs text-[10px] sm:text-[11px] tracking-[2.4px] uppercase font-bold select-none cursor-pointer group hover:text-[#FF5722] hover:border-[#FF5722] hover:bg-white"
      style={{
        fontFamily: "'Inter', sans-serif",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(-50%, 0)" : "translate(-50%, 6px)",
        pointerEvents: isVisible ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out, visibility 0.5s",
      }}
    >
      <span className="group-hover:text-[#FF5722] transition-colors">SCROLL</span>
      <span className="text-[12.5px] leading-none group-hover:translate-y-0.5 transition-transform">
        ↓
      </span>
    </aside>
  );
}
