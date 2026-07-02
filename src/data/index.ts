import type { Book, Topic, CuratedQuestion } from "@/lib/types";
import { setTopics, setQuestions } from "@/lib/data";

import bgGita from "./books/bhagavad-gita.json";
import bible from "./books/bible.json";
import quran from "./books/quran.json";
import torah from "./books/torah.json";
import guruGranth from "./books/guru-granth-sahib.json";
import dhammapada from "./books/dhammapada.json";

import topicsData from "./topics.json";
import questionsData from "./questions.json";

export const books: Book[] = [
  bgGita as Book,
  bible as Book,
  quran as Book,
  torah as Book,
  guruGranth as Book,
  dhammapada as Book,
];

export const topics: Topic[] = topicsData as Topic[];
export const questions: CuratedQuestion[] = questionsData as CuratedQuestion[];

setTopics(topics);
setQuestions(questions);
