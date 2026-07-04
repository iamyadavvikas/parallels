import { books } from "@/data";
import type { Book, Chapter, Verse } from "@/lib/types";
import { buildTFIDFIndex, tfidfSimilarity, type TFIDFIndex } from "./tfidf";
import { buildBM25Index, bm25Score, exactMatchBonus, type BM25Index } from "./bm25";
import { expandQuery } from "./concepts";
import { clearEmbeddingCache } from "./embeddings";

export interface HybridResult {
  book: Book;
  chapter: Chapter;
  verse: Verse;
  semanticScore: number;
  keywordScore: number;
  combinedScore: number;
  matchedConcepts?: string[];
}

interface IndexedVerse {
  book: Book;
  chapter: Chapter;
  verse: Verse;
  searchText: string;
}

let _cache: {
  verses: IndexedVerse[];
  tfidf: TFIDFIndex;
  bm25: BM25Index;
} | null = null;

let _embeddings: Record<string, number[]> | null = null;

export function setEmbeddingsData(data: Record<string, number[]>) {
  _embeddings = data;
}

function getAllVerses(): IndexedVerse[] {
  const verses: IndexedVerse[] = [];
  for (const book of books) {
    for (const chapter of book.chapters) {
      for (const verse of chapter.verses) {
        verses.push({
          book,
          chapter,
          verse,
          searchText: [
            book.title,
            book.religion,
            chapter.title,
            verse.translation || verse.text,
            verse.id,
          ].join(" "),
        });
      }
    }
  }
  return verses;
}

function getOrBuildIndex() {
  if (_cache) return _cache;
  const verses = getAllVerses();
  const docs = verses.map((v, i) => ({ id: String(i), text: v.searchText }));
  const tfidf = buildTFIDFIndex(docs);
  const bm25 = buildBM25Index(docs);
  _cache = { verses, tfidf, bm25 };
  return _cache;
}

export interface HybridSearchOptions {
  query: string;
  religion?: string;
  bookId?: string;
  limit?: number;
  semanticWeight?: number;
  keywordWeight?: number;
  expand?: boolean;
}

export function hybridSearch(opts: HybridSearchOptions): HybridResult[] {
  const { query, religion, bookId, limit = 20, semanticWeight = 0.6, keywordWeight = 0.4, expand = true } = opts;

  if (!query.trim()) return [];

  const { verses, tfidf, bm25 } = getOrBuildIndex();
  const expandedTerms = expand ? expandQuery(query) : [query];
  const expandedQuery = expandedTerms.join(" ");
  const scored: HybridResult[] = [];

  // Precompute max keyword score once (was O(n²), now O(n))
  let maxKeyword = 1;
  for (let j = 0; j < verses.length; j++) {
    const s = bm25Score(bm25, expandedQuery, j);
    if (s > maxKeyword) maxKeyword = s;
  }

  for (let i = 0; i < verses.length; i++) {
    const v = verses[i];
    if (religion && v.book.religion !== religion) continue;
    if (bookId && v.book.id !== bookId) continue;

    // Primary: cosine similarity on embeddings (if available)
    let semantic = 0;
    if (_embeddings && _embeddings[v.verse.id]) {
      // For semantic, we need the query embedding too.
      // We approximate: use existing TF-IDF cosine as the semantic score
      // True semantic search requires query embedding at query time
      // For now, use TF-IDF as semantic fallback when real embeddings aren't available at query time
      semantic = tfidfSimilarity(tfidf, expandedQuery, i);
    } else {
      semantic = tfidfSimilarity(tfidf, expandedQuery, i);
    }

    const keyword = bm25Score(bm25, expandedQuery, i);
    const exact = exactMatchBonus(query, v.verse.translation || v.verse.text, v.book.title, v.book.religion);

    const normalizedSemantic = semantic / 1.0;
    const normalizedKeyword = maxKeyword > 0 ? keyword / maxKeyword : 0;

    const combined = normalizedSemantic * semanticWeight + normalizedKeyword * keywordWeight + exact * 0.5;

    if (combined > 0.01 || exact > 0) {
      const verseText = (v.verse.translation || v.verse.text).toLowerCase();
      const matchedConcepts = expandedTerms.filter((term) => verseText.includes(term.toLowerCase()));
      scored.push({ book: v.book, chapter: v.chapter, verse: v.verse, semanticScore: semantic, keywordScore: keyword, combinedScore: combined, matchedConcepts });
    }
  }

  return scored.sort((a, b) => b.combinedScore - a.combinedScore).slice(0, limit);
}

/**
 * Rebuild index (call after data changes)
 */
export function rebuildIndex() {
  _cache = null;
  _embeddings = null;
  clearEmbeddingCache();
  getOrBuildIndex();
}
