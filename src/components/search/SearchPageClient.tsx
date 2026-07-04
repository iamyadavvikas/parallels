"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, Suspense } from "react";
import SearchBar from "@/components/ui/SearchBar";
import SearchHistory from "@/components/ui/SearchHistory";
import { useSearchHistoryStore } from "@/store/searchHistoryStore";

function SearchPageClientInner({
  children,
  query,
  resultCount,
}: {
  children: React.ReactNode;
  query: string;
  resultCount: number;
}) {
  const router = useRouter();
  const { addEntry } = useSearchHistoryStore();

  const handleSearch = useCallback(
    (q: string) => {
      if (q.trim()) {
        addEntry({
          query: q.trim(),
          filters: { books: [], mode: "or" },
          resultCount,
        });
      }
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    },
    [router, addEntry, resultCount],
  );

  const handleHistorySelect = useCallback(
    (q: string) => {
      addEntry({
        query: q.trim(),
        filters: { books: [], mode: "or" },
        resultCount: undefined,
      });
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    },
    [router, addEntry],
  );

  return (
    <div className="space-y-6">
      <div className="relative z-10 mx-auto max-w-2xl">
        <SearchBar
          initialQuery={query}
          large
        />
      </div>
      {!query && (
        <div className="mx-auto max-w-2xl space-y-6">
          <SearchHistory onSelect={handleHistorySelect} />
        </div>
      )}
      {children}
    </div>
  );
}

export default function SearchPageClient({
  children,
  query,
  resultCount,
}: {
  children: React.ReactNode;
  query: string;
  resultCount: number;
}) {
  return (
    <Suspense>
      <SearchPageClientInner query={query} resultCount={resultCount}>
        {children}
      </SearchPageClientInner>
    </Suspense>
  );
}
