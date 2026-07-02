import { topics, books } from "@/data";
import { notFound } from "next/navigation";
import { religionDotColors } from "@/lib/utils";
import ReligionBadge from "@/components/ui/ReligionBadge";
import Link from "next/link";

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = topics.find((t) => t.id === id);
  if (!topic) notFound();

  const religions = [...new Set(topic.passages.map((p) => p.religion))];

  return (
    <div className="space-y-10">
      <header>
        <div className="mb-4 flex flex-wrap gap-2">
          {religions.map((r) => (
            <ReligionBadge key={r} religion={r} />
          ))}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary font-display" style={{ letterSpacing: '-0.03em' }}>{topic.name}</h1>
        <p className="mt-2 max-w-3xl text-lg text-text-secondary font-body">{topic.description}</p>
        <p className="mt-3 text-sm text-text-muted font-mono tracking-wide">
          {topic.passages.length} passages across {religions.length} traditions
        </p>
      </header>

      <div className="space-y-5">
        {topic.passages.map((passage, i) => {
          const book = books.find((b) => b.id === passage.bookId);
          return (
            <div
              key={`${passage.bookId}-${passage.verseId}-${i}`}
              className="group card rounded-xl border border-border bg-bg-secondary p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${religionDotColors[passage.religion]}`} />
                <ReligionBadge religion={passage.religion} />
                <span className="text-sm text-text-muted font-body">{passage.bookTitle}</span>
                <span className="text-sm text-text-muted font-body">·</span>
                <span className="text-sm text-text-muted font-mono">{passage.reference}</span>
              </div>
              <p className="text-base leading-relaxed text-text-primary font-serif leading-[1.9]">
                &ldquo;{passage.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-text-muted font-body">
                <span className="font-mono tracking-wide">— {passage.source.translator} ({passage.source.year})</span>
                {book && (
                  <Link
                    href={`/books/${book.slug}`}
                    className="text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View full text →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
