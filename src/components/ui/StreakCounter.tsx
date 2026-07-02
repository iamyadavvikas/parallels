"use client";

import { useGamificationStore } from "@/store/gamificationStore";
import { Flame } from "lucide-react";

export default function StreakCounter() {
  const streak = useGamificationStore((s) => s.streak);

  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-secondary/50 px-4 py-2.5">
      <Flame
        className={`h-4 w-4 transition-colors ${
          streak >= 7
            ? "text-accent"
            : streak >= 3
              ? "text-accent/70"
              : streak > 0
                ? "text-text-muted"
                : "text-border"
        }`}
        style={
          streak >= 3
            ? { filter: `drop-shadow(0 0 4px rgba(201,168,76,${streak >= 7 ? 0.6 : 0.3}))` }
            : undefined
        }
      />
      <span className="text-sm font-mono tracking-wider text-text-primary">
        {streak}
      </span>
      <span className="text-xs text-text-muted font-body">
        day{streak !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
