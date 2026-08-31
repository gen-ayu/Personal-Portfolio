export default function SkillsSection() {
  const skillCategories = [
    {
      title: "LANGUAGES",
      skills: ["Java", "JavaScript", "C", "C++", "Python"],
    },
    {
      title: "TECHNOLOGIES & FRAMEWORKS",
      skills: ["HTML", "CSS", "Node.js", "React", "Tailwind CSS", "Rust"],
    },
    {
      title: "DATABASES & TOOLS",
      skills: ["MySQL", "MongoDB", "Git", "GitHub", "Figma"],
    },
    {
      title: "CORE COMPETENCIES & SOFT SKILLS",
      skills: [
        "Problem solving",
        "Team collaboration",
        "Time management",
        "Adaptability",
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="w-full bg-[#F3EFE9] text-[#111111] py-14 sm:py-24 px-4 sm:px-8 lg:px-14 relative z-10 border-b border-black/20 selection:bg-neutral-900 selection:text-[#F3EFE9]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-16 reveal" style={{ "--delay": "0ms" } as React.CSSProperties}>
          <div>
            <span className="text-[#FF5722] font-mono text-[13px] sm:text-[14px] font-semibold tracking-wider block mb-2 sm:mb-3">
              02 / 05
            </span>
            <h2
              className="text-[clamp(36px,7.5vw,110px)] font-bold uppercase tracking-[-0.02em] leading-[0.88]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Tools with a<br />
              point of view.
            </h2>
          </div>
          <p className="text-[#222222]/80 text-[13.5px] sm:text-[15px] max-w-[340px] leading-relaxed font-sans lg:text-right">
            The stack is a means, never the headline. I choose what keeps the idea clear.
          </p>
        </div>

        <div className="section-divider-line w-full h-[1.5px] bg-[#111111] mb-8 sm:mb-16" />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column: Philosophy / Statement */}
          <div
            className="lg:col-span-5 flex flex-col justify-between reveal"
            style={{ "--delay": "100ms" } as React.CSSProperties}
          >
            <div>
              <h3
                className="text-[clamp(24px,3.2vw,44px)] font-bold uppercase tracking-tight leading-[1.05] text-[#111111] mb-4 sm:mb-6"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Curious enough to learn it. Practical enough to leave it out.
              </h3>
              <p className="text-[#222222]/85 text-[14.5px] sm:text-[16px] leading-relaxed">
                I like strong fundamentals, small dependencies, and interfaces that stay understandable when the original author has gone home.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-black/15">
              <span className="text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[2px] text-neutral-500 block mb-1.5 sm:mb-2">
                FOUNDATIONS
              </span>
              <p className="text-[12.5px] sm:text-[13px] text-neutral-700">
                Continuous learning across systems programming, full-stack web platforms, and UI engineering.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Category Grids */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
            {skillCategories.map((cat, catIdx) => (
              <div
                key={cat.title}
                className="flex flex-col border-t border-black/25 pt-3.5 sm:pt-4 reveal"
                style={{ "--delay": `${120 + catIdx * 90}ms` } as React.CSSProperties}
              >
                <span className="text-[11px] sm:text-[11.5px] font-mono font-bold uppercase tracking-[1.8px] sm:tracking-[2px] text-[#111111] mb-3 sm:mb-4">
                  {cat.title}
                </span>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {cat.skills.map((skill, skillIdx) => (
                    <span
                      key={skill}
                      className="skills-pill px-2.5 sm:px-3 py-1.5 text-[12.5px] sm:text-[13.5px] font-medium bg-[#EAE4DC] border border-black/20 rounded text-[#111111] hover:border-[#FF5722] hover:bg-white transition-all duration-150 cursor-default reveal"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        "--delay": `${140 + catIdx * 80 + skillIdx * 40}ms`,
                      } as React.CSSProperties}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
