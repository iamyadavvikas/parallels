import type { Book, Chapter, Verse } from "@/lib/types";

export interface EmbeddingResult {
  verseId: string;
  score: number;
}

let _embeddingsCache: Record<string, number[]> | null = null;
let _verseList: { id: string; text: string }[] = [];

export function loadEmbeddings(data: { id: string; text: string }[]): Record<string, number[]> | null {
  if (_embeddingsCache) return _embeddingsCache;
  
  try {
    // Inline the embeddings JSON (loaded at build time via static import)
    // We use a lazy dynamic import pattern
    _verseList = data;
    return _embeddingsCache;
  } catch {
    return null;
  }
}

export function setEmbeddings(embeddings: Record<string, number[]>, verses: { id: string; text: string }[]) {
  _embeddingsCache = embeddings;
  _verseList = verses;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export function searchEmbeddings(queryEmbedding: number[], topK: number = 20): EmbeddingResult[] {
  if (!_embeddingsCache) return [];
  
  const results: EmbeddingResult[] = [];
  for (const [verseId, emb] of Object.entries(_embeddingsCache)) {
    const score = cosineSimilarity(queryEmbedding, emb);
    results.push({ verseId, score });
  }
  
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function clearEmbeddingCache() {
  _embeddingsCache = null;
  _verseList = [];
}

export function hasEmbeddings(): boolean {
  return _embeddingsCache !== null && Object.keys(_embeddingsCache).length > 0;
}
