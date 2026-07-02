"use client";

import { create } from "zustand";
import type { Book, Passage } from "@/lib/types";

interface ComparisonState {
  selectedBooks: Book[];
  question: string;
  results: Passage[][];
  setSelectedBooks: (books: Book[]) => void;
  setQuestion: (q: string) => void;
  setResults: (results: Passage[][]) => void;
  reset: () => void;
}

export const useComparisonStore = create<ComparisonState>((set) => ({
  selectedBooks: [],
  question: "",
  results: [],
  setSelectedBooks: (books) => set({ selectedBooks: books }),
  setQuestion: (question) => set({ question }),
  setResults: (results) => set({ results }),
  reset: () =>
    set({ selectedBooks: [], question: "", results: [] }),
}));
