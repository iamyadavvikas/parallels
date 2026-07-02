import { tokenize } from "./tokenize";

export interface TFIDFIndex {
  vocabulary: Map<string, number>;
  idf: Float64Array;
  documents: {
    id: string;
    terms: Map<string, number>;
    magnitude: number;
  }[];
}

export function buildTFIDFIndex(
  docs: { id: string; text: string }[]
): TFIDFIndex {
  const df = new Map<string, number>();
  const totalDocs = docs.length;

  const tokenizedDocs = docs.map((doc) => ({
    id: doc.id,
    tokens: tokenize(doc.text),
  }));

  // Document frequency
  for (const doc of tokenizedDocs) {
    const uniqueTokens = new Set(doc.tokens);
    for (const token of uniqueTokens) {
      df.set(token, (df.get(token) || 0) + 1);
    }
  }

  // Build vocabulary
  const vocabulary = new Map<string, number>();
  let idx = 0;
  for (const [term] of df) {
    vocabulary.set(term, idx++);
  }

  // IDF: log((N + 1) / (df + 1)) + 1  (smoothed)
  const idf = new Float64Array(vocabulary.size);
  for (const [term, termIdx] of vocabulary) {
    const docFreq = df.get(term) || 0;
    idf[termIdx] = Math.log((totalDocs + 1) / (docFreq + 1)) + 1;
  }

  // TF-IDF vectors + magnitudes
  const documents = tokenizedDocs.map((doc) => {
    const tf = new Map<string, number>();
    const tokenCounts = new Map<string, number>();

    for (const token of doc.tokens) {
      tokenCounts.set(token, (tokenCounts.get(token) || 0) + 1);
    }

    const maxCount = Math.max(1, ...tokenCounts.values());

    for (const [token, count] of tokenCounts) {
      const termIdx = vocabulary.get(token);
      if (termIdx !== undefined) {
        // Augmented TF: 0.5 + 0.5 * (count / maxCount)
        const tfVal = 0.5 + 0.5 * (count / maxCount);
        tf.set(token, tfVal * idf[termIdx]);
      }
    }

    // Compute magnitude for cosine similarity
    let magnitude = 0;
    for (const val of tf.values()) {
      magnitude += val * val;
    }
    magnitude = Math.sqrt(magnitude);

    return { id: doc.id, terms: tf, magnitude };
  });

  return { vocabulary, idf, documents };
}

export function tfidfSimilarity(
  index: TFIDFIndex,
  query: string,
  docIdx: number
): number {
  const queryTokens = tokenize(query);
  const doc = index.documents[docIdx];

  if (!doc || doc.magnitude === 0) return 0;

  // Query TF-IDF
  const queryTF = new Map<string, number>();
  const queryCounts = new Map<string, number>();
  for (const t of queryTokens) {
    queryCounts.set(t, (queryCounts.get(t) || 0) + 1);
  }
  const maxQCount = Math.max(1, ...queryCounts.values());

  let dotProduct = 0;
  let queryMagnitude = 0;

  for (const [token, count] of queryCounts) {
    const termIdx = index.vocabulary.get(token);
    if (termIdx !== undefined) {
      const tfVal = 0.5 + 0.5 * (count / maxQCount);
      const tfidf = tfVal * index.idf[termIdx];
      queryTF.set(token, tfidf);

      const docTfidf = doc.terms.get(token) || 0;
      dotProduct += tfidf * docTfidf;
      queryMagnitude += tfidf * tfidf;
    }
  }

  queryMagnitude = Math.sqrt(queryMagnitude);

  if (queryMagnitude === 0 || doc.magnitude === 0) return 0;
  return dotProduct / (queryMagnitude * doc.magnitude);
}
