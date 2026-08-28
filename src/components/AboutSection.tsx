export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-[#141414] text-[#F3EFE9] py-20 sm:py-28 px-6 sm:px-10 lg:px-14 relative z-10 border-b border-black/50 selection:bg-[#FF5722] selection:text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-[#FF5722] font-mono text-[13px] sm:text-[14px] font-semibold tracking-wider block mb-3">
              03 / 05
            </span>
            <h2
              className="text-[clamp(42px,7.5vw,110px)] font-bold uppercase tracking-[-0.02em] leading-[0.88] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              About me
            </h2>
          </div>
          <p className="text-neutral-400 text-[14px] sm:text-[15px] max-w-[340px] leading-relaxed font-sans lg:text-right">
            A developer who pays attention to the bit between the brief and the browser.
          </p>
        </div>

        <div className="section-divider-line w-full h-[1.5px] bg-neutral-800 mb-12 sm:mb-16" />

        {/* Main Grid: Badge + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Location & Origin Badge */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-neutral-700 bg-neutral-900 flex flex-col items-center justify-center text-center p-6 shadow-xl group hover:border-[#FF5722] transition-colors">
              <span className="text-[#FF5722] font-black text-2xl tracking-tighter mb-2">
                IN
              </span>
              <span className="text-neutral-300 font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[2px] font-bold leading-tight">
                BASED IN INDIA<br />
                WORKING EVERYWHERE
              </span>
              <div className="mt-3 w-6 h-[1.5px] bg-[#FF5722]" />
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-[280px]">
              <div className="border-t border-neutral-800 pt-3">
                <span className="text-[10.5px] font-mono uppercase text-neutral-500 block">EDUCATION</span>
                <span className="text-[13px] font-semibold text-white">LPU (2nd Year)</span>
              </div>
              <div className="border-t border-neutral-800 pt-3">
                <span className="text-[10.5px] font-mono uppercase text-neutral-500 block">CGPA</span>
                <span className="text-[13px] font-semibold text-[#FF5722]">8.42</span>
              </div>
            </div>
          </div>

          {/* Right Column: Statement & Bio Text */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <h3
              className="text-[clamp(30px,4.2vw,56px)] font-bold tracking-tight leading-[1.05] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              I care about the logic behind the lovely surface.
            </h3>

            <div className="space-y-5 text-[15.5px] sm:text-[17px] text-neutral-300 leading-relaxed font-sans">
              <p>
                I'm a second-year student at Lovely Professional University from Bihar, India, currently holding a CGPA of 8.42.
              </p>
              <p>
                What actually pulled me into building things was frustration — realizing how many tools people pay for are things that could genuinely be built in a day or two, especially now, in the AI era. I wanted something I couldn't afford, so instead of paying for it, I built it myself.
              </p>
              <p>
                That's more or less how this whole path started, and it's still what pulls me toward every new project — solving a real problem, cheaply and directly.
              </p>
              <p className="text-neutral-400 text-[14.5px] sm:text-[15.5px] pt-4 border-t border-neutral-800">
                Good software is a conversation between a person and an idea. My job is to make that conversation feel natural — with a little character, and no unnecessary friction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
