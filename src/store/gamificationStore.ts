"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Book, Verse } from "@/lib/types";
import { books as allBooks } from "@/data";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
}

export interface DailyWisdom {
  date: string;
  verse: Verse;
  book: Book;
}

interface GamificationState {
  streak: number;
  lastVisitDate: string | null;
  badges: Badge[];
  dailyWisdom: DailyWisdom | null;
  visitBook: (slug: string) => void;
  recordVisit: () => void;
  getDailyWisdom: () => DailyWisdom;
}

const BADGES: Badge[] = [
  { id: "first-visit", name: "Seeker", description: "Begin your journey", icon: "✦", unlockedAt: null },
  { id: "visit-3", name: "Wanderer", description: "Visit 3 different books", icon: "◈", unlockedAt: null },
  { id: "visit-all", name: "Scholar", description: "Visit all 6 traditions", icon: "◇", unlockedAt: null },
  { id: "visit-10", name: "Pilgrim", description: "Visit 10 different books", icon: "⬡", unlockedAt: null },
  { id: "compare", name: "Bridge Builder", description: "Compare traditions for the first time", icon: "⊕", unlockedAt: null },
  { id: "bookmark", name: "Collector", description: "Bookmark your first verse", icon: "⊙", unlockedAt: null },
  { id: "streak-3", name: "Devoted", description: "Visit for 3 consecutive days", icon: "◎", unlockedAt: null },
  { id: "streak-7", name: "Illuminated", description: "Visit for 7 consecutive days", icon: "✧", unlockedAt: null },
];

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function getDailyVerse(): { verse: Verse; book: Book } {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const allVerses: { verse: Verse; book: Book }[] = [];
  for (const book of allBooks) {
    for (const chapter of book.chapters) {
      for (const verse of chapter.verses) {
        allVerses.push({ verse, book });
      }
    }
  }
  const index = dayOfYear % allVerses.length;
  return allVerses[index];
}

function updateStreak(lastVisit: string | null, today: string): number {
  if (!lastVisit) return 1;
  const last = new Date(lastVisit);
  const now = new Date(today);
  const diff = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 0;
  if (diff === 1) return 1;
  return 1;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      streak: 0,
      lastVisitDate: null,
      badges: BADGES,
      dailyWisdom: null,

      recordVisit: () => {
        const today = getTodayString();
        const state = get();

        if (state.lastVisitDate === today) return;

        const streakIncrease = updateStreak(state.lastVisitDate, today);
        const newStreak = streakIncrease === 0 ? state.streak : state.streak + streakIncrease;

        const newBadges = state.badges.map((b) => {
          if (b.unlockedAt) return b;
          if (b.id === "first-visit") return { ...b, unlockedAt: Date.now() };
          if (b.id === "streak-3" && newStreak >= 3) return { ...b, unlockedAt: Date.now() };
          if (b.id === "streak-7" && newStreak >= 7) return { ...b, unlockedAt: Date.now() };
          return b;
        });

        set({
          streak: newStreak,
          lastVisitDate: today,
          badges: newBadges,
        });
      },

      visitBook: (slug: string) => {
        const state = get();
        const visitedBooks = new Set(
          state.badges
            .filter((b) => b.id.startsWith("visit-") && b.unlockedAt)
            .map((b) => b.id)
        );

        const newBadges = state.badges.map((b) => {
          if (b.unlockedAt) return b;
          if (b.id === "visit-3" && visitedBooks.size >= 2) return { ...b, unlockedAt: Date.now() };
          if (b.id === "visit-all" && visitedBooks.size >= 5) return { ...b, unlockedAt: Date.now() };
          if (b.id === "visit-10" && visitedBooks.size >= 9) return { ...b, unlockedAt: Date.now() };
          return b;
        });

        set({ badges: newBadges });
      },

      getDailyWisdom: () => {
        const state = get();
        const today = getTodayString();
        if (state.dailyWisdom?.date === today) {
          return state.dailyWisdom;
        }
        const { verse, book } = getDailyVerse();
        const wisdom: DailyWisdom = { date: today, verse, book };
        set({ dailyWisdom: wisdom });
        return wisdom;
      },
    }),
    {
      name: "parallels-gamification",
    }
  )
);
