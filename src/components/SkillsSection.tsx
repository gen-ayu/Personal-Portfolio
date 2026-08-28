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
      className="w-full bg-[#F3EFE9] text-[#111111] py-20 sm:py-28 px-6 sm:px-10 lg:px-14 relative z-10 border-b border-black/20 selection:bg-neutral-900 selection:text-[#F3EFE9]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[#FF5722] font-mono text-[13px] sm:text-[14px] font-semibold tracking-wider block mb-3">
              02 / 05
            </span>
            <h2
              className="text-[clamp(42px,7.5vw,110px)] font-bold uppercase tracking-[-0.02em] leading-[0.88]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Tools with a<br />
              point of view.
            </h2>
          </div>
          <p className="text-[#222222]/80 text-[14px] sm:text-[15px] max-w-[340px] leading-relaxed font-sans lg:text-right">
            The stack is a means, never the headline. I choose what keeps the idea clear.
          </p>
        </div>

        <div className="section-divider-line w-full h-[1.5px] bg-[#111111] mb-12 sm:mb-16" />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Philosophy / Statement */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3
                className="text-[clamp(28px,3.2vw,44px)] font-bold uppercase tracking-tight leading-[1.05] text-[#111111] mb-6"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Curious enough to learn it. Practical enough to leave it out.
              </h3>
              <p className="text-[#222222]/85 text-[15px] sm:text-[16px] leading-relaxed">
                I like strong fundamentals, small dependencies, and interfaces that stay understandable when the original author has gone home.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-black/15 hidden lg:block">
              <span className="text-[11px] font-mono uppercase tracking-[2px] text-neutral-500 block mb-2">
                FOUNDATIONS
              </span>
              <p className="text-[13px] text-neutral-700">
                Continuous learning across systems programming, full-stack web platforms, and UI engineering.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Category Grids */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {skillCategories.map((cat) => (
              <div
                key={cat.title}
                className="flex flex-col border-t border-black/25 pt-4"
              >
                <span className="text-[11.5px] font-mono font-bold uppercase tracking-[2px] text-[#111111] mb-4">
                  {cat.title}
                </span>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-[13px] sm:text-[13.5px] font-medium bg-[#EAE4DC] border border-black/20 rounded text-[#111111] hover:border-[#FF5722] hover:bg-white transition-all duration-150 cursor-default"
                      style={{ fontFamily: "'Inter', sans-serif" }}
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
