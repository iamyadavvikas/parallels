"use client";

import type { ReactNode } from "react";

const traditionGlows: Record<string, string> = {
  Hinduism: "var(--neon-hinduism)",
  Christianity: "var(--neon-christianity)",
  Islam: "var(--neon-islam)",
  Judaism: "var(--neon-judaism)",
  Sikhism: "var(--neon-sikhism)",
  Buddhism: "var(--neon-buddhism)",
};

const traditionColors: Record<string, string> = {
  Hinduism: "var(--tradition-hinduism)",
  Christianity: "var(--tradition-christianity)",
  Islam: "var(--tradition-islam)",
  Judaism: "var(--tradition-judaism)",
  Sikhism: "var(--tradition-sikhism)",
  Buddhism: "var(--tradition-buddhism)",
};

export function NeonDot({ religion }: { religion: string }) {
  const color = traditionColors[religion] || "var(--accent)";
  const glow = traditionGlows[religion] || "var(--neon-default)";
  return (
    <span
      className="h-2 w-2 rounded-full inline-block"
      style={{
        background: color,
        boxShadow: `0 0 6px ${glow}`,
      }}
    />
  );
}

export function NeonBar({ religion }: { religion: string }) {
  const color = traditionColors[religion] || "var(--accent)";
  const glow = traditionGlows[religion] || "var(--neon-default)";
  return (
    <span
      className="h-1 w-8 rounded-full inline-block"
      style={{
        background: color,
        boxShadow: `0 0 4px ${glow}`,
      }}
    />
  );
}

export function BackToTop({ religion }: { religion: string }) {
  const color = traditionColors[religion] || "var(--accent)";
  const glow = traditionGlows[religion] || "var(--neon-default)";
  return (
    <a
      href="#"
      className="fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full text-void transition-all duration-300 hover:scale-110 active:scale-95 md:bottom-6 md:right-6"
      style={{
        background: color,
        boxShadow: `0 4px 20px ${glow}, 0 0 30px ${glow}`,
      }}
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
    </a>
  );
}

export function GlassCard({
  children,
  religion,
  className = "",
}: {
  children: ReactNode;
  religion?: string;
  className?: string;
}) {
  const glow = religion ? traditionGlows[religion] : undefined;
  const bgColor = religion ? traditionColors[religion] : undefined;

  return (
    <div
      className={`group relative rounded-2xl border border-glass-border bg-glass backdrop-blur-[24px] saturate-[1.8] p-6 transition-all duration-500 hover:border-border/30 overflow-hidden ${className}`}
      onMouseEnter={(e) => {
        if (glow) {
          e.currentTarget.style.boxShadow = `0 0 25px ${glow}`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `none`;
      }}
    >
      {glow && (
        <div
          className="absolute -top-10 -right-10 h-24 w-24 rounded-full blur-[50px] opacity-0 group-hover:opacity-25 transition-opacity duration-700"
          style={{ background: bgColor }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
