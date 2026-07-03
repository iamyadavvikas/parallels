import { buildTFIDFIndex } from "./tfidf";
import { books } from "@/data";

let _terms: string[] | null = null;

export function getAutocompleteTerms(): string[] {
  if (_terms) return _terms;

  const docs = [];
  for (const book of books) {
    for (const ch of book.chapters) {
      for (const v of ch.verses) {
        docs.push({
          id: v.id,
          text: [book.title, ch.title, v.translation || v.text].join(" "),
        });
      }
    }
  }

  const index = buildTFIDFIndex(docs);

  // Count how many docs each term appears in
  const docCount = new Map<string, number>();
  for (const [term, idfIdx] of index.vocabulary) {
    const termIdf = index.idf[idfIdx];
    // Low IDF = common across corpus → good for autocomplete
    // termIdf = log((N+1)/(df+1)) + 1, so low idf means high df
    docCount.set(term, termIdf);
  }

  // Sort: most common (lowest IDF) first, min 3 chars
  const sorted = [...docCount.entries()]
    .filter(([term]) => term.length >= 3)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 150)
    .map(([term]) => term);

  _terms = sorted;
  return _terms;
}
