import { NextRequest, NextResponse } from "next/server";
import { hybridSearch } from "@/lib/search";
import { getConceptSummary, expandQuery } from "@/lib/search/concepts";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const religion = req.nextUrl.searchParams.get("religion") || undefined;
  const bookId = req.nextUrl.searchParams.get("book") || undefined;
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20", 10);

  if (!q.trim()) {
    return NextResponse.json({ results: [], query: q });
  }

  const results = hybridSearch({
    query: q,
    religion,
    bookId,
    limit,
  });

  const expandedTerms = expandQuery(q);

  return NextResponse.json({
    query: q,
    conceptSummary: getConceptSummary(q),
    expandedTerms,
    results: results.map((r) => ({
      bookId: r.book.id,
      bookTitle: r.book.title,
      religion: r.book.religion,
      bookSlug: r.book.slug,
      chapterId: r.chapter.id,
      chapterTitle: r.chapter.title,
      chapterNumber: r.chapter.number,
      verseId: r.verse.id,
      verseNumber: r.verse.number,
      text: r.verse.translation || r.verse.text,
      source: r.verse.source,
      scores: {
        semantic: Math.round(r.semanticScore * 1000) / 1000,
        keyword: Math.round(r.keywordScore * 1000) / 1000,
        combined: Math.round(r.combinedScore * 1000) / 1000,
      },
    })),
  });
}
