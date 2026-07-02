"use client";

import { useEffect, useRef } from "react";
import { useReadingHistoryStore } from "@/store/readingHistoryStore";
import type { Religion } from "@/lib/types";

export default function RecordVisit({
  bookSlug,
  bookTitle,
  religion,
  chapterNum,
}: {
  bookSlug: string;
  bookTitle: string;
  religion: Religion;
  chapterNum: number;
}) {
  const recordVisit = useReadingHistoryStore((s) => s.recordVisit);
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    recordVisit({ bookSlug, bookTitle, religion, chapterNum });
  }, [bookSlug, bookTitle, religion, chapterNum, recordVisit]);

  return null;
}
