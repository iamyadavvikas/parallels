"use client";

import { useEffect, useRef } from "react";
import { useReadingHistoryStore } from "@/store/readingHistoryStore";
import { useUser } from "@/components/auth/UserProvider";
import { saveReadingHistory } from "@/lib/actions/readingHistory";
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
  const { user } = useUser();
  const recorded = useRef(false);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    recordVisit({ bookSlug, bookTitle, religion, chapterNum });
    if (user) {
      saveReadingHistory({ bookSlug, bookTitle, religion, chapterNum }).catch(() => {});
    }
  }, [bookSlug, bookTitle, religion, chapterNum, recordVisit, user]);

  return null;
}
