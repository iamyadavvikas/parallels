import Link from "next/link";
import { hybridSearch } from "@/lib/search";
import { getConceptSummary } from "@/lib/search/concepts";
import { highlightText } from "@/lib/utils";
import { books } from "@/data";
import SearchBar from "@/components/ui/SearchBar";
import Perspectives from "@/components/ui/Perspectives";

const suggestedTerms = [
  { term: "peace", icon: "🕊" },
  { term: "love", icon: "❤" },
  { term: "suffering", icon: "◎" },
  { term: "marriage", icon: "✦" },
  { term: "prayer", icon: "◇" },
  { term: "truth", icon: "△" },
  { term: "virtue", icon: "☆" },
  { term: "forgiveness", icon: "◈" },
  { term: "death", icon: "○" },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";
  let results: ReturnType<typeof hybridSearch> = [];
  if (query) results = hybridSearch({ query, limit: 50 });
  const conceptSummary = getConceptSummary(query);
  const totalChapters = books.reduce((sum, b) => sum + b.chapters.length, 0);
  const totalVerses = books.reduce((sum, b) => sum + b.chapters.reduce((s, c) => s + c.verses.length, 0), 0);

  return (
    <div className="search-page space-y-8 page-enter">
      {/* Header */}
      <header className="text-center py-2">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl font-serif"
          style={{ letterSpacing: "-0.03em" }}>
          {query ? (
            <><span className="text-accent mr-1">✦</span> Search Results</>
          ) : (
            <><span className="text-accent mr-1">✦</span> Discover Sacred Passages</>
          )}
        </h1>
        {query && (
          <p className="text-sm text-text-muted">
            {results.length === 0
              ? `No results for "${query}"`
              : `${results.length} result${results.length === 1 ? "" : "s"} across traditions`}
          </p>
        )}
      </header>

      {/* Search bar */}
      <div className="mx-auto max-w-2xl">
        <SearchBar initialQuery={query} large />
      </div>

      {/* Concept summary */}
      {query && conceptSummary && (
        <div className="mx-auto max-w-2xl concept-banner rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-accent/8">
              <span className="text-xs text-accent">✦</span>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">{conceptSummary}</p>
          </div>
        </div>
      )}

      {/* Perspectives */}
      {query && results.length > 0 && (
        <Perspectives query={query} results={results.map((r) => ({
          religion: r.book.religion,
          bookTitle: r.book.title,
          bookSlug: r.book.slug,
          chapterId: r.chapter.id,
          chapterTitle: r.chapter.title,
          chapterNumber: r.chapter.number,
          verseId: r.verse.id,
          verseNumber: r.verse.number,
          text: r.verse.translation || r.verse.text,
        }))} />
      )}

      {/* Results */}
      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-1">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-mono">All Results</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {results.map((result, i) => {
            const verseHref = `/books/${result.book.slug}?chapter=${result.chapter.id}#verse-${result.verse.id}`;
            const scorePercent = Math.round(result.combinedScore * 100);
            const tradition = result.book.religion.toLowerCase();

            return (
              <Link key={`${result.verse.id}-${i}`} href={verseHref}
                className="search-result-card block group"
                style={{ animationDelay: `${0.05 + i * 0.04}s` }}>
                <div className="relevance-bar" />
                <div className="flex-1 p-5 sm:p-6">
                  {/* Source header */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full" data-tradition-dot={tradition} />
                    <span className="text-[10px] font-semibold tracking-wider uppercase" data-tradition-text={tradition}>
                      {result.book.religion}
                    </span>
                    <span className="text-border">·</span>
                    <span className="text-sm font-medium text-text-primary">{result.book.title}</span>
                    <span className="text-border">·</span>
                    <span className="text-xs text-text-muted">{result.chapter.title}</span>

                    {/* Score ring */}
                    <div className="ml-auto hidden sm:block">
                      <div className="relative h-8 w-8">
                        <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-border/30" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="1.5"
                            strokeDasharray={`${scorePercent * 0.88} 88`} className="text-accent" style={{ filter: "drop-shadow(0 0 4px rgba(255,209,102,0.4))" }} />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] text-text-muted">{scorePercent}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-3 border-l-2 border-accent/20 pl-4 transition-colors duration-300 group-hover:border-accent/40">
                    <p className="text-text-primary font-serif"
                      dangerouslySetInnerHTML={{ __html: highlightText(result.verse.translation || result.verse.text, query) }} />
                  </blockquote>

                  {/* Original text */}
                  {result.verse.text && result.verse.translation && (
                    <div className="mb-3 border-l border-border/30 pl-4 ml-0.5">
                      <p className="text-sm italic text-text-muted/70 leading-relaxed font-serif"
                        dangerouslySetInnerHTML={{ __html: highlightText(result.verse.text, query) }} />
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center justify-between">
                    <p className="attribution">— {result.verse.source.translator} ({result.verse.source.year})</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-text-muted/50 font-mono">{result.chapter.number}.{result.verse.number}</span>
                      <span className="text-[11px] text-accent/60 tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300">
                        View source →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}

      {/* Empty state — no query */}
      {!query && (
        <div className="empty-state rounded-2xl py-16 text-center">
          <div className="empty-illustration mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/8 border border-accent/15">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-accent">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <h2 className="mb-3 text-xl font-bold text-text-primary font-serif">Find Sacred Passages</h2>
          <p className="mx-auto mb-8 max-w-md text-sm text-text-muted leading-relaxed">
            Search across six major religious traditions to discover how
            different scriptures address the same timeless questions.
          </p>
          <div className="mx-auto mb-10 flex max-w-lg flex-wrap justify-center gap-2">
            {suggestedTerms.map(({ term, icon }, i) => (
              <a key={term} href={`/search?q=${term}`}
                className="search-chip inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-text-muted font-body"
                style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
                <span className="text-xs opacity-50">{icon}</span>
                {term}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 text-[10px] text-text-muted/50 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[var(--tradition-hinduism)]" />
              <span>6 traditions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span>{totalChapters} chapters</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-[var(--tradition-islam)]" />
              <span>{totalVerses} verses</span>
            </div>
          </div>
        </div>
      )}

      {/* No results */}
      {query && results.length === 0 && (
        <div className="empty-state rounded-2xl py-14 text-center">
          <div className="empty-illustration mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-tertiary/30">
            <span className="text-xl text-text-muted/30">✦</span>
          </div>
          <p className="mb-2 text-lg font-semibold text-text-primary font-serif">No passages found</p>
          <p className="mb-6 text-sm text-text-muted">
            Try searching for themes like &ldquo;peace&rdquo;, &ldquo;love&rdquo;, or &ldquo;forgiveness&rdquo;
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestedTerms.slice(0, 5).map(({ term, icon }) => (
              <a key={term} href={`/search?q=${term}`}
                className="search-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-text-muted">
                <span className="text-[10px] opacity-50">{icon}</span>
                {term}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
