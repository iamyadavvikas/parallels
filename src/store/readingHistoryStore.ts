"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HistoryItem } from "@/lib/types";

interface ReadingHistoryState {
  history: HistoryItem[];
  recordVisit: (item: Omit<HistoryItem, "lastVisitedAt">) => void;
  getRecent: (limit?: number) => HistoryItem[];
  syncFromServer: (serverHistory: HistoryItem[]) => void;
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
      syncFromServer: (serverHistory) =>
        set((state) => {
          const localMap = new Map(
            state.history.map((h) => [`${h.bookSlug}-${h.chapterNum}`, h]),
          );
          for (const sh of serverHistory) {
            const key = `${sh.bookSlug}-${sh.chapterNum}`;
            const local = localMap.get(key);
            if (!local || new Date(sh.lastVisitedAt) > new Date(local.lastVisitedAt)) {
              localMap.set(key, sh);
            }
          }
          return {
            history: Array.from(localMap.values()).sort(
              (a, b) => new Date(b.lastVisitedAt).getTime() - new Date(a.lastVisitedAt).getTime(),
            ),
          };
        }),
    }),
    { name: "parallels-reading-history" },
  ),
);
