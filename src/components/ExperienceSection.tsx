export default function ExperienceSection() {
  const experiences = [
    {
      period: "2026",
      role: "Microsoft Student Ambassador",
      organization: "MICROSOFT / TECHNICAL COMMUNITY",
      badge: "AMBASSADOR",
      description:
        "Recognized as a Microsoft Student Ambassador in 2026. Engaging with developer ecosystems, exploring modern cloud technologies, and supporting student developer learning initiatives.",
    },
    {
      period: "2025 – 2026",
      role: "Hackathon Competitor & Builder",
      organization: "INDEPENDENT TEAMS / COMPETITIVE",
      badge: "4TH PLACE",
      description:
        "Participated in 6+ hackathons, working in collaborative teams of 3–6 on intensive software and hardware projects, competing against 50–100+ teams. Secured 4th place in a competitive multi-team sprint.",
    },
    {
      period: "2025",
      role: "AWS Cloud Computing Workshop",
      organization: "AMAZON WEB SERVICES / LPU",
      badge: "CERTIFICATE",
      description:
        "Completed hands-on AWS Cloud Computing workshop covering cloud infrastructure fundamentals, core AWS services, and scalable deployment architectures.",
    },
    {
      period: "2024 – 2025",
      role: "One World Cultural Coordinator",
      organization: "UNIVERSITY WIDE EVENT",
      badge: "LEADERSHIP",
      description:
        "Represented a featured country in a university-wide cultural event. Collaborated with a multidisciplinary team of 50+ students over a month across cultural pavilion setups, live performances, and event rally logistics.",
    },
  ];

  return (
    <section
      id="experience"
      className="w-full bg-[#F3EFE9] text-[#111111] py-20 sm:py-28 px-6 sm:px-10 lg:px-14 relative z-10 border-b border-black/20 selection:bg-neutral-900 selection:text-[#F3EFE9]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[#FF5722] font-mono text-[13px] sm:text-[14px] font-semibold tracking-wider block mb-3">
              04 / 05
            </span>
            <h2
              className="text-[clamp(42px,7.5vw,110px)] font-bold uppercase tracking-[-0.02em] leading-[0.88]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Work history
            </h2>
          </div>
          <p className="text-[#222222]/80 text-[14px] sm:text-[15px] max-w-[340px] leading-relaxed font-sans lg:text-right">
            A short timeline of places where the questions got better.
          </p>
        </div>

        <div className="section-divider-line w-full h-[1.5px] bg-[#111111] mb-12 sm:mb-16" />

        {/* Timeline Entries */}
        <div className="flex flex-col divide-y divide-black/15">
          {experiences.map((item, idx) => (
            <div
              key={idx}
              className="py-10 sm:py-12 first:pt-0 last:pb-4 group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
            >
              {/* Period Column */}
              <div className="lg:col-span-3">
                <span className="font-mono text-[13px] sm:text-[14px] font-semibold text-[#222222]/70 group-hover:text-[#FF5722] transition-colors">
                  {item.period}
                </span>
              </div>

              {/* Main Content Column */}
              <div className="lg:col-span-7 flex flex-col gap-2">
                <h3
                  className="text-[clamp(24px,3.2vw,38px)] font-bold uppercase tracking-tight text-[#111111] group-hover:text-[#FF5722]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {item.role}
                </h3>
                <span className="text-[#FF5722] font-mono text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[1.8px]">
                  {item.organization}
                </span>
                <p className="mt-2 text-[#222222]/85 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Badge Column */}
              <div className="lg:col-span-2 flex justify-start lg:justify-end">
                <span className="px-3 py-1 text-[10.5px] font-mono font-bold uppercase tracking-wider border border-black/20 text-[#222222] group-hover:border-[#FF5722] group-hover:text-[#FF5722] transition-colors">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
