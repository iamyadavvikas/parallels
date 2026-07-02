"use client";

import { useEffect } from "react";
import { useGamificationStore } from "@/store/gamificationStore";
import StreakCounter from "./StreakCounter";
import Badges from "./Badges";

export default function GamificationBar() {
  const recordVisit = useGamificationStore((s) => s.recordVisit);

  useEffect(() => {
    recordVisit();
  }, [recordVisit]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <StreakCounter />
      </div>
      <Badges />
    </div>
  );
}
