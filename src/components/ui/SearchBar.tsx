"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useMemo, useCallback, type FormEvent } from "react";
import { Search, Sparkles } from "lucide-react";

const ALL_TERMS = [
  "peace", "love", "suffering", "forgiveness", "wisdom", "faith", "hope",
  "grace", "mercy", "justice", "truth", "prayer", "meditation", "compassion",
  "humility", "patience", "courage", "devotion", "service", "charity",
  "freedom", "salvation", "redemption", "eternal", "heaven", "judgment",
  "resurrection", "enlightenment", "dharma", "karma", "moksha", "nirvana",
  "yoga", "surrender", "sacrifice", "worship", "covenant", "commandment",
  "prophet", "soul", "spirit", "healing", "miracle", "creation",
  "blessing", "holiness", "righteousness", "repentance", "purity",
  "marriage", "divorce", "remarriage", "anger", "pride", "greed",
  "poverty", "wealth", "faithfulness", "unity", "light",
  "darkness", "life", "death", "power", "authority", "kingdom",
  "healing", "restoration", "transformation", "conversion", "baptism",
  "angel", "evil", "temptation", "trial", "persecution", "generosity",
  "gratitude", "joy", "strength", "kindness", "gentleness", "meekness",
];

export default function SearchBar({
  initialQuery = "",
  large = false,
  onFocusChange,
  showAutocomplete = true,
}: {
  initialQuery?: string;
  large?: boolean;
  onFocusChange?: (focused: boolean) => void;
  showAutocomplete?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const suggestions = useMemo(() => {
    if (!query.trim() || !showAutocomplete) return [];
    const q = query.toLowerCase().trim();
    const words = q.split(/\s+/).filter(Boolean);
    const lastWord = words[words.length - 1];
    if (!lastWord || lastWord.length < 1) return [];

    return ALL_TERMS
      .filter((t) => t.startsWith(lastWord) && t !== lastWord)
      .slice(0, 8);
  }, [query, showAutocomplete]);

  useEffect(() => {
    onFocusChange?.(focused);
  }, [focused, onFocusChange]);

  useEffect(() => {
    setSelectedIdx(-1);
  }, [query]);

  function navigate(val: string) {
    if (val.trim()) {
      router.push(`/search?q=${encodeURIComponent(val.trim())}`);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (selectedIdx >= 0 && selectedIdx < suggestions.length) {
      const words = query.trim().split(/\s+/);
      words[words.length - 1] = suggestions[selectedIdx];
      navigate(words.join(" "));
    } else if (query.trim()) {
      navigate(query);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    }
  }

  const handleSuggestionClick = useCallback((term: string) => {
    const words = query.trim().split(/\s+/);
    words[words.length - 1] = term;
    navigate(words.join(" "));
  }, [query, navigate]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full group">
      {/* Ambient glow behind search bar */}
      <div
        className={`absolute -inset-6 rounded-3xl blur-2xl transition-opacity duration-700 ${
          focused ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className={`search-container relative transition-all duration-500 ${
        large && focused ? "scale-[1.01]" : ""
      }`}>
        {/* Gradient border glow */}
        <div
          className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-500 ${
            focused ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "conic-gradient(from 0deg, var(--tradition-hinduism), var(--tradition-christianity), var(--tradition-islam), var(--tradition-judaism), var(--tradition-sikhism), var(--tradition-buddhism), var(--tradition-hinduism))",
            filter: "blur(1px)",
          }}
        />

        {/* Inner container */}
        <div className={`relative flex items-center rounded-2xl border border-white/[0.06] bg-bg-secondary/80 backdrop-blur-xl transition-all duration-500 ${suggestions.length > 0 ? "rounded-b-none" : ""}`}
          style={{
            boxShadow: focused
              ? "0 8px 40px var(--color-shadow-lg), 0 0 0 1px rgba(255,209,102,0.08), 0 0 60px rgba(255,209,102,0.06), inset 0 1px 0 rgba(255,255,255,0.04)"
              : large
                ? "0 4px 24px var(--color-shadow-md)"
                : "0 2px 8px var(--color-shadow-sm)",
          }}
        >
          {/* Search icon with pulse */}
          <div className={`relative pl-4 transition-all duration-300 ${focused ? "pl-5" : ""}`}>
            <Search className={`transition-all duration-300 ${
              large ? "h-5 w-5" : "h-4 w-4"
            } ${
              focused ? "text-accent scale-110" : "text-text-muted group-focus-within:text-accent"
            }`} />
            {focused && (
              <div className="absolute inset-0 animate-pulse-gold">
                <Search className={`h-5 w-5 text-accent/30`} />
              </div>
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            inputMode="search"
            enterKeyHint="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              // Delay blur to allow suggestion click
              setTimeout(() => setFocused(false), 150);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search across all sacred traditions..."
            aria-label="Search sacred texts"
            autoComplete="off"
            role="combobox"
            aria-expanded={suggestions.length > 0}
            aria-controls="search-suggestions"
            aria-activedescendant={selectedIdx >= 0 ? `suggestion-${selectedIdx}` : undefined}
            className={`flex-1 bg-transparent font-body text-text-primary placeholder:text-text-muted/40 focus:outline-none transition-all duration-300 ${
              large
                ? `py-4 pl-3 pr-4 text-lg ${focused ? "text-xl" : ""}`
                : "py-2.5 pl-3 pr-4 text-sm"
            }`}
          />

          {/* Right side indicators */}
          <div className="flex items-center gap-2 pr-4">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-md p-1 text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-all duration-200"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            {large && (
              <div className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-mono tracking-wider transition-all duration-300 ${
                focused
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-border bg-bg-tertiary text-text-muted"
              }`}>
                <span className="text-xs">⌘</span>
                <span>K</span>
              </div>
            )}

            {large && !query && (
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-text-muted/40 font-mono">
                <Sparkles className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>

        {/* Autocomplete dropdown */}
        {suggestions.length > 0 && focused && (
          <ul
            id="search-suggestions"
            role="listbox"
            className="absolute left-0 right-0 z-50 rounded-b-2xl border border-t-0 border-white/[0.06] bg-bg-secondary/95 backdrop-blur-xl overflow-hidden"
            style={{
              boxShadow: "0 8px 40px var(--color-shadow-lg), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {suggestions.map((term, i) => (
              <li key={term} role="option" aria-selected={i === selectedIdx}
                id={`suggestion-${i}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSuggestionClick(term);
                }}
                onMouseEnter={() => setSelectedIdx(i)}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                  i === selectedIdx
                    ? "bg-accent/10 text-accent"
                    : "text-text-primary hover:bg-bg-tertiary"
                } ${i < suggestions.length - 1 ? "border-b border-border/20" : ""}`}
              >
                <span className="font-medium">{query.trim().split(/\s+/).filter(Boolean).slice(0, -1).join(" ")}{query.trim().split(/\s+/).filter(Boolean).length > 1 ? " " : ""}</span>
                <strong>{term}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
