import { useEffect, useRef } from "react";

const MAX_RADIUS = 88; // Max radius in pixels of the reveal circle
const INACTIVITY_TIMEOUT_MS = 500; // 0.5s inactivity before shrinking out
const GROW_SPEED = 14; // Easing speed for expanding
const SHRINK_SPEED = 10; // Easing speed for shrinking

export function useCursorReveal() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (typeof window !== "undefined" && window.matchMedia && (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024)) {
      return;
    }

    let targetX = -200;
    let targetY = -200;
    let currentRadius = 0;
    let targetRadius = 0;
    let isRunning = false;
    let animationFrameId: number;
    let lastTime = performance.now();
    let inactivityTimer: number | undefined;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Easing radius smoothly based on active/idle target
      const speed = targetRadius > currentRadius ? GROW_SPEED : SHRINK_SPEED;
      const radiusDiff = targetRadius - currentRadius;
      currentRadius += radiusDiff * (1 - Math.exp(-speed * dt));

      // Snap to 0 if very close to avoid micro-renders
      if (Math.abs(currentRadius) < 0.2 && targetRadius === 0) {
        currentRadius = 0;
      }

      // Apply clip-path directly with instantaneous coordinates
      overlay.style.clipPath = `circle(${currentRadius.toFixed(2)}px at ${targetX.toFixed(1)}px ${targetY.toFixed(1)}px)`;

      // If fully closed and idle, stop RAF loop to save CPU
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
      // Only track if pointer is fine (desktop/mouse)
      if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
        return;
      }
      // Instant position tracking (no delay/easing)
      targetX = e.pageX;
      targetY = e.pageY;
      targetRadius = MAX_RADIUS;

      startLoop();

      // Reset 1s inactivity timer
      if (inactivityTimer) {
        window.clearTimeout(inactivityTimer);
      }
      inactivityTimer = window.setTimeout(() => {
        targetRadius = 0;
        startLoop();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const handleMouseLeave = () => {
      targetRadius = 0;
      startLoop();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (inactivityTimer) window.clearTimeout(inactivityTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return overlayRef;
}
