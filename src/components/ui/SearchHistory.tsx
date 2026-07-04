"use client";

import { useSearchHistoryStore } from "@/store/searchHistoryStore";
import { Clock, Trash2 } from "lucide-react";

interface SearchHistoryProps {
  onSelect: (query: string) => void;
}

function timeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function SearchHistory({ onSelect }: SearchHistoryProps) {
  const { entries, clearHistory } = useSearchHistoryStore();

  if (entries.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/40 bg-bg-secondary/80 p-4 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
          <Clock className="h-3.5 w-3.5" />
          Recent Searches
        </div>
        <button
          onClick={clearHistory}
          className="flex items-center gap-1 text-xs text-text-muted/60 hover:text-red-400 transition-colors"
          aria-label="Clear search history"
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {entries.map((entry) => (
          <button
            key={`${entry.query}-${entry.timestamp}`}
            onClick={() => onSelect(entry.query)}
            className="flex items-center gap-2 rounded-lg border border-border/40 bg-bg-tertiary/50 px-3 py-1.5 text-sm text-text-secondary transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-accent font-body"
          >
            <span>{entry.query}</span>
            {entry.resultCount !== undefined && (
              <span className="text-[10px] text-text-muted/60 font-mono">
                {entry.resultCount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
