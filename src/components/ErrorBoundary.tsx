import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught client-side error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-[#F3EFE9] text-[#111111] flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none">
          {/* Top Bar */}
          <header className="flex items-center justify-between border-b border-black/15 pb-4">
            <span
              className="text-[#111111] text-[13px] sm:text-[14px] font-bold tracking-wider uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Ayush Anand
            </span>
            <span
              className="text-[#FF5722] font-mono text-[12px] uppercase tracking-widest font-semibold"
            >
              [ Client Error ]
            </span>
          </header>

          {/* Center Content */}
          <main className="max-w-xl my-auto py-12">
            <span className="text-[#FF5722] font-mono text-[13px] font-bold tracking-wider uppercase block mb-3">
              Application Notice
            </span>

            <h1
              className="text-[clamp(36px,6vw,64px)] font-bold uppercase tracking-tight leading-[0.95] text-[#222222]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Something<br />went wrong
            </h1>

            <p
              className="mt-5 text-[#222222]/80 text-[15px] sm:text-[16px] leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              An unexpected client-side error occurred while rendering the page. Reloading the application usually resolves this.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={this.handleReload}
                className="px-6 py-3.5 bg-[#111111] text-[#F3EFE9] text-[13px] font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#FF5722] hover:text-white cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Reload page
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="px-6 py-3.5 border border-black/20 text-[#111111] text-[13px] font-bold uppercase tracking-wider transition-colors hover:border-[#FF5722] hover:text-[#FF5722] cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Back to homepage
              </button>
            </div>
          </main>

          {/* Footer */}
          <footer className="border-t border-black/15 pt-4 text-[#222222]/60 text-[12px] font-mono flex items-center justify-between">
            <span>© 2026 AYUSH ANAND</span>
            <span>SYSTEM STATE: RECOVERABLE</span>
          </footer>
        </div>
      );
    }

    return this.props.children;
  }
}
