import { describe, it, expect, beforeEach } from "vitest";
import { useBookmarkStore } from "@/store/bookmarkStore";
import type { Bookmark } from "@/lib/types";

const mockBookmark: Bookmark = {
  id: "bm-1",
  verseId: "verse-1",
  bookSlug: "bible",
  bookTitle: "The Bible",
  religion: "Christianity",
  chapterNum: 5,
  verseNum: 8,
  reference: "5.8",
  text: "Blessed are the peacemakers...",
  createdAt: "2026-01-01T00:00:00Z",
};

describe("bookmarkStore", () => {
  beforeEach(() => {
    useBookmarkStore.setState({ bookmarks: [] });
  });

  it("starts empty", () => {
    expect(useBookmarkStore.getState().bookmarks).toHaveLength(0);
  });

  it("adds a bookmark", () => {
    useBookmarkStore.getState().addBookmark(mockBookmark);
    expect(useBookmarkStore.getState().bookmarks).toHaveLength(1);
  });

  it("removes a bookmark by id", () => {
    useBookmarkStore.getState().addBookmark(mockBookmark);
    useBookmarkStore.getState().removeBookmark("bm-1");
    expect(useBookmarkStore.getState().bookmarks).toHaveLength(0);
  });

  it("removes a bookmark by verseId", () => {
    useBookmarkStore.getState().addBookmark(mockBookmark);
    useBookmarkStore.getState().removeBookmarkByVerseId("verse-1");
    expect(useBookmarkStore.getState().bookmarks).toHaveLength(0);
  });

  it("checks if a verse is bookmarked", () => {
    useBookmarkStore.getState().addBookmark(mockBookmark);
    expect(useBookmarkStore.getState().isBookmarked("verse-1")).toBe(true);
    expect(useBookmarkStore.getState().isBookmarked("verse-2")).toBe(false);
  });

  it("prepends new bookmarks", () => {
    const bm2 = { ...mockBookmark, id: "bm-2", verseId: "verse-2" };
    useBookmarkStore.getState().addBookmark(mockBookmark);
    useBookmarkStore.getState().addBookmark(bm2);
    expect(useBookmarkStore.getState().bookmarks[0].id).toBe("bm-2");
  });
});
