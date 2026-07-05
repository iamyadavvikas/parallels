import { books } from "@/data";
import { notFound } from "next/navigation";
import ReligionBadge from "@/components/ui/ReligionBadge";
import VerseCard from "@/components/ui/VerseCard";
import ChapterNav from "@/components/ui/ChapterNav";
import MobileChapterView from "@/components/ui/MobileChapterView";
import RecordVisit from "@/components/layout/RecordVisit";
import { NeonDot, NeonBar, BackToTop } from "@/components/ui/NeonElements";

export const dynamic = "force-dynamic";

const traditionColors: Record<string, string> = {
  Hinduism: "var(--tradition-hinduism)",
  Christianity: "var(--tradition-christianity)",
  Islam: "var(--tradition-islam)",
  Judaism: "var(--tradition-judaism)",
  Sikhism: "var(--tradition-sikhism)",
  Buddhism: "var(--tradition-buddhism)",
};

const traditionGlows: Record<string, string> = {
  Hinduism: "var(--neon-hinduism)",
  Christianity: "var(--neon-christianity)",
  Islam: "var(--neon-islam)",
  Judaism: "var(--neon-judaism)",
  Sikhism: "var(--neon-sikhism)",
  Buddhism: "var(--neon-buddhism)",
};

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  const color = traditionColors[book.religion];
  const glow = traditionGlows[book.religion];

  return (
    <div className="lg:flex lg:gap-10 page-enter">
      <RecordVisit
        bookSlug={book.slug}
        bookTitle={book.title}
        religion={book.religion}
        chapterNum={1}
      />
      <aside className="mb-8 lg:mb-0 lg:w-56 lg:shrink-0">
        <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:scrollbar-thin rounded-2xl border border-glass-border bg-glass backdrop-blur-[24px] saturate-[1.8] p-4">
          <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-text-muted font-mono">
            Chapters
          </h3>
          <ChapterNav chapters={book.chapters} religion={book.religion} />
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-10">
        <header className="relative">
          <div
            className="absolute -left-4 top-0 h-full w-1 rounded-full opacity-60"
            style={{
              background: color,
              boxShadow: `0 0 8px ${glow}`,
            }}
          />
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <ReligionBadge religion={book.religion} />
            <span className="text-sm text-text-muted font-mono tracking-wide">{book.originDate}</span>
            <span className="text-sm text-text-muted font-body">·</span>
            <span className="text-sm text-text-muted font-body">{book.originalLanguage}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl font-display">
            {book.title}
          </h1>
          {book.subtitle && (
            <p className="mt-2 text-lg italic text-text-muted font-serif">{book.subtitle}</p>
          )}
          <p className="mt-4 max-w-3xl leading-relaxed text-text-secondary font-body">
            {book.description}
          </p>
        </header>

        {/* Quick Facts — glass card */}
        <div className="grid gap-4 rounded-2xl border border-glass-border bg-glass backdrop-blur-[24px] saturate-[1.8] p-6 sm:grid-cols-2 lg:grid-cols-3">
          {book.quickFacts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted font-mono">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-sm font-medium text-text-primary font-body">{fact.value}</dd>
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-[10px] font-semibold uppercase tracking-widest text-text-muted font-mono">
              Central Themes
            </dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {book.centralThemes.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs font-medium text-text-secondary border border-glass-border bg-glass backdrop-blur-sm font-body transition-all duration-300 hover:border-border/40"
                  style={{
                    boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.03)`,
                  }}
                >
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </div>

        {/* Chapters & Verses */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <NeonDot religion={book.religion} />
            <h2 className="text-xl font-bold text-text-primary font-display tracking-tight">
              Chapters & Verses
            </h2>
          </div>
          <MobileChapterView
            chapters={book.chapters.map((ch) => ({
              id: ch.id,
              number: ch.number,
              title: ch.title,
              verseCount: ch.verses.length,
            }))}
            religion={book.religion}
            bookSlug={book.slug}
            bookTitle={book.title}
          />
        </section>

        <BackToTop religion={book.religion} />
      </div>
    </div>
  );
}
