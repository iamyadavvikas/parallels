"use client";

import { useState } from "react";
import Link from "next/link";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useNoteStore } from "@/store/noteStore";
import { religionDotColors, religionAccentColors } from "@/lib/utils";
import { Bookmark, FileText, Trash2, ExternalLink } from "lucide-react";

type Tab = "bookmarks" | "notes";

export default function BookmarksPage() {
  const [tab, setTab] = useState<Tab>("bookmarks");
  const bookmarks = useBookmarkStore((s) => s.bookmarks);
  const removeBookmark = useBookmarkStore((s) => s.removeBookmark);
  const notes = useNoteStore((s) => s.notes);
  const deleteNote = useNoteStore((s) => s.deleteNote);

  const groupedBookmarks = bookmarks.reduce<Record<string, typeof bookmarks>>((acc, b) => {
    (acc[b.bookTitle] ??= []).push(b);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-3xl page-enter">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary font-display" style={{ letterSpacing: '-0.02em' }}>
          Your Library
        </h1>
        <p className="mt-2 text-text-muted font-body">
          Bookmarks and notes saved across all texts.
        </p>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Bookmarks and Notes" className="mb-8 flex gap-1 rounded-xl bg-bg-tertiary/40 backdrop-blur-sm p-1">
        <button role="tab" aria-selected={tab === "bookmarks"} onClick={() => setTab("bookmarks")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all font-body outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
            tab === "bookmarks" ? "bg-bg-secondary/80 text-accent shadow-sm backdrop-blur-md" : "text-text-muted hover:text-text-primary"
          }`}>
          <Bookmark className="h-4 w-4" />
          Saved Verses
          {bookmarks.length > 0 && (
            <span className="ml-1 rounded-full bg-accent/12 px-2 py-0.5 text-[10px] font-mono text-accent">
              {bookmarks.length}
            </span>
          )}
        </button>
        <button role="tab" aria-selected={tab === "notes"} onClick={() => setTab("notes")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all font-body outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
            tab === "notes" ? "bg-bg-secondary/80 text-accent shadow-sm backdrop-blur-md" : "text-text-muted hover:text-text-primary"
          }`}>
          <FileText className="h-4 w-4" />
          My Notes
          {notes.length > 0 && (
            <span className="ml-1 rounded-full bg-accent/12 px-2 py-0.5 text-[10px] font-mono text-accent">
              {notes.length}
            </span>
          )}
        </button>
      </div>

      <div id="tab-content" role="tabpanel">
        {tab === "bookmarks" && (
          <div className="space-y-6">
            {bookmarks.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/50 backdrop-blur-sm p-12 text-center">
                <Bookmark className="mx-auto mb-4 h-10 w-10 text-text-muted/40" />
                <p className="font-medium text-text-primary font-body">No bookmarks yet</p>
                <p className="mt-1 text-sm text-text-muted font-body">
                  Click the bookmark icon on any verse to save it here.
                </p>
                <Link href="/search" className="btn-primary mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm">
                  Explore verses <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              Object.entries(groupedBookmarks).map(([bookTitle, items]) => (
                <div key={bookTitle}>
                  <h2 className="mb-3 text-base font-bold text-text-primary font-display tracking-tight">{bookTitle}</h2>
                  <div className="space-y-2.5">
                    {items.map((bm) => (
                      <div key={bm.id}
                        className="group flex items-start gap-3.5 rounded-xl border border-white/[0.06] bg-bg-secondary/50 backdrop-blur-sm p-4 transition-all hover:border-white/[0.1] hover:shadow-[0_4px_24px_var(--color-shadow-md),0_0_30px_rgba(255,209,102,0.03)]">
                        <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-void ${religionDotColors[bm.religion]}`}>
                          {bm.verseNum}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2 text-xs text-text-muted font-body">
                            <span className={`font-semibold ${religionAccentColors[bm.religion]}`}>{bm.bookTitle}</span>
                            <span className="text-border">·</span>
                            <span className="font-mono">{bm.reference}</span>
                          </div>
                          <p className="text-sm leading-relaxed text-text-primary font-serif">&ldquo;{bm.text}&rdquo;</p>
                          <div className="mt-2 flex items-center gap-3">
                            <Link href={`/books/${bm.bookSlug}#${bm.bookSlug}-ch-${bm.chapterNum}`}
                              className="text-xs text-accent hover:underline font-body">View in context</Link>
                            <span className="text-xs text-text-muted font-mono tracking-wide">
                              {new Date(bm.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <button onClick={() => removeBookmark(bm.id)}
                          className="shrink-0 rounded-lg p-2 text-text-muted opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                          aria-label="Remove bookmark">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "notes" && (
          <div className="space-y-2.5">
            {notes.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/50 backdrop-blur-sm p-12 text-center">
                <FileText className="mx-auto mb-4 h-10 w-10 text-text-muted/40" />
                <p className="font-medium text-text-primary font-body">No notes yet</p>
                <p className="mt-1 text-sm text-text-muted font-body">
                  Click the note icon on any verse to add your thoughts.
                </p>
                <Link href="/search" className="btn-primary mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm">
                  Explore verses <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              notes.map((n) => (
                <div key={n.id}
                  className="group flex items-start gap-3.5 rounded-xl border border-white/[0.06] bg-bg-secondary/50 backdrop-blur-sm p-4 transition-all hover:border-white/[0.1] hover:shadow-[0_4px_24px_var(--color-shadow-md),0_0_30px_rgba(255,209,102,0.03)]">
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-void ${religionDotColors[n.religion]}`}>
                    {n.verseNum}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2 text-xs text-text-muted font-body">
                      <span className={`font-semibold ${religionAccentColors[n.religion]}`}>{n.bookTitle}</span>
                      <span className="text-border">·</span>
                      <span className="font-mono">Ch {n.chapterNum}, V {n.verseNum}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-text-primary whitespace-pre-wrap font-body">{n.text}</p>
                    <p className="mt-2 text-xs text-text-muted font-mono tracking-wide">
                      {new Date(n.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button onClick={() => deleteNote(n.id)}
                    className="shrink-0 rounded-lg p-2 text-text-muted opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                    aria-label="Delete note">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
