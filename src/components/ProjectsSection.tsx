export default function ProjectsSection() {
  const projects = [
    {
      num: "01",
      title: "ChibiDesk",
      subtitle: "Desktop Customization & Overlay Manager",
      period: "Jul 2026 – Aug 2026",
      description:
        "Architected a lightweight Windows desktop customization application using Tauri, Rust, TypeScript, and WebView2, letting users manage and place animated visual overlays directly on the desktop.",
      highlights: [
        "Multi-format asset management and real-time animated desktop overlays",
        "Windows cursor customization system spanning 14 cursor types, with configurable color, scale, opacity, and visual effects",
        "Live runtime monitoring and contextual system panels — process CPU/memory usage, FPS, uptime, process info, render details, and active overlay state",
      ],
      techStack: [
        "Tauri",
        "Rust",
        "TypeScript",
        "WebView2",
        "Windows APIs",
        "HTML/CSS",
        "Lucide Icons",
      ],
      status: "CODE & DEMO",
      githubUrl: "https://github.com",
    },
    {
      num: "02",
      title: "EcoTrack Pulse",
      subtitle: "Carbon Footprint Tracking Platform",
      period: "Jun 2025 – Jul 2025",
      description:
        "A responsive carbon-footprint tracking platform built around an interactive sustainability dashboard.",
      highlights: [
        "Multi-stage onboarding and lifestyle/commuting data collection flow",
        "AI-powered sustainability recommendations with CO₂ and cost-saving insights",
        "Interactive impact visualizations across transport, food, energy, and waste",
        "Scroll-driven landing experience with smooth UI transitions",
      ],
      techStack: [
        "HTML",
        "Tailwind CSS",
        "JavaScript",
        "Responsive Web Design",
      ],
      status: "CODE & DEMO",
      githubUrl: "https://github.com",
    },
  ];

  return (
    <section
      id="projects"
      className="w-full bg-[#F3EFE9] text-[#111111] py-20 sm:py-28 px-6 sm:px-10 lg:px-14 relative z-10 border-b border-black/20 selection:bg-neutral-900 selection:text-[#F3EFE9]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[#FF5722] font-mono text-[13px] sm:text-[14px] font-semibold tracking-wider block mb-3">
              01 / 05
            </span>
            <h2
              className="text-[clamp(42px,7.5vw,110px)] font-bold uppercase tracking-[-0.02em] leading-[0.88]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Featured<br />
              projects
            </h2>
          </div>
          <p className="text-[#222222]/80 text-[14px] sm:text-[15px] max-w-[340px] leading-relaxed font-sans lg:text-right">
            Selected work, personal experiments, and a few things that made me look twice.
          </p>
        </div>

        <div className="section-divider-line w-full h-[1.5px] bg-[#111111] mb-12 sm:mb-16" />

        {/* Projects List */}
        <div className="flex flex-col divide-y divide-black/15">
          {projects.map((project) => (
            <article
              key={project.title}
              className="py-12 sm:py-16 first:pt-0 last:pb-12 group transition-colors"
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                {/* Left Side: Number, Title, Dates, Subtitle */}
                <div className="lg:w-5/12 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF5722] font-mono text-[14px] font-bold">
                      {project.num}
                    </span>
                    <span className="text-[#222222]/60 font-mono text-[12px] uppercase tracking-wider">
                      {project.period}
                    </span>
                  </div>

                  <h3
                    className="text-[clamp(32px,4vw,56px)] font-bold uppercase tracking-tight leading-none text-[#111111] group-hover:text-[#FF5722]"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-[#111111]/75 text-[14px] sm:text-[15px] font-semibold tracking-wide">
                    {project.subtitle}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-black/5 border border-black/15 rounded text-[#222222] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Description, Bullet Points, and CTA Link */}
                <div className="lg:w-6/12 flex flex-col justify-between gap-6">
                  <p className="text-[#222222] text-[15px] sm:text-[16px] leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-2.5 text-[13.5px] sm:text-[14px] text-[#222222]/85 leading-normal">
                    {project.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="text-[#FF5722] text-base leading-none mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex items-center justify-between border-t border-black/10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[12px] sm:text-[12.5px] font-bold tracking-[1.5px] uppercase text-[#111111] hover:text-[#FF5722]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <span>VIEW PROJECT &amp; REPO</span>
                      <span className="text-base group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </a>
                    <span className="text-[10.5px] font-mono uppercase tracking-widest px-2 py-0.5 border border-black/20 text-neutral-600">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* End of Section Card / Note */}
        <div className="mt-8 pt-8 border-t border-black/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#222222]/70 text-[13px] font-sans">
            More details available on request. More projects are in active development.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[1.5px] uppercase text-[#111111] hover:text-[#FF5722] border-b border-black/40 pb-0.5"
          >
            <span>MORE ON GITHUB</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
