import Link from "next/link";
import type { Topic, Religion } from "@/lib/types";
import { religionDotColors } from "@/lib/utils";

export default function TopicCard({ topic }: { topic: Topic }) {
  const religions = [...new Set(topic.passages.map((p) => p.religion))] as Religion[];

  return (
    <Link
      href={`/topics/${topic.id}`}
      className="group card relative rounded-xl border border-border bg-bg-secondary p-6"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex -space-x-1">
          {religions.slice(0, 4).map((r) => (
            <span
              key={r}
              className={`inline-block h-3 w-3 rounded-full ring-2 ring-bg-secondary ${religionDotColors[r]}`}
            />
          ))}
          {religions.length > 4 && (
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-bg-tertiary text-[8px] text-text-muted ring-2 ring-bg-secondary">
              +
            </span>
          )}
        </div>
      </div>
      <h3 className="mb-2 text-lg font-bold text-text-primary group-hover:text-accent transition-colors font-display tracking-tight">
        {topic.name}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-secondary font-body">
        {topic.description}
      </p>
      <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted font-mono tracking-wide">
        <span>{religions.length} traditions</span>
        <span className="text-border">·</span>
        <span className="text-accent font-semibold">{topic.passages.length} passages</span>
      </div>
    </Link>
  );
}
