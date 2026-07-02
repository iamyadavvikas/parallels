import { NextRequest, NextResponse } from "next/server";
import { hybridSearch } from "@/lib/search";
import { getConceptSummary, expandQuery } from "@/lib/search/concepts";

const VALID_RELIGIONS = ["Hinduism", "Christianity", "Islam", "Judaism", "Sikhism", "Buddhism"];

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const religionRaw = req.nextUrl.searchParams.get("religion") || undefined;
  const bookId = req.nextUrl.searchParams.get("book") || undefined;
  const limitRaw = req.nextUrl.searchParams.get("limit") || "20";

  // Normalize religion: lowercase input -> PascalCase
  const religion = religionRaw
    ? VALID_RELIGIONS.find((r) => r.toLowerCase() === religionRaw.toLowerCase()) || undefined
    : undefined;

  const limit = Math.min(Math.max(parseInt(limitRaw, 10) || 20, 1), 100);

  if (!q.trim()) {
    return NextResponse.json(
      { results: [], query: q },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  }

  const results = hybridSearch({
    query: q,
    religion,
    bookId,
    limit,
  });

  const expandedTerms = expandQuery(q);

  return NextResponse.json(
    {
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
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
