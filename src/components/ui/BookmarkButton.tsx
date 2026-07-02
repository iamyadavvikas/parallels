"use client";

import { useState } from "react";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { Bookmark } from "lucide-react";
import type { Bookmark as BookmarkType } from "@/lib/types";

interface BookmarkButtonProps {
  verseId: string;
  bookSlug: string;
  bookTitle: string;
  religion: string;
  chapterNum: number;
  chapterTitle?: string;
  verseNum: number;
  reference: string;
  text: string;
}

export default function BookmarkButton({
  verseId,
  bookSlug,
  bookTitle,
  religion,
  chapterNum,
  chapterTitle,
  verseNum,
  reference,
  text,
}: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((s) => s.isBookmarked(verseId));
  const addBookmark = useBookmarkStore((s) => s.addBookmark);
  const removeBookmarkByVerseId = useBookmarkStore((s) => s.removeBookmarkByVerseId);
  const [pulse, setPulse] = useState(false);

  function handleToggle() {
    setPulse(true);
    setTimeout(() => setPulse(false), 300);

    if (isBookmarked) {
      removeBookmarkByVerseId(verseId);
    } else {
      const bookmark: BookmarkType = {
        id: crypto.randomUUID(),
        verseId,
        bookSlug,
        bookTitle,
        religion: religion as BookmarkType["religion"],
        chapterNum,
        chapterTitle,
        verseNum,
        reference,
        text: text.slice(0, 120) + (text.length > 120 ? "..." : ""),
        createdAt: new Date().toISOString(),
      };
      addBookmark(bookmark);
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={`flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-all hover:bg-bg-tertiary hover:text-accent hover:scale-110 active:scale-90 ${
        pulse ? "animate-pulse-gold" : ""
      }`}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark
        className={`h-4 w-4 transition-all duration-200 ${
          isBookmarked ? "fill-accent text-accent" : ""
        }`}
      />
    </button>
  );
}
