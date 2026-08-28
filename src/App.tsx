import { useState, useEffect, useRef } from "react";
import HeroSection from "./components/HeroSection";
import OrientationStrip from "./components/OrientationStrip";
import ScrollWheel from "./components/ScrollWheel";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import ScrollReminder from "./components/ScrollReminder";
import { useCursorReveal } from "./hooks/useCursorReveal";

export default function App() {
  // Activate circular cursor reveal engine
  const revealOverlayRef = useCursorReveal();

  const [activeSection, setActiveSection] = useState(1); // 1 to 5
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWheelVisible, setIsWheelVisible] = useState(false);

  const mainContainerRef = useRef<HTMLDivElement>(null);

  // 1. Intersection Observer to reliably detect current section (1 to 5)
  useEffect(() => {
    const sectionIds = ["projects", "skills", "about", "experience", "contact"];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveSection(index + 1);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -50% 0px",
        threshold: 0.05,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // 2. Track scroll position for wheel visibility & downward track translation
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        const orientationEl = document.getElementById("orientation-strip");
        const contactEl = document.getElementById("contact");

        if (!orientationEl) return;

        const currentScroll = window.scrollY;
        const orientationRect = orientationEl.getBoundingClientRect();

        // Strictly hidden at Hero section / top of page before scrolling down
        const hasScrolledPastHero =
          currentScroll > 100 && orientationRect.top <= window.innerHeight * 0.9;

        setIsWheelVisible(hasScrolledPastHero);

        if (hasScrolledPastHero && contactEl) {
          const maxScrollable =
            document.documentElement.scrollHeight - window.innerHeight;
          const isAtBottom = maxScrollable - currentScroll <= 6;

          if (isAtBottom) {
            setScrollProgress(1);
          } else {
            const startScrollY = orientationEl.offsetTop - window.innerHeight * 0.3;
            const endScrollY =
              contactEl.offsetTop + contactEl.offsetHeight - window.innerHeight;
            const totalDistance = Math.max(1, endScrollY - startScrollY);
            const currentDistance = window.scrollY - startScrollY;
            const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
            setScrollProgress(progress);
          }
        } else {
          setScrollProgress(0);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={mainContainerRef}
      className="w-full min-h-screen relative bg-[#F3EFE9] text-[#111111]"
    >
      {/* ── Persistent Scroll Wheel Indicator (Middle 80vh, starting 20% down) ── */}
      <ScrollWheel
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        isVisible={isWheelVisible}
      />

      {/* ── Base Interactive Content Tree ────────────────────────────── */}
      {/* Section 00: Hero Intro */}
      <HeroSection />

      {/* Orientation Strip (One-Time Trailhead Map) */}
      <OrientationStrip onSelectSection={(idx) => setActiveSection(idx)} />

      {/* Section 01: Featured Projects */}
      <ProjectsSection />

      {/* Section 02: Skills / Tech Stack */}
      <SkillsSection />

      {/* Section 03: About Me */}
      <AboutSection />

      {/* Section 04: Experience / Work History */}
      <ExperienceSection />

      {/* Section 05: Contact / Footer */}
      <ContactSection />

      {/* Floating Scroll Reminder */}
      <ScrollReminder />

      {/* ── Circular Cursor Reveal Overlay Layer (Orange Tint Overlay) ─ */}
      <div
        ref={revealOverlayRef}
        aria-hidden="true"
        role="presentation"
        className="reveal-layer-overlay"
        style={{ clipPath: "circle(0px at -200px -200px)" }}
      >
        <ScrollWheel
          activeSection={activeSection}
          scrollProgress={scrollProgress}
          isVisible={isWheelVisible}
        />
        <HeroSection isRevealLayer={true} />
        <OrientationStrip />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </div>
  );
}
