"use client";

import { useGamificationStore } from "@/store/gamificationStore";

export default function Badges() {
  const badges = useGamificationStore((s) => s.badges);
  const unlocked = badges.filter((b) => b.unlockedAt);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-accent">
          Achievements
        </span>
        <span className="text-xs text-text-muted font-mono">
          {unlocked.length}/{badges.length}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {badges.map((badge, i) => (
          <div
            key={badge.id}
            tabIndex={0}
            aria-label={`${badge.name}: ${badge.description}`}
            className={`hex-badge group relative flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
              badge.unlockedAt
                ? "unlocked border-accent/20 bg-accent/5 hover:border-accent/40 hover:bg-accent/10 cursor-pointer"
                : "locked border-border bg-bg-secondary/30"
            }`}
            title={badge.description}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span
              className={`text-lg transition-transform duration-300 ${
                badge.unlockedAt
                  ? "grayscale-0 group-hover:scale-110"
                  : "grayscale"
              }`}
            >
              {badge.icon}
            </span>
            <span className="text-[8px] font-mono tracking-wider text-text-muted text-center leading-tight">
              {badge.name}
            </span>

            {/* Tooltip */}
            <div className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-bg-elevated px-3 py-1.5 text-xs text-text-primary font-body opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
              {badge.description}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-bg-elevated border-r border-b border-border rotate-45" />
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1 w-full rounded-full bg-bg-tertiary overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover transition-all duration-700 ease-out"
          style={{ width: `${(unlocked.length / badges.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
