"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Bookmark } from "@/lib/types";

interface BookmarkState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  removeBookmarkByVerseId: (verseId: string) => void;
  isBookmarked: (verseId: string) => boolean;
  getBookmarkByVerseId: (verseId: string) => Bookmark | undefined;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark) =>
        set((state) => ({ bookmarks: [bookmark, ...state.bookmarks] })),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),
      removeBookmarkByVerseId: (verseId) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.verseId !== verseId),
        })),
      isBookmarked: (verseId) =>
        get().bookmarks.some((b) => b.verseId === verseId),
      getBookmarkByVerseId: (verseId) =>
        get().bookmarks.find((b) => b.verseId === verseId),
    }),
    { name: "parallels-bookmarks" },
  ),
);
