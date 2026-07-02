"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, BookOpen, FileText, Hash, ArrowRight } from "lucide-react";
import { books as allBooks, topics } from "@/data";
import { religionDotColors } from "@/lib/utils";
import type { Book, Chapter, Verse } from "@/lib/types";

interface SearchResult {
  type: "book" | "chapter" | "verse" | "topic";
  title: string;
  subtitle: string;
  href: string;
  religion?: string;
  icon: React.ReactNode;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) {
      return allBooks.slice(0, 5).map((b) => ({
        type: "book" as const,
        title: b.title,
        subtitle: `${b.chapters.length} chapters`,
        href: `/books/${b.slug}`,
        religion: b.religion,
        icon: <BookOpen className="h-4 w-4" />,
      }));
    }

    const q = query.toLowerCase();
    const items: SearchResult[] = [];

    for (const book of allBooks) {
      if (book.title.toLowerCase().includes(q) || book.religion.toLowerCase().includes(q)) {
        items.push({
          type: "book",
          title: book.title,
          subtitle: `${book.religion} · ${book.chapters.length} chapters`,
          href: `/books/${book.slug}`,
          religion: book.religion,
          icon: <BookOpen className="h-4 w-4" />,
        });
      }

      for (const chapter of book.chapters) {
        if (
          chapter.title.toLowerCase().includes(q) ||
          chapter.id.toLowerCase().includes(q)
        ) {
          items.push({
            type: "chapter",
            title: chapter.title,
            subtitle: book.title,
            href: `/books/${book.slug}?chapter=${chapter.id}`,
            religion: book.religion,
            icon: <FileText className="h-4 w-4" />,
          });
        }

        for (const verse of chapter.verses) {
          const text = verse.translation || verse.text;
          if (text.toLowerCase().includes(q) || verse.id.toLowerCase().includes(q)) {
            items.push({
              type: "verse",
              title: text.slice(0, 80) + (text.length > 80 ? "..." : ""),
              subtitle: `${book.title} · ${chapter.title}`,
              href: `/books/${book.slug}?chapter=${chapter.id}#verse-${verse.id}`,
              religion: book.religion,
              icon: <Hash className="h-4 w-4" />,
            });
          }
        }
      }
    }

    for (const topic of topics) {
      if (topic.name.toLowerCase().includes(q) || topic.description.toLowerCase().includes(q)) {
        items.push({
          type: "topic",
          title: topic.name,
          subtitle: topic.description,
          href: `/topics/${topic.id}`,
          icon: <Hash className="h-4 w-4" />,
        });
      }
    }

    return items.slice(0, 12);
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function handleSelect(result: SearchResult) {
    setOpen(false);
    router.push(result.href);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Panel */}
      <div data-dialog role="dialog" aria-modal="true" aria-label="Search sacred texts" className="relative w-full max-w-xl mx-4 rounded-2xl border border-border bg-obsidian/95 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-5 w-5 text-text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search sacred texts..."
            aria-label="Search sacred texts"
            className="flex-1 bg-transparent text-text-primary font-body text-base outline-none placeholder:text-text-muted/50"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-border bg-bg-secondary px-2 py-0.5 text-[10px] font-mono text-text-muted">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && query && (
            <div className="py-12 text-center">
              <p className="text-sm text-text-muted font-body">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}

          {results.map((result, i) => (
            <button
              key={`${result.type}-${result.href}`}
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setSelectedIndex(i)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                i === selectedIndex
                  ? "bg-accent/10 text-text-primary"
                  : "text-text-secondary hover:bg-bg-secondary"
              }`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                result.religion ? "bg-bg-secondary" : "bg-accent/10"
              }`}>
                {result.religion ? (
                  <span className={`h-2.5 w-2.5 rounded-full ${religionDotColors[result.religion as keyof typeof religionDotColors] || ""}`} />
                ) : (
                  <span className="text-accent">{result.icon}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate font-body">{result.title}</p>
                <p className="text-xs text-text-muted truncate font-body">{result.subtitle}</p>
              </div>
              {i === selectedIndex && (
                <ArrowRight className="h-4 w-4 text-accent shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <div className="flex items-center gap-3 text-[10px] text-text-muted/50 font-mono">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
            <span>esc close</span>
          </div>
          <span className="text-[10px] text-text-muted/30 font-mono">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
