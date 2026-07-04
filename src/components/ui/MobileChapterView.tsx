"use client";

import { useState, useMemo } from "react";
import type { Chapter, Verse, Religion } from "@/lib/types";
import VerseCard from "./VerseCard";
import { NeonDot, NeonBar } from "./NeonElements";

interface MobileChapterViewProps {
  chapters: {
    id: string;
    number: number;
    title: string;
    verses: Verse[];
  }[];
  religion: Religion;
  bookSlug: string;
  bookTitle: string;
}

export default function MobileChapterView({ chapters, religion, bookSlug, bookTitle }: MobileChapterViewProps) {
  const [selected, setSelected] = useState(chapters[0]?.id || "");

  const current = useMemo(() => chapters.find((c) => c.id === selected), [chapters, selected]);

  if (chapters.length <= 1) {
    return <AllChapters chapters={chapters} religion={religion} bookSlug={bookSlug} bookTitle={bookTitle} />;
  }

  return (
    <>
      {/* Desktop: all chapters */}
      <div className="hidden lg:block">
        <AllChapters chapters={chapters} religion={religion} bookSlug={bookSlug} bookTitle={bookTitle} />
      </div>

      {/* Mobile: one chapter at a time */}
      <div className="lg:hidden space-y-8">
        {/* Chapter selector */}
        <div className="sticky top-16 z-30 -mx-4 px-4 py-3 backdrop-blur-xl bg-bg-primary/80 border-b border-border/20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-text-muted shrink-0">Chapter</span>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="flex-1 rounded-lg border border-glass-border bg-glass backdrop-blur-sm px-3 py-2 text-sm text-text-primary font-body focus:outline-none focus:ring-2 focus:ring-accent/20"
              aria-label="Select chapter"
            >
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.number}. {ch.title}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-text-muted/60 font-mono shrink-0">
              {current && current.verses.length} v
            </span>
          </div>
        </div>

        {/* Current chapter */}
        {current && (
          <div key={current.id}>
            <div className="mb-4 flex items-center gap-3">
              <NeonBar religion={religion} />
              <h3 className="text-lg font-bold text-text-primary font-display tracking-tight">
                {current.number}. {current.title}
              </h3>
            </div>
            <div className="space-y-3">
              {current.verses.map((verse) => (
                <VerseCard
                  key={verse.id}
                  verse={verse}
                  chapterTitle={current.title}
                  reference={`${current.number}.${verse.number}`}
                  religionStyles="border-l-[3px]"
                  bookSlug={bookSlug}
                  bookTitle={bookTitle}
                  religion={religion}
                  chapterNum={current.number}
                  chapterId={current.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Navigation between chapters */}
        <div className="flex gap-2 pt-2 pb-8">
          {(() => {
            const idx = chapters.findIndex((c) => c.id === selected);
            return (
              <>
                {idx > 0 && (
                  <button
                    onClick={() => setSelected(chapters[idx - 1].id)}
                    className="flex-1 rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-text-primary hover:bg-bg-tertiary transition-colors"
                  >
                    ← {chapters[idx - 1].number}. {chapters[idx - 1].title}
                  </button>
                )}
                {idx < chapters.length - 1 && (
                  <button
                    onClick={() => setSelected(chapters[idx + 1].id)}
                    className="flex-1 rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-text-primary hover:bg-bg-tertiary transition-colors text-right"
                  >
                    {chapters[idx + 1].number}. {chapters[idx + 1].title} →
                  </button>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </>
  );
}

function AllChapters({ chapters, religion, bookSlug, bookTitle }: MobileChapterViewProps) {
  return (
    <div className="space-y-8">
      {chapters.map((chapter) => (
        <div key={chapter.id}>
          <div className="mb-4 flex items-center gap-3">
            <NeonBar religion={religion} />
            <h3 className="text-lg font-bold text-text-primary font-display tracking-tight">
              {chapter.number}. {chapter.title}
            </h3>
          </div>
          <div className="space-y-3">
            {chapter.verses.map((verse) => (
              <VerseCard
                key={verse.id}
                verse={verse}
                chapterTitle={chapter.title}
                reference={`${chapter.number}.${verse.number}`}
                religionStyles="border-l-[3px]"
                bookSlug={bookSlug}
                bookTitle={bookTitle}
                religion={religion}
                chapterNum={chapter.number}
                chapterId={chapter.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
