import { topics, books } from "@/data";
import { notFound } from "next/navigation";
import ReligionBadge from "@/components/ui/ReligionBadge";
import Link from "next/link";
import { GlassCard, NeonDot } from "@/components/ui/NeonElements";
import ScienceInsight from "@/components/ui/ScienceInsight";

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = topics.find((t) => t.id === id);
  if (!topic) notFound();

  const religions = [...new Set(topic.passages.map((p) => p.religion))];

  return (
    <div className="space-y-10 page-enter">
      <header className="text-center py-4">
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {religions.map((r) => (
            <ReligionBadge key={r} religion={r} />
          ))}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl font-display">{topic.name}</h1>
        <p className="mt-3 max-w-3xl mx-auto text-lg text-text-secondary font-body">{topic.description}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <p className="text-sm text-text-muted font-mono tracking-wide">
            {topic.passages.length} passages across {religions.length} traditions
          </p>
          <span className="text-text-muted/30">·</span>
          <ScienceInsight
            curatedNotes={topic.scienceNotes}
            label={topic.name}
            passages={topic.passages}
          />
        </div>
      </header>

      <div className="space-y-5">
        {topic.passages.map((passage, i) => {
          const book = books.find((b) => b.id === passage.bookId);

          return (
            <div
              key={`${passage.bookId}-${passage.verseId}-${i}`}
              className="stagger-in opacity-0"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <GlassCard religion={passage.religion}>
                <div className="mb-3 flex items-center gap-2">
                  <NeonDot religion={passage.religion} />
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
                      className="text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 hover:underline"
                    >
                      View full text →
                    </Link>
                  )}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
