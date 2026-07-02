"use client";

import type { Book } from "@/lib/types";
import { religionDotColors, religionAccentColors } from "@/lib/utils";
import { X } from "lucide-react";

interface BookSelectorProps {
  books: Book[];
  selected: Book[];
  onToggle: (book: Book) => void;
}

export default function BookSelector({ books, selected, onToggle }: BookSelectorProps) {
  const selectedIds = new Set(selected.map((b) => b.id));

  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-text-primary font-body">
        Select books to compare <span className="text-text-muted font-normal">({selected.length}/4)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {books.map((book) => {
          const isSelected = selectedIds.has(book.id);
          return (
            <button
              key={book.id}
              onClick={() => onToggle(book)}
              disabled={!isSelected && selected.length >= 4}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-body transition-all min-h-[40px] ${
                isSelected
                  ? `${religionAccentColors[book.religion]} border-current bg-accent/10`
                  : "border-border text-text-muted hover:border-accent/30 hover:text-text-primary"
              } disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              <span className={`h-2 w-2 rounded-full ${religionDotColors[book.religion]}`} />
              {book.title}
              {isSelected && <X className="h-3.5 w-3.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
