"use client";

import type { Chapter, Religion } from "@/lib/types";

const traditionColors: Record<Religion, string> = {
  Hinduism: "var(--tradition-hinduism)",
  Christianity: "var(--tradition-christianity)",
  Islam: "var(--tradition-islam)",
  Judaism: "var(--tradition-judaism)",
  Sikhism: "var(--tradition-sikhism)",
  Buddhism: "var(--tradition-buddhism)",
};

const traditionGlows: Record<Religion, string> = {
  Hinduism: "var(--neon-hinduism)",
  Christianity: "var(--neon-christianity)",
  Islam: "var(--neon-islam)",
  Judaism: "var(--neon-judaism)",
  Sikhism: "var(--neon-sikhism)",
  Buddhism: "var(--neon-buddhism)",
};

export default function ChapterNav({
  chapters,
  religion,
}: {
  chapters: Chapter[];
  religion: Religion;
}) {
  const color = traditionColors[religion];
  const glow = traditionGlows[religion];

  return (
    <>
      <nav className="hidden lg:block">
        <ul className="space-y-0.5">
          {chapters.map((ch) => (
            <li key={ch.id}>
              <a
                href={`#${ch.id}`}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-text-muted hover:bg-glass hover:text-text-primary transition-all duration-300 font-body group/ch"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full transition-shadow duration-300 group-hover/ch:shadow-[0_0_8px_var(--glow)]"
                  style={{
                    background: color,
                    ["--glow" as string]: glow,
                  }}
                />
                <span className="truncate">{ch.number}. {ch.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="lg:hidden">
        <select
          className="w-full rounded-lg border border-glass-border bg-glass backdrop-blur-sm px-3 py-2.5 text-sm text-text-primary font-body focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all"
          onChange={(e) => {
            if (e.target.value) {
              document.getElementById(e.target.value)?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Jump to chapter...</option>
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.number}. {ch.title}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
