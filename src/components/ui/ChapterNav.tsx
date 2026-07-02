"use client";

import type { Chapter, Religion } from "@/lib/types";
import { religionDotColors } from "@/lib/utils";

export default function ChapterNav({
  chapters,
  religion,
}: {
  chapters: Chapter[];
  religion: Religion;
}) {
  return (
    <>
      <nav className="hidden lg:block">
        <ul className="space-y-0.5">
          {chapters.map((ch) => (
            <li key={ch.id}>
              <a
                href={`#${ch.id}`}
                className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-text-muted hover:bg-bg-tertiary hover:text-text-primary transition-colors font-body"
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${religionDotColors[religion]}`} />
                <span className="truncate">{ch.number}. {ch.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="lg:hidden">
        <select
          className="w-full rounded-lg border border-border bg-bg-secondary px-3 py-2.5 text-sm text-text-primary font-body focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40"
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
