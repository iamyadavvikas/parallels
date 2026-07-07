import { books } from "@/data";
import Link from "next/link";

interface VerseOfDay {
  religion: string;
  bookTitle: string;
  bookSlug: string;
  chapterId: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
  reference: string;
}

function getVerseOfDay(): VerseOfDay[] {
  // Use date as seed for deterministic "random" selection
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  const selected: VerseOfDay[] = [];

  for (const book of books) {
    if (book.chapters.length === 0) continue;

    // Pick a chapter based on seed
    const chapterIdx = seed % book.chapters.length;
    const chapter = book.chapters[chapterIdx];

    if (chapter.verses.length === 0) continue;

    // Pick a verse based on seed + book index
    const bookIdx = books.indexOf(book);
    const verseIdx = (seed + bookIdx * 7) % chapter.verses.length;
    const verse = chapter.verses[verseIdx];

    selected.push({
      religion: book.religion,
      bookTitle: book.title,
      bookSlug: book.slug,
      chapterId: chapter.id,
      chapterNumber: chapter.number,
      verseNumber: verse.number,
      text: verse.translation || verse.text,
      reference: `${chapter.number}.${verse.number}`,
    });
  }

  return selected;
}

const traditionColors: Record<string, string> = {
  Hinduism: "border-l-[var(--tradition-hinduism)]",
  Christianity: "border-l-[var(--tradition-christianity)]",
  Islam: "border-l-[var(--tradition-islam)]",
  Judaism: "border-l-[var(--tradition-judaism)]",
  Sikhism: "border-l-[var(--tradition-sikhism)]",
  Buddhism: "border-l-[var(--tradition-buddhism)]",
};

export default function VerseOfDay() {
  const verses = getVerseOfDay();

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10">
          <span className="text-sm">✦</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-text-primary font-display tracking-tight">
            Verse of the Day
          </h2>
          <p className="text-xs text-text-muted">
            One verse from each tradition, refreshed daily
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {verses.map((v) => (
          <Link
            key={v.religion}
            href={`/books/${v.bookSlug}?ch=${v.chapterId}`}
            className={`group rounded-xl border border-border/30 bg-bg-secondary/50 p-4 transition-all hover:border-accent/30 hover:bg-accent/5 border-l-[3px] ${traditionColors[v.religion] || "border-l-border"}`}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-text-muted">
                {v.religion}
              </span>
              <span className="text-border">·</span>
              <span className="text-[10px] text-text-muted/60 font-mono">
                {v.reference}
              </span>
            </div>
            <p className="text-base leading-relaxed text-text-primary font-serif line-clamp-4">
              &ldquo;{v.text}&rdquo;
            </p>
            <p className="mt-2 text-[10px] text-accent/60 opacity-0 group-hover:opacity-100 transition-opacity">
              {v.bookTitle} →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
