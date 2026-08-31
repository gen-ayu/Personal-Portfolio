import { useEffect, useRef, RefObject } from "react";

export interface ScrollRevealOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | Document | null;
  once?: boolean;
}

/**
 * Custom React hook for scroll-triggered reveal animations using Intersection Observer.
 *
 * Automatically detects elements with the `.reveal` class inside the target ref (or document)
 * and adds the `.revealed` class when they enter the viewport.
 * Unobserves after the first trigger to ensure the animation plays once per element.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  targetRef?: RefObject<T | null> | null,
  options?: ScrollRevealOptions
) {
  const localRef = useRef<T>(null);
  const ref = targetRef ?? localRef;

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const threshold = options?.threshold ?? 0.1;
    const rootMargin = options?.rootMargin ?? "0px 0px -20px 0px";
    const once = options?.once ?? true;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("revealed");

            if (once) {
              obs.unobserve(target);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
        root: options?.root ?? null,
      }
    );

    const observeElement = (el: HTMLElement) => {
      if (el.closest(".reveal-layer-overlay")) return;
      if (el.classList.contains("reveal") && !el.classList.contains("revealed")) {
        observer.observe(el);
      }
    };

    const scanAndObserve = () => {
      const container = ref.current ?? document.body;
      if (!container) return;

      if (container.classList?.contains("reveal") && !container.closest(".reveal-layer-overlay")) {
        observeElement(container);
      }

      const revealElements = container.querySelectorAll<HTMLElement>(".reveal:not(.revealed)");
      revealElements.forEach((el) => {
        if (!el.closest(".reveal-layer-overlay")) {
          observer.observe(el);
        }
      });
    };

    // Initial scan
    scanAndObserve();

    // Observe DOM mutations with debouncing to prevent thrashing
    let mutationTimer: number | undefined;
    const containerNode = ref.current ?? document.body;
    const mutationObserver = new MutationObserver(() => {
      if (mutationTimer) window.clearTimeout(mutationTimer);
      mutationTimer = window.setTimeout(() => {
        scanAndObserve();
      }, 150);
    });

    if (containerNode) {
      mutationObserver.observe(containerNode, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      if (mutationTimer) window.clearTimeout(mutationTimer);
    };
  }, [ref, options?.threshold, options?.rootMargin, options?.root, options?.once]);

  return ref;
}

export default useScrollReveal;
