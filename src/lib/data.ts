import type { Book, Topic, CuratedQuestion } from "./types";

const bookModules: Record<string, Book> = {};

export function getAllBooks(): Book[] {
  return Object.values(bookModules);
}

export function getBookBySlug(slug: string): Book | undefined {
  return getAllBooks().find((b) => b.slug === slug);
}

export function getBookById(id: string): Book | undefined {
  return getAllBooks().find((b) => b.id === id);
}

let topicsData: Topic[] | null = null;
let questionsData: CuratedQuestion[] | null = null;

export function setTopics(topics: Topic[]): void {
  topicsData = topics;
}

export function getTopics(): Topic[] {
  return topicsData ?? [];
}

export function getTopicById(id: string): Topic | undefined {
  return topicsData?.find((t) => t.id === id);
}

export function setQuestions(questions: CuratedQuestion[]): void {
  questionsData = questions;
}

export function getQuestions(): CuratedQuestion[] {
  return questionsData ?? [];
}
