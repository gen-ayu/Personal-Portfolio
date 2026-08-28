export default function ContactSection() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#F3EFE9] text-[#111111] pt-20 sm:pt-28 pb-10 px-6 sm:px-10 lg:px-14 relative z-10 selection:bg-neutral-900 selection:text-[#F3EFE9]"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[70vh]">
        {/* Top Area: Big Headline & Intro */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12 sm:mb-16">
            <div className="max-w-4xl">
              <span className="text-[#FF5722] font-mono text-[13px] sm:text-[14px] font-semibold tracking-wider block mb-3">
                05 / 05
              </span>
              <h2
                className="text-[clamp(54px,11.5vw,165px)] font-bold uppercase tracking-[-0.03em] leading-[0.84] text-[#111111]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Let's<br />
                make<br />
                something.
              </h2>
            </div>

            <div className="lg:max-w-sm lg:pt-10">
              <p className="text-[#222222]/85 text-[15px] sm:text-[17px] leading-relaxed font-sans">
                Have a sharp problem, a half-formed idea, or a product that needs a little more care? I would like to hear about it.
              </p>

              {/* Direct Action Links */}
              <div className="mt-8 sm:mt-10 flex flex-col gap-4">
                <a
                  href="mailto:hello@ayushanand.dev"
                  className="inline-flex items-center gap-3 text-[13px] sm:text-[14px] font-bold tracking-[2px] uppercase text-[#111111] hover:text-[#FF5722] border-b border-black/50 hover:border-[#FF5722] pb-1.5 w-fit group"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>START A CONVERSATION</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                </a>

                <a
                  href="mailto:hello@ayushanand.dev?subject=Resume%20Request%20-%20Ayush%20Anand"
                  className="inline-flex items-center gap-3 text-[13px] sm:text-[14px] font-bold tracking-[2px] uppercase text-[#111111] hover:text-[#FF5722] border-b border-black/50 hover:border-[#FF5722] pb-1.5 w-fit group"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span>REQUEST RESUME</span>
                  <span className="text-base group-hover:translate-y-1 transition-transform">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Brand, Socials, Back to Top */}
        <div className="pt-12 mt-12 border-t border-black/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <span
            className="font-mono text-[11.5px] uppercase tracking-[2.2px] text-[#111111] font-bold"
          >
            AYUSH ANAND / 2026
          </span>

          <div className="flex items-center gap-8 sm:gap-10">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#111111] hover:text-[#FF5722]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GITHUB</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#111111] hover:text-[#FF5722]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LINKEDIN</span>
            </a>

            <button
              onClick={handleScrollToTop}
              className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#111111] hover:text-[#FF5722] flex items-center gap-1.5 cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
