import { tokenize } from "./tokenize";

export interface BM25Index {
  averageDocLength: number;
  totalDocs: number;
  df: Map<string, number>;
  docTokens: string[][];
  docLengths: number[];
}

const K1 = 1.5;
const B = 0.75;

export function buildBM25Index(docs: { id: string; text: string }[]): BM25Index {
  const docTokens = docs.map((d) => tokenize(d.text));
  const docLengths = docTokens.map((t) => t.length);
  const totalLength = docLengths.reduce((a, b) => a + b, 0);
  const averageDocLength = totalLength / docs.length;

  const df = new Map<string, number>();
  for (const tokens of docTokens) {
    const unique = new Set(tokens);
    for (const t of unique) {
      df.set(t, (df.get(t) || 0) + 1);
    }
  }

  return { averageDocLength, totalDocs: docs.length, df, docTokens, docLengths };
}

export function bm25Score(
  index: BM25Index,
  query: string,
  docIdx: number
): number {
  const queryTokens = tokenize(query);
  const docTokens = index.docTokens[docIdx];
  const docLength = index.docLengths[docIdx];

  // Term frequency map
  const tf = new Map<string, number>();
  for (const t of docTokens) {
    tf.set(t, (tf.get(t) || 0) + 1);
  }

  let score = 0;
  for (const qt of queryTokens) {
    const termFreq = tf.get(qt) || 0;
    const docFreq = index.df.get(qt) || 0;

    if (docFreq === 0) continue;

    const idf = Math.log(
      (index.totalDocs - docFreq + 0.5) / (docFreq + 0.5) + 1
    );

    const tfNorm =
      (termFreq * (K1 + 1)) /
      (termFreq + K1 * (1 - B + B * (docLength / index.averageDocLength)));

    score += idf * tfNorm;
  }

  return score;
}

/**
 * Exact-match bonus for verse IDs, chapter refs, book titles.
 * e.g. "John 3:16", "Genesis 1:1", "bible"
 */
export function exactMatchBonus(
  query: string,
  text: string,
  bookTitle?: string,
  religion?: string
): number {
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();

  // Exact full match
  if (t === q) return 10;

  // Query is contained in text
  if (t.includes(q)) return 3;

  // Book title match
  if (bookTitle && bookTitle.toLowerCase().includes(q)) return 2;

  // Religion match
  if (religion && religion.toLowerCase() === q) return 2;

  // Verse reference patterns like "14:27", "3:16"
  const refMatch = q.match(/^(\d+:\d+)$/);
  if (refMatch && t.includes(refMatch[1])) return 5;

  return 0;
}
