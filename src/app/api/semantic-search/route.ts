import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const VALID_RELIGIONS = ["Hinduism", "Christianity", "Islam", "Judaism", "Sikhism", "Buddhism"];

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const religionRaw = req.nextUrl.searchParams.get("religion") || undefined;
  const bookId = req.nextUrl.searchParams.get("book") || undefined;
  const limitRaw = req.nextUrl.searchParams.get("limit") || "20";

  const religion = religionRaw
    ? VALID_RELIGIONS.find((r) => r.toLowerCase() === religionRaw.toLowerCase()) || undefined
    : undefined;

  const limit = Math.min(Math.max(parseInt(limitRaw, 10) || 20, 1), 100);

  if (!q.trim()) {
    return NextResponse.json(
      { results: [], query: q },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  }

  const { expandQuery, getConceptSummary } = await import("@/lib/search/concepts");
  const expandedTerms = expandQuery(q);

  // Try real semantic search with query embedding
  let usedSemantic = false;
  try {
    const { embedMany } = await import("ai");
    const { createGoogleGenerativeAI } = await import("@ai-sdk/google");
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || "",
    });

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error("No API key");
    }

    const { embeddings } = await embedMany({
      model: google.embedding("gemini-embedding-2"),
      values: [q],
    });
    const queryEmbedding = embeddings[0] as number[];

    let verseEmbeddings: Record<string, number[]> = {};
    try {
      const embPath = join(process.cwd(), "src/data/embeddings.json");
      if (existsSync(embPath)) {
        verseEmbeddings = JSON.parse(readFileSync(embPath, "utf-8"));
      } else {
        throw new Error("No pre-computed embeddings");
      }
    } catch {
      throw new Error("No pre-computed embeddings");
    }

    const { cosineSimilarity } = await import("@/lib/search/embeddings");
    const { books } = await import("@/data");

    const verseMap = new Map<string, { book: any; chapter: any; verse: any }>();
    for (const book of books) {
      for (const ch of book.chapters) {
        for (const v of ch.verses) {
          verseMap.set(v.id, { book, chapter: ch, verse: v });
        }
      }
    }

    const scored: { verseId: string; semantic: number }[] = [];
    for (const [verseId, emb] of Object.entries(verseEmbeddings)) {
      const semantic = cosineSimilarity(queryEmbedding, emb);
      scored.push({ verseId, semantic });
    }

    const filtered = scored.filter((s) => {
      const data = verseMap.get(s.verseId);
      if (!data) return false;
      if (religion && data.book.religion !== religion) return false;
      if (bookId && data.book.id !== bookId) return false;
      return true;
    });

    const top = filtered.sort((a, b) => b.semantic - a.semantic).slice(0, limit);
    usedSemantic = true;

    return NextResponse.json({
      query: q,
      conceptSummary: getConceptSummary(q),
      expandedTerms,
      semanticSearch: true,
      results: top.map((s) => {
        const data = verseMap.get(s.verseId)!;
        return {
          bookId: data.book.id,
          bookTitle: data.book.title,
          religion: data.book.religion,
          bookSlug: data.book.slug,
          chapterId: data.chapter.id,
          chapterTitle: data.chapter.title,
          chapterNumber: data.chapter.number,
          verseId: data.verse.id,
          verseNumber: data.verse.number,
          text: data.verse.translation || data.verse.text,
          source: data.verse.source,
          scores: {
            semantic: Math.round(s.semantic * 1000) / 1000,
            combined: Math.round(s.semantic * 1000) / 1000,
          },
        };
      }),
    });
  } catch {
    // Fallback: use hybrid search (TF-IDF + BM25)
  }

  const { hybridSearch } = await import("@/lib/search");
  const results = hybridSearch({ query: q, religion, bookId, limit });

  return NextResponse.json(
    {
      query: q,
      conceptSummary: getConceptSummary(q),
      expandedTerms,
      semanticSearch: usedSemantic,
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
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    }
  );
}
