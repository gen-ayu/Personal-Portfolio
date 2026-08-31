interface OrientationStripProps {
  onSelectSection?: (sectionIndex: number) => void;
}

export default function OrientationStrip({ onSelectSection }: OrientationStripProps) {
  const steps = [
    { num: "01", label: "Featured Projects", targetId: "projects" },
    { num: "02", label: "Skills", targetId: "skills" },
    { num: "03", label: "About Me", targetId: "about" },
    { num: "04", label: "Experience", targetId: "experience" },
    { num: "05", label: "Contact", targetId: "contact" },
  ];

  const handleScrollTo = (targetId: string, index: number) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    if (onSelectSection) {
      onSelectSection(index + 1);
    }
  };

  return (
    <section
      id="orientation-strip"
      className="w-full bg-[#161616] text-[#F3EFE9] py-14 sm:py-18 px-6 sm:px-10 lg:px-14 relative z-20 select-none border-b border-black/40"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2
            className="text-[clamp(32px,4.5vw,60px)] font-bold uppercase tracking-tight leading-[0.95] text-white reveal"
            style={{ fontFamily: "'Oswald', sans-serif", "--delay": "0ms" } as React.CSSProperties}
          >
            A considered route<br />
            through the work.
          </h2>
          <div
            className="flex items-center gap-3 reveal"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            <p className="text-neutral-400 text-[12px] sm:text-[13px] max-w-[280px] leading-relaxed font-sans">
              No rush. The useful details are usually a little further down.
            </p>
            <div className="w-2 h-2 rounded-full bg-[#FF5722] shrink-0" />
          </div>
        </div>

        {/* Horizontal Divider with Thin Border */}
        <div className="section-divider-line w-full h-[1px] bg-neutral-800" />

        {/* 5 Steps Grid (01 to 05) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 pt-2">
          {steps.map((step, idx) => (
            <button
              key={step.num}
              onClick={() => handleScrollTo(step.targetId, idx)}
              className="group text-left flex flex-col gap-2 p-3 -m-3 rounded hover:bg-neutral-900/60 transition-colors cursor-pointer reveal"
              style={{ "--delay": `${100 + idx * 80}ms` } as React.CSSProperties}
            >
              <span className="orientation-step-number text-[#FF5722] font-mono text-[13px] sm:text-[14px] font-semibold tracking-wider group-hover:translate-x-1 transition-transform inline-block">
                {step.num}
              </span>
              <span className="orientation-step-label text-white text-[15px] sm:text-[17px] font-semibold tracking-tight leading-snug">
                {step.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
