"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { Search, Sparkles } from "lucide-react";

export default function SearchBar({
  initialQuery = "",
  large = false,
  onFocusChange,
}: {
  initialQuery?: string;
  large?: boolean;
  onFocusChange?: (focused: boolean) => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    onFocusChange?.(focused);
  }, [focused, onFocusChange]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

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
        <div className="relative flex items-center rounded-2xl border border-white/[0.06] bg-bg-secondary/80 backdrop-blur-xl transition-all duration-500"
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
            onBlur={() => setFocused(false)}
            placeholder="Search across all sacred traditions..."
            aria-label="Search sacred texts"
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
      </div>
    </form>
  );
}
