"use client";

import { useState, useEffect, useCallback } from "react";
import type { Chapter, Verse, Religion } from "@/lib/types";
import VerseCard from "./VerseCard";
import { NeonDot, NeonBar } from "./NeonElements";

interface ChapterMeta {
  id: string;
  number: number;
  title: string;
  verseCount?: number;
}

interface MobileChapterViewProps {
  chapters: ChapterMeta[];
  religion: Religion;
  bookSlug: string;
  bookTitle: string;
}

export default function MobileChapterView({ chapters, religion, bookSlug, bookTitle }: MobileChapterViewProps) {
  const [selected, setSelected] = useState(chapters[0]?.id || "");
  const [loadedChapters, setLoadedChapters] = useState<Map<string, Verse[]>>(new Map());
  const [loading, setLoading] = useState<string | null>(null);

  const fetchChapter = useCallback(async (chapterId: string) => {
    if (loadedChapters.has(chapterId)) return;
    setLoading(chapterId);
    try {
      const res = await fetch(`/api/chapter/${bookSlug}/${chapterId}`);
      if (res.ok) {
        const data = await res.json();
        setLoadedChapters((prev) => new Map(prev).set(chapterId, data.verses));
      }
    } catch (e) {
      console.error("Failed to load chapter:", e);
    } finally {
      setLoading(null);
    }
  }, [bookSlug, loadedChapters]);

  useEffect(() => {
    if (selected && !loadedChapters.has(selected)) {
      fetchChapter(selected);
    }
  }, [selected, fetchChapter, loadedChapters]);

  const currentVerses = loadedChapters.get(selected) || [];
  const currentChapter = chapters.find((c) => c.id === selected);

  if (chapters.length <= 1) {
    return <AllChapters chapters={chapters} religion={religion} bookSlug={bookSlug} bookTitle={bookTitle} loadedChapters={loadedChapters} loading={loading} />;
  }

  return (
    <>
      {/* Desktop: chapter selector + lazy-loaded content */}
      <div className="hidden lg:block">
        <AllChapters chapters={chapters} religion={religion} bookSlug={bookSlug} bookTitle={bookTitle} loadedChapters={loadedChapters} loading={loading} />
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
              {currentVerses.length || currentChapter?.verseCount || "?"} v
            </span>
          </div>
        </div>

        {/* Current chapter */}
        <div key={selected} id={selected}>
          <div className="mb-4 flex items-center gap-3">
            <NeonBar religion={religion} />
            <h3 className="text-lg font-bold text-text-primary font-display tracking-tight">
              {currentChapter?.number}. {currentChapter?.title}
            </h3>
          </div>
          {loading === selected ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-glass animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {currentVerses.map((verse) => (
                <VerseCard
                  key={verse.id}
                  verse={verse}
                  chapterTitle={currentChapter?.title || ""}
                  reference={`${currentChapter?.number}.${verse.number}`}
                  religionStyles="border-l-[3px]"
                  bookSlug={bookSlug}
                  bookTitle={bookTitle}
                  religion={religion}
                  chapterNum={currentChapter?.number || 0}
                  chapterId={selected}
                />
              ))}
            </div>
          )}
        </div>

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

function AllChapters({ chapters, religion, bookSlug, bookTitle, loadedChapters, loading }: MobileChapterViewProps & { loadedChapters: Map<string, Verse[]>; loading: string | null }) {
  const [visibleCount, setVisibleCount] = useState(50);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setVisibleCount((prev) => Math.min(prev + 50, chapters.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chapters.length]);

  const visibleChapters = chapters.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      {visibleCount < chapters.length && (
        <div className="text-center text-text-muted text-sm font-mono">
          Showing {visibleCount} of {chapters.length} chapters — scroll for more
        </div>
      )}
      {visibleChapters.map((chapter) => {
        const verses = loadedChapters.get(chapter.id);
        const isLoading = loading === chapter.id;

        return (
          <LazyChapter
            key={chapter.id}
            chapter={chapter}
            verses={verses}
            isLoading={isLoading}
            religion={religion}
            bookSlug={bookSlug}
            bookTitle={bookTitle}
          />
        );
      })}
    </div>
  );
}

function LazyChapter({ chapter, verses, isLoading, religion, bookSlug, bookTitle }: {
  chapter: ChapterMeta;
  verses?: Verse[];
  isLoading: boolean;
  religion: Religion;
  bookSlug: string;
  bookTitle: string;
}) {
  const [fetched, setFetched] = useState(false);
  const [chapterVerses, setChapterVerses] = useState<Verse[]>(verses || []);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (verses) {
      setChapterVerses(verses);
      setFetched(true);
      return;
    }
    if (fetched || fetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fetched && !fetching) {
          setFetching(true);
          fetch(`/api/chapter/${bookSlug}/${chapter.id}`)
            .then((res) => res.json())
            .then((data) => {
              setChapterVerses(data.verses || []);
              setFetched(true);
            })
            .catch(() => setFetched(true))
            .finally(() => setFetching(false));
        }
      },
      { rootMargin: "200px" }
    );

    const el = document.getElementById(chapter.id);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [chapter.id, bookSlug, fetched, fetching, verses]);

  const displayVerses = chapterVerses || verses || [];

  return (
    <div id={chapter.id}>
      <div className="mb-4 flex items-center gap-3">
        <NeonBar religion={religion} />
        <h3 className="text-lg font-bold text-text-primary font-display tracking-tight">
          {chapter.number}. {chapter.title}
        </h3>
        {!fetched && !isLoading && (
          <span className="text-[10px] text-text-muted/60 font-mono ml-auto">
            {chapter.verseCount || "?"} verses
          </span>
        )}
      </div>
      {(fetching || isLoading) && !displayVerses.length ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-glass animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {displayVerses.map((verse) => (
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
      )}
    </div>
  );
}
