import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SearchHistoryEntry {
  query: string;
  timestamp: number;
  filters: {
    books: string[];
    mode: "or" | "and";
  };
  resultCount?: number;
}

interface SearchHistoryState {
  entries: SearchHistoryEntry[];
  addEntry: (entry: Omit<SearchHistoryEntry, "timestamp">) => void;
  clearHistory: () => void;
}

const MAX_ENTRIES = 20;

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) =>
        set((state) => {
          const existing = state.entries.find(
            (e) =>
              e.query === entry.query &&
              e.filters.books.join(",") === entry.filters.books.join(",") &&
              e.filters.mode === entry.filters.mode,
          );
          const updated = existing
            ? state.entries.map((e) =>
                e === existing ? { ...e, timestamp: Date.now(), resultCount: entry.resultCount } : e,
              )
            : [{ ...entry, timestamp: Date.now() }, ...state.entries];
          return { entries: updated.slice(0, MAX_ENTRIES) };
        }),
      clearHistory: () => set({ entries: [] }),
    }),
    {
      name: "parallels-search-history",
    },
  ),
);
