import { books } from "@/data";
import { notFound } from "next/navigation";
import { religionDotColors } from "@/lib/utils";
import ReligionBadge from "@/components/ui/ReligionBadge";
import VerseCard from "@/components/ui/VerseCard";
import ChapterNav from "@/components/ui/ChapterNav";
import RecordVisit from "@/components/layout/RecordVisit";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  return (
    <div className="lg:flex lg:gap-10">
      <RecordVisit
        bookSlug={book.slug}
        bookTitle={book.title}
        religion={book.religion}
        chapterNum={1}
      />
      <aside className="mb-8 lg:mb-0 lg:w-56 lg:shrink-0">
        <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:scrollbar-thin">
          <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-text-muted font-mono">
            Chapters
          </h3>
          <ChapterNav chapters={book.chapters} religion={book.religion} />
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-10">
        <header className="relative">
          <div className="absolute -left-4 top-0 h-full w-1 rounded-full opacity-60"
            style={{ background: `var(--color-accent)` }}
          />
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <ReligionBadge religion={book.religion} />
            <span className="text-sm text-text-muted font-mono tracking-wide">{book.originDate}</span>
            <span className="text-sm text-text-muted font-body">·</span>
            <span className="text-sm text-text-muted font-body">{book.originalLanguage}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary font-display" style={{ letterSpacing: '-0.03em' }}>
            {book.title}
          </h1>
          {book.subtitle && (
            <p className="mt-2 text-lg italic text-text-muted font-serif">{book.subtitle}</p>
          )}
          <p className="mt-4 max-w-3xl leading-relaxed text-text-secondary font-body">
            {book.description}
          </p>
        </header>

        <div className="grid gap-4 rounded-2xl border border-border bg-bg-secondary p-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <span key={t} className="rounded-full bg-bg-tertiary px-3 py-1 text-xs font-medium text-text-secondary border border-border font-body">
                  {t}
                </span>
              ))}
            </dd>
          </div>
        </div>

        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${religionDotColors[book.religion]}`} />
            <h2 className="text-xl font-bold text-text-primary font-display tracking-tight">
              Chapters & Verses
            </h2>
          </div>
          <div className="space-y-8">
            {book.chapters.map((chapter) => (
              <div key={chapter.id} id={`${book.slug}-ch-${chapter.number}`}>
                <div className="mb-4 flex items-center gap-3">
                  <span className={`h-1 w-8 rounded-full ${religionDotColors[book.religion]}`} />
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
                      religionStyles={`border-l-[3px] ${religionDotColors[book.religion]}`}
                      bookSlug={book.slug}
                      bookTitle={book.title}
                      religion={book.religion}
                      chapterNum={chapter.number}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <a
          href="#"
          className="fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-void shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:bg-accent-hover transition-all hover:scale-110 active:scale-95 md:bottom-6 md:right-6"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
        </a>
      </div>
    </div>
  );
}
