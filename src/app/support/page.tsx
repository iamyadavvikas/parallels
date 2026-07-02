"use client";

import { Heart, Coffee, ExternalLink } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-[80vh] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        {/* Header */}
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
          <Heart className="h-7 w-7 text-accent" />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-text-primary font-display tracking-tight">
          Support Parallels
        </h1>
        <p className="mb-12 text-lg text-text-muted font-body leading-relaxed">
          If this tool helps you explore sacred texts across traditions,
          consider supporting its development. Every contribution keeps it free and ad-free.
        </p>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Buy Me a Coffee */}
          <a
            href="https://www.buymeacoffee.com/iamyadavvikas"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center rounded-2xl border border-border/40 bg-bg-secondary/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#FFDD00]/30 hover:shadow-[0_0_40px_rgba(255,221,0,0.08)]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFDD00]/10 transition-transform duration-300 group-hover:scale-110">
              <Coffee className="h-8 w-8 text-[#FFDD00]" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-text-primary font-body">
              Buy Me a Coffee
            </h3>
            <p className="mb-4 text-sm text-text-muted font-body">
              One-time support — any amount helps
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-[#FFDD00]">
              Support now <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>

          {/* GitHub Sponsors */}
          <a
            href="https://github.com/sponsors/iamyadavvikas"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center rounded-2xl border border-border/40 bg-bg-secondary/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#EA4AAA]/30 hover:shadow-[0_0_40px_rgba(234,74,170,0.08)]"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EA4AAA]/10 transition-transform duration-300 group-hover:scale-110">
              <svg className="h-8 w-8 text-[#EA4AAA]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-text-primary font-body">
              GitHub Sponsors
            </h3>
            <p className="mb-4 text-sm text-text-muted font-body">
              Recurring monthly support for ongoing development
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-[#EA4AAA]">
              Sponsor <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

        {/* Thank you */}
        <div className="mt-12 rounded-2xl border border-border/30 bg-bg-tertiary/30 p-6 backdrop-blur-sm">
          <p className="text-sm text-text-muted font-body">
            Parallels is and will remain <span className="text-text-primary font-medium">free and ad-free</span>.
            Your support covers hosting, domain, and the time spent building and maintaining this tool.
          </p>
        </div>
      </div>
    </div>
  );
}
