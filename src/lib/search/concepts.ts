/**
 * Theological concept expansion.
 * Maps abstract concepts to related scriptural terms so semantic
 * search can find relevant passages even when the exact word isn't used.
 */
const conceptMap: Record<string, string[]> = {
  remarriage: [
    "marriage", "divorce", "wife", "husband", "separation",
    "adultery", "fornication", "covenant", "union", "spouse",
    "put away", "put away", " remarried", "marry",
  ],
  divorce: [
    "put away", "separation", "bill of divorcement", "covenant broken",
    "marriage", "wife", "husband", "adultery", "unfaithful",
  ],
  marriage: [
    "wife", "husband", "wedding", "covenant", "union", "spouse",
    "bride", "groom", "two become one", "joined together",
  ],
  death: [
    "die", "dead", "death", "grave", "mortal", "perish",
    "pass away", "eternal", "afterlife", "resurrection", "soul",
  ],
  suffering: [
    "pain", "sorrow", "grief", "affliction", "trial", "tribulation",
    "hardship", "distress", "anguish", "torment",
  ],
  forgiveness: [
    "forgive", "pardon", "mercy", "grace", "sin", "repent",
    "atonement", "redemption", "transgression",
  ],
  justice: [
    "righteous", "judgment", "law", "commandment", "fair",
    "equity", "truth", "wrong", "evil", "punishment", "reward",
  ],
  love: [
    "compassion", "mercy", "kindness", "charity", "devotion",
    "affection", "benevolence", "agape", "phileo", "hesed",
  ],
  peace: [
    "peace", "calm", "stillness", "tranquil", "serenity",
    "harmony", "reconcil", "shalom", "salam", "sukh",
  ],
  prayer: [
    "pray", "prayer", "meditat", "worship", "supplicate",
    "invoke", "bless", "devotion", "remembrance", "name of god",
  ],
  salvation: [
    "saved", "deliverance", "redemption", "liberat", "free",
    "rescue", "eternal life", "heaven", "nirvana", "moksha",
  ],
  truth: [
    "truth", "real", "eternal", "word", "dharma", "torah",
    "logos", "sat", "haq",
  ],
  sin: [
    "sin", "transgress", "wicked", "evil", "wrong", "violate",
    "commandment", "trespass", "iniquity",
  ],
  virtue: [
    "righteous", "good", "holy", "pure", "moral", "ethical",
    "dharma", "tzaddik", "saint",
  ],
  afterlife: [
    "heaven", "hell", "paradise", "resurrection", "eternal",
    "judgment", "soul", "spirit", "nirvana", "moksha",
  ],
  god: [
    "lord", "allah", "yahweh", "brahman", "waheguru", "divine",
    "creator", "almighty", "omnipotent", "sacred", "holy",
    "dukkha", "pain", "sorrow", "grief", "affliction",
    "trial", "craving", "attachment", "desire",
  ],
};

export function expandQuery(query: string): string[] {
  const q = query.toLowerCase().trim();

  // Direct concept match
  for (const [concept, expansion] of Object.entries(conceptMap)) {
    if (q === concept || q.includes(concept)) {
      return [query, ...expansion];
    }
  }

  // Partial match — check if query is a substring of any concept
  for (const [concept, expansion] of Object.entries(conceptMap)) {
    if (concept.includes(q) || q.includes(concept)) {
      return [query, ...expansion];
    }
  }

  // No expansion — return original query
  return [query];
}

/**
 * Get a human-readable summary of what a concept means across traditions.
 */
export function getConceptSummary(query: string): string | null {
  const q = query.toLowerCase().trim();

  const summaries: Record<string, string> = {
    remarriage: "How different traditions view the dissolution and re-establishment of marriage bonds — from covenant theology to karma and rebirth.",
    divorce: "Scriptural perspectives on the ending of marriage, including grounds for separation, obligations to spouses, and spiritual consequences.",
    marriage: "The sacred nature of union between spouses across traditions — covenant, sacrament, karma, and divine blessing.",
    death: "What happens after death — resurrection, reincarnation, soul journey, and the relationship between mortality and eternity.",
    suffering: "The origin, purpose, and transcendence of suffering — from the Cross to the Four Noble Truths.",
    forgiveness: "How each tradition addresses wrong-doing — mercy, atonement, repentance, and the restoration of relationship with God.",
    justice: "Divine and human justice — law, righteousness, judgment, and the moral order of the universe.",
    love: "The highest virtue across all traditions — unconditional love, compassion, charity, and devotion to God and neighbor.",
    peace: "Inner and outer peace — from Shalom to Shanti, the cessation of conflict and the stillness of the mind.",
    prayer: "Communication with the divine — meditation, supplication, remembrance, and the disciplines of worship.",
    salvation: "Liberation from suffering and sin — eternal life, moksha, nirvana, and deliverance.",
    truth: "Ultimate reality and divine truth — the Word, Dharma, Torah, and the nature of what is real.",
    sin: "Moral failure and transgression — its nature, consequences, and the path to redemption.",
    virtue: "Moral excellence and holiness — the qualities that define a righteous life.",
    afterlife: "The destiny of the soul after death — heaven, hell, paradise, reincarnation, and judgment.",
    god: "The nature of the Divine — monotheism, pantheism, and the relationship between Creator and creation.",
  };

  for (const [concept, summary] of Object.entries(summaries)) {
    if (q === concept || q.includes(concept) || concept.includes(q)) {
      return summary;
    }
  }

  return null;
}
