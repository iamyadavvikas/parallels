"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { useNoteStore } from "@/store/noteStore";
import { useReadingHistoryStore } from "@/store/readingHistoryStore";
import { religionDotColors, religionAccentColors } from "@/lib/utils";
import { Bookmark, FileText, Trash2, ExternalLink, GitCompare, Loader2 } from "lucide-react";
import { useUser } from "@/components/auth/UserProvider";
import { getSavedComparisons, deleteComparison, type SavedComparison } from "@/lib/actions/comparisons";
import { getNotes } from "@/lib/actions/notes";
import { getReadingHistory } from "@/lib/actions/readingHistory";
import type { Note } from "@/lib/types";

type Tab = "bookmarks" | "notes" | "comparisons";

export default function BookmarksPage() {
  const [tab, setTab] = useState<Tab>("bookmarks");
  const { user } = useUser();
  const bookmarks = useBookmarkStore((s) => s.bookmarks);
  const removeBookmark = useBookmarkStore((s) => s.removeBookmark);
  const notes = useNoteStore((s) => s.notes);
  const deleteNote = useNoteStore((s) => s.deleteNote);

  const [comparisons, setComparisons] = useState<SavedComparison[]>([]);
  const [loadingComparisons, setLoadingComparisons] = useState(false);

  const syncFromServer = useNoteStore((s) => s.syncFromServer);
  const syncReadingHistory = useReadingHistoryStore((s) => s.syncFromServer);

  useEffect(() => {
    if (user) {
      // Sync notes from Supabase on login
      getNotes().then((serverNotes) => {
        const notes: Note[] = serverNotes.map((sn) => ({
          id: sn.id,
          verseId: sn.verse_id,
          bookSlug: sn.book_id,
          bookTitle: sn.book_title,
          religion: sn.religion as Note["religion"],
          chapterNum: parseInt(sn.chapter_id.replace(/\D/g, ""), 10) || 1,
          verseNum: sn.verse_number,
          text: sn.text,
          createdAt: sn.created_at,
          updatedAt: sn.updated_at,
        }));
        syncFromServer(notes);
      });

      // Sync reading history from Supabase on login
      getReadingHistory().then((serverHistory) => {
        const history = serverHistory.map((sh) => ({
          bookSlug: sh.book_slug,
          bookTitle: sh.book_title,
          religion: sh.religion as Note["religion"],
          chapterNum: sh.chapter_num,
          lastVisitedAt: sh.last_visited_at,
        }));
        syncReadingHistory(history);
      });

      // Load comparisons when on that tab
      if (tab === "comparisons") {
        setLoadingComparisons(true);
        getSavedComparisons().then((data) => {
          setComparisons(data);
          setLoadingComparisons(false);
        });
      }
    }
  }, [user, tab]);

  const handleDeleteComparison = async (id: string) => {
    await deleteComparison(id);
    setComparisons((prev) => prev.filter((c) => c.id !== id));
  };

  const groupedBookmarks = bookmarks.reduce<Record<string, typeof bookmarks>>((acc, b) => {
    (acc[b.bookTitle] ??= []).push(b);
    return acc;
  }, {});

  const tabs = [
    { key: "bookmarks" as Tab, label: "Saved Verses", icon: Bookmark, count: bookmarks.length },
    { key: "notes" as Tab, label: "My Notes", icon: FileText, count: notes.length },
    { key: "comparisons" as Tab, label: "Comparisons", icon: GitCompare, count: comparisons.length },
  ];

  return (
    <div className="mx-auto max-w-3xl page-enter">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl font-display text-pretty">
          Your Library
        </h1>
        <p className="mt-2 text-text-muted font-body">
          Bookmarks, notes, and comparisons saved across all texts.
        </p>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Library sections" className="mb-8 flex gap-1 rounded-xl bg-bg-tertiary/40 backdrop-blur-sm p-1">
        {tabs.map((t) => (
          <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all font-body outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
              tab === t.key ? "bg-bg-secondary/80 text-accent shadow-sm backdrop-blur-md" : "text-text-muted hover:text-text-primary"
            }`}>
            <t.icon className="h-4 w-4" />
            {t.label}
            {t.count > 0 && (
              <span className="ml-1 rounded-full bg-accent/12 px-2 py-0.5 text-[10px] font-mono text-accent">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div id="tab-content" role="tabpanel">
        {/* Bookmarks Tab */}
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

        {/* Notes Tab */}
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

        {/* Comparisons Tab */}
        {tab === "comparisons" && (
          <div className="space-y-4">
            {!user ? (
              <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/50 backdrop-blur-sm p-12 text-center">
                <GitCompare className="mx-auto mb-4 h-10 w-10 text-text-muted/40" />
                <p className="font-medium text-text-primary font-body">Sign in to save comparisons</p>
                <p className="mt-1 text-sm text-text-muted font-body">
                  Save your AI synthesis results and comparison history across devices.
                </p>
                <Link href="/login" className="btn-primary mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm">
                  Sign in <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : loadingComparisons ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
              </div>
            ) : comparisons.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.06] bg-bg-secondary/50 backdrop-blur-sm p-12 text-center">
                <GitCompare className="mx-auto mb-4 h-10 w-10 text-text-muted/40" />
                <p className="font-medium text-text-primary font-body">No saved comparisons</p>
                <p className="mt-1 text-sm text-text-muted font-body">
                  Run a comparison and click Save to keep your AI synthesis results.
                </p>
                <Link href="/compare" className="btn-primary mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm">
                  Start comparing <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              comparisons.map((c) => (
                <div key={c.id}
                  className="group rounded-xl border border-white/[0.06] bg-bg-secondary/50 backdrop-blur-sm p-5 transition-all hover:border-white/[0.1] hover:shadow-[0_4px_24px_var(--color-shadow-md)]">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary font-body">{c.question_text}</h3>
                      <p className="mt-0.5 text-xs text-text-muted font-mono">
                        {c.selected_books.length} books · {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button onClick={() => handleDeleteComparison(c.id)}
                      className="shrink-0 rounded-lg p-2 text-text-muted opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                      aria-label="Delete comparison">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {c.synthesis && (
                    <div className="rounded-lg bg-accent/5 border border-accent/10 p-3">
                      <p className="text-xs font-mono text-accent mb-1">AI Synthesis</p>
                      <p className="text-sm text-text-secondary font-body line-clamp-4 leading-relaxed">
                        {c.synthesis}
                      </p>
                    </div>
                  )}
                  {c.question_id && (
                    <Link href={`/compare?q=${c.question_id}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline font-body">
                      Re-run comparison <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
