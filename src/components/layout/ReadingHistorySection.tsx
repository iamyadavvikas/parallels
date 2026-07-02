"use client";

import Link from "next/link";
import { useReadingHistoryStore } from "@/store/readingHistoryStore";
import { religionDotColors, religionAccentColors } from "@/lib/utils";
import { History } from "lucide-react";

export default function ReadingHistorySection() {
  const history = useReadingHistoryStore((s) => s.history);
  const recent = history.slice(0, 5);
  if (recent.length === 0) return null;

  return (
    <section className="animate-fade-in-up">
      <div className="mb-4 flex items-center gap-2">
        <History className="h-4 w-4 text-accent" />
        <h2 className="text-lg font-bold text-text-primary font-display">Continue Reading</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <Link key={`${item.bookSlug}-${item.chapterNum}`}
            href={`/books/${item.bookSlug}#${item.bookSlug}-ch-${item.chapterNum}`}
            className="group flex items-center gap-2.5 rounded-xl border border-border/60 bg-bg-secondary px-3.5 py-2.5 transition-all hover:border-border hover:shadow-sm">
            <span className={`h-1.5 w-1.5 rounded-full ${religionDotColors[item.religion]}`} />
            <div>
              <span className={`text-sm font-medium ${religionAccentColors[item.religion]}`}>
                {item.bookTitle}
              </span>
              <span className="ml-1.5 text-xs text-text-muted">
                Ch {item.chapterNum}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
