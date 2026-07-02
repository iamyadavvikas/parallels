import Link from "next/link";
import type { Topic, Religion } from "@/lib/types";
import { GlassCard } from "@/components/ui/NeonElements";

const traditionColors: Record<Religion, string> = {
  Hinduism: "var(--tradition-hinduism)",
  Christianity: "var(--tradition-christianity)",
  Islam: "var(--tradition-islam)",
  Judaism: "var(--tradition-judaism)",
  Sikhism: "var(--tradition-sikhism)",
  Buddhism: "var(--tradition-buddhism)",
};

const traditionGlows: Record<Religion, string> = {
  Hinduism: "var(--neon-hinduism)",
  Christianity: "var(--neon-christianity)",
  Islam: "var(--neon-islam)",
  Judaism: "var(--neon-judaism)",
  Sikhism: "var(--neon-sikhism)",
  Buddhism: "var(--neon-buddhism)",
};

export default function TopicCard({ topic }: { topic: Topic }) {
  const religions = [...new Set(topic.passages.map((p) => p.religion))] as Religion[];
  const primaryReligion = religions[0];

  return (
    <Link href={`/topics/${topic.id}`} className="block">
      <GlassCard religion={primaryReligion}>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex -space-x-1">
            {religions.slice(0, 4).map((r) => (
              <span
                key={r}
                className="inline-block h-3 w-3 rounded-full ring-2 ring-[#0a0a12]"
                style={{
                  background: traditionColors[r],
                  boxShadow: `0 0 6px ${traditionGlows[r]}`,
                }}
              />
            ))}
            {religions.length > 4 && (
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-bg-tertiary text-[8px] text-text-muted ring-2 ring-[#0a0a12]">
                +
              </span>
            )}
          </div>
        </div>

        <h3 className="mb-2 text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-300 font-display tracking-tight">
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

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${traditionColors[primaryReligion]}, transparent)`,
          }}
        />
      </GlassCard>
    </Link>
  );
}
