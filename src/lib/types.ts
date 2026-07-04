export type Religion =
  | "Hinduism"
  | "Christianity"
  | "Islam"
  | "Judaism"
  | "Sikhism"
  | "Buddhism";

export interface Source {
  translator: string;
  year: number;
  license: string;
}

export interface Translation {
  id: string;
  translator: string;
  text: string;
  source?: Source;
}

export interface Verse {
  id: string;
  number: number;
  text: string;
  translation?: string;
  source: Source;
  altText?: string;
  altSource?: Source;
  explanation?: string;
  translations?: Translation[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  verses: Verse[];
}

export interface Fact {
  label: string;
  value: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  religion: Religion;
  slug: string;
  description: string;
  summary: string;
  originDate: string;
  originalLanguage: string;
  era: string;
  centralThemes: string[];
  structure: string;
  quickFacts: Fact[];
  chapters: Chapter[];
}

export interface Passage {
  bookId: string;
  bookTitle: string;
  religion: Religion;
  reference: string;
  chapterId: string;
  chapterTitle: string;
  verseId: string;
  verseNumber: number;
  text: string;
  context?: string;
  source: Source;
  score?: number;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  passages: Passage[];
  scienceNotes?: string;
}

export interface CuratedQuestion {
  id: string;
  question: string;
  keywords: string[];
  description: string;
  scienceNotes?: string;
}

export interface SearchResult {
  book: Book;
  chapter: Chapter;
  verse: Verse;
  score: number;
}

export interface Bookmark {
  id: string;
  verseId: string;
  bookSlug: string;
  bookTitle: string;
  religion: Religion;
  chapterNum: number;
  chapterTitle?: string;
  verseNum: number;
  reference: string;
  text: string;
  createdAt: string;
}

export interface Note {
  id: string;
  verseId: string;
  bookSlug: string;
  bookTitle: string;
  religion: Religion;
  chapterNum: number;
  verseNum: number;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryItem {
  bookSlug: string;
  bookTitle: string;
  religion: Religion;
  chapterNum: number;
  lastVisitedAt: string;
}
