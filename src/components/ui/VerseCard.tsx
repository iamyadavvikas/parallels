import type { Verse, Religion } from "@/lib/types";
import BookmarkButton from "./BookmarkButton";
import NoteButton from "./NoteButton";

interface VerseCardProps {
  verse: Verse;
  chapterTitle?: string;
  reference: string;
  religionStyles?: string;
  bookSlug?: string;
  bookTitle?: string;
  religion?: Religion;
  chapterNum?: number;
}

export default function VerseCard({
  verse,
  chapterTitle,
  reference,
  religionStyles = "",
  bookSlug,
  bookTitle,
  religion,
  chapterNum,
}: VerseCardProps) {
  return (
    <div
      className="group rounded-xl border border-glass-border bg-glass backdrop-blur-sm p-5 transition-all duration-500 hover:border-border/30 hover:shadow-[0_0_20px_var(--neon-default)]"
      style={{
        boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.03)`,
      }}
    >
      <div className={`flex gap-4 ${religionStyles || ""}`}>
        <span className="verse-number mt-0.5">{verse.number}</span>
        <div className="min-w-0 flex-1">
          {(chapterTitle || reference) && (
            <div className="mb-2 flex items-center gap-2 text-xs text-text-muted font-mono tracking-wide">
              {chapterTitle && (
                <span className="font-semibold uppercase tracking-widest">{chapterTitle}</span>
              )}
              {reference && chapterTitle && <span className="text-border">·</span>}
              {reference && <span>{reference}</span>}
            </div>
          )}
          {(verse.translation || verse.text) && (
            <p className="leading-relaxed text-text-primary font-serif leading-[1.9]">
              {verse.translation || verse.text}
            </p>
          )}
          {verse.text && verse.translation && (
            <p className="mt-3 text-sm italic text-text-muted border-l-2 border-border/30 pl-4 leading-relaxed font-serif">
              {verse.text}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            {verse.source && (
              <p className="text-xs text-text-muted/80 font-mono tracking-wide">
                — {verse.source.translator} ({verse.source.year})
              </p>
            )}
            {bookSlug && religion && (
              <div className="flex items-center gap-1">
                <BookmarkButton
                  verseId={verse.id}
                  bookSlug={bookSlug}
                  bookTitle={bookTitle || ""}
                  religion={religion}
                  chapterNum={chapterNum || 0}
                  verseNum={verse.number}
                  reference={reference}
                  text={verse.translation || verse.text}
                />
                <NoteButton
                  verseId={verse.id}
                  bookSlug={bookSlug}
                  bookTitle={bookTitle || ""}
                  religion={religion}
                  chapterNum={chapterNum || 0}
                  verseNum={verse.number}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
