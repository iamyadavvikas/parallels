#!/usr/bin/env node
/**
 * Add sample translations to Gita (Easwaran) and Quran (Yusuf Ali)
 */

import fs from "fs";
import path from "path";

const BOOKS_DIR = path.resolve(import.meta.dirname, "../src/data/books");

// Eknath Easwaran translations for Gita (first 5 verses of chapter 1)
const gitaEaswaran = {
  "bg-1-1": "Dhritarashtra said: Tell me, Sanjaya, what happened on the sacred field of Kurukshetra. What did my sons and the sons of Pandu do, eager for battle?",
  "bg-1-2": "Sanjaya said: When Prince Duryodhana saw the army of the Pandavas drawn up in battle array, he approached his teacher Drona and spoke these words:",
  "bg-1-3": "See, O Teacher, this mighty army of the Pandavas, arrayed by the son of Drupada, thy wise disciple.",
  "bg-1-4": "Here are heroes, mighty archers, equal to Bhima and Arjuna: Yuyudhan, Virat, and Drupada, master charioteer.",
  "bg-1-5": "Dhrishtaketu, Chekitana, and the valiant king of Kashi, Purujit, Kuntibhoja, and Saibya — all these are leading men.",
};

// Yusuf Ali translations for Quran (first 5 verses of chapter 1)
const quranYusufAli = {
  "quran-1-1": "In the name of Allah, the Most Gracious, the Most Merciful.",
  "quran-1-2": "Praise be to Allah, the Cherisher and Sustainer of the worlds:",
  "quran-1-3": "Most Gracious, Most Merciful;",
  "quran-1-4": "Master of the Day of Judgment.",
  "quran-1-5": "Thee do we worship, and Thine aid we seek.",
};

function addTranslations(bookFile, translationMap, translatorName) {
  const bookPath = path.join(BOOKS_DIR, bookFile);
  const data = JSON.parse(fs.readFileSync(bookPath, "utf-8"));

  for (const chapter of data.chapters) {
    for (const verse of chapter.verses) {
      if (translationMap[verse.id]) {
        if (!verse.translations) verse.translations = [];
        // Don't add duplicate
        if (!verse.translations.find((t) => t.translator === translatorName)) {
          verse.translations.push({
            id: `${verse.id}-${translatorName.toLowerCase().replace(/\s+/g, "-")}`,
            translator: translatorName,
            text: translationMap[verse.id],
          });
        }
      }
    }
  }

  fs.writeFileSync(bookPath, JSON.stringify(data, null, 2) + "\n");
  console.log(`Added ${Object.keys(translationMap).length} translations to ${bookFile}`);
}

addTranslations("bhagavad-gita.json", gitaEaswaran, "Eknath Easwaran");
addTranslations("quran.json", quranYusufAli, "Yusuf Ali");
