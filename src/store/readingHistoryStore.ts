"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HistoryItem } from "@/lib/types";

interface ReadingHistoryState {
  history: HistoryItem[];
  recordVisit: (item: Omit<HistoryItem, "lastVisitedAt">) => void;
  getRecent: (limit?: number) => HistoryItem[];
}

export const useReadingHistoryStore = create<ReadingHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      recordVisit: (item) => {
        const entry: HistoryItem = {
          ...item,
          lastVisitedAt: new Date().toISOString(),
        };
        set((state) => {
          const filtered = state.history.filter(
            (h) => !(h.bookSlug === item.bookSlug && h.chapterNum === item.chapterNum),
          );
          return { history: [entry, ...filtered] };
        });
      },
      getRecent: (limit = 5) => get().history.slice(0, limit),
    }),
    { name: "parallels-reading-history" },
  ),
);
