import { notFound } from "next/navigation";
import Link from "next/link";
import { books } from "@/data";
import VerseCard from "@/components/ui/VerseCard";
import ChapterNav from "@/components/ui/ChapterNav";

export async function generateStaticParams() {
  const params: { bookSlug: string; chapterId: string; verseId: string }[] = [];
  for (const book of books) {
    for (const chapter of book.chapters) {
      for (const verse of chapter.verses) {
        params.push({
          bookSlug: book.slug,
          chapterId: chapter.id,
          verseId: verse.id,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterId: string; verseId: string }>;
}) {
  const { bookSlug, chapterId, verseId } = await params;
  const book = books.find((b) => b.slug === bookSlug);
  if (!book) return { title: "Verse Not Found — Parallels" };
  const chapter = book.chapters.find((c) => c.id === chapterId);
  if (!chapter) return { title: "Verse Not Found — Parallels" };
  const verse = chapter.verses.find((v) => v.id === verseId);
  if (!verse) return { title: "Verse Not Found — Parallels" };
  const text = (verse.translation || verse.text).slice(0, 160);
  return {
    title: `${chapter.number}.${verse.number} ${book.title} — Parallels`,
    description: `"${text}" — ${book.title}, Chapter ${chapter.number}, Verse ${verse.number}`,
    openGraph: {
      title: `${chapter.number}.${verse.number} ${book.title}`,
      description: text,
      type: "article",
    },
  };
}

export default async function VersePage({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterId: string; verseId: string }>;
}) {
  const { bookSlug, chapterId, verseId } = await params;
  const book = books.find((b) => b.slug === bookSlug);
  if (!book) notFound();
  const chapter = book.chapters.find((c) => c.id === chapterId);
  if (!chapter) notFound();
  const verse = chapter.verses.find((v) => v.id === verseId);
  if (!verse) notFound();

  const chapterIndex = book.chapters.indexOf(chapter);
  const prevChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < book.chapters.length - 1 ? book.chapters[chapterIndex + 1] : null;

  return (
    <div className="mx-auto max-w-3xl space-y-6 page-enter">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-text-muted font-mono">
        <Link href="/" className="hover:text-accent transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/books/${book.slug}`} className="hover:text-accent transition-colors">
          {book.title}
        </Link>
        <span>/</span>
        <Link
          href={`/books/${book.slug}?ch=${chapter.id}`}
          className="hover:text-accent transition-colors"
        >
          Ch. {chapter.number}
        </Link>
        <span>/</span>
        <span className="text-accent">v{verse.number}</span>
      </nav>

      {/* Chapter navigation */}
      <ChapterNav
        chapters={book.chapters}
        religion={book.religion}
      />

      {/* Verse */}
      <VerseCard
        verse={verse}
        chapterTitle={chapter.title}
        reference={`${chapter.number}.${verse.number}`}
        bookSlug={book.slug}
        bookTitle={book.title}
        religion={book.religion}
        chapterNum={chapter.number}
        chapterId={chapter.id}
      />

      {/* Surrounding verses */}
      {chapter.verses.length > 1 && (
        <div className="space-y-3 pt-4 border-t border-border/20">
          <p className="text-xs font-mono tracking-wider uppercase text-text-muted mb-4">
            All verses in {chapter.title}
          </p>
          {chapter.verses
            .filter((v) => v.id !== verse.id)
            .map((v) => (
              <Link
                key={v.id}
                href={`/verse/${book.slug}/${chapter.id}/${v.id}`}
                className="block rounded-xl border border-border/30 bg-bg-secondary/50 p-4 text-text-secondary hover:border-accent/30 hover:bg-accent/5 transition-all"
              >
                <span className="text-xs font-mono text-text-muted mr-2">
                  {chapter.number}.{v.number}
                </span>
                {(v.translation || v.text).slice(0, 150)}
                {(v.translation || v.text).length > 150 ? "..." : ""}
              </Link>
            ))}
        </div>
      )}

      {/* Prev/Next chapter */}
      <div className="flex gap-3 pt-4">
        {prevChapter && (
          <Link
            href={`/books/${book.slug}?ch=${prevChapter.id}`}
            className="flex-1 rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-text-primary hover:bg-bg-tertiary transition-colors text-left"
          >
            ← Ch. {prevChapter.number}: {prevChapter.title}
          </Link>
        )}
        {nextChapter && (
          <Link
            href={`/books/${book.slug}?ch=${nextChapter.id}`}
            className="flex-1 rounded-xl border border-border bg-bg-secondary px-4 py-3 text-sm text-text-primary hover:bg-bg-tertiary transition-colors text-right"
          >
            Ch. {nextChapter.number}: {nextChapter.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
