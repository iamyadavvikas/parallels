const STOP_WORDS = new Set([
  "a","an","the","is","it","in","on","of","to","for","and","or","but",
  "not","with","as","at","by","from","be","was","were","are","been",
  "being","have","has","had","do","does","did","will","would","could",
  "should","may","might","shall","can","this","that","these","those",
  "i","me","my","we","our","you","your","he","him","his","she","her",
  "they","them","their","its","who","whom","which","what","where",
  "when","how","why","if","than","then","so","no","nor","just","also",
  "very","too","own","same","only","other","more","most","such","into",
  "over","after","before","between","through","during","about","above",
  "below","up","down","out","off","again","further","once","here",
  "there","all","each","every","both","few","many","much","some","any",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

export function tokenizeWithPositions(text: string): Map<string, number[]> {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/);
  const positions = new Map<string, number[]>();
  words.forEach((word, i) => {
    if (word.length > 1) {
      const arr = positions.get(word) || [];
      arr.push(i);
      positions.set(word, arr);
    }
  });
  return positions;
}
