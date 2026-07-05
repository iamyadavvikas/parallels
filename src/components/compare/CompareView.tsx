"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import type { Book, Passage, Religion } from "@/lib/types";
import { religionDotColors, religionGlowColors } from "@/lib/utils";
import { books as allBooks, topics, questions } from "@/data";
import _perspectivesInsights from "@/data/perspectives-insights.json";
import BookSelector from "./BookSelector";
import CustomDropdown from "./CustomDropdown";
import MagneticButton from "@/components/ui/MagneticButton";
import AIExplainButton from "@/components/ui/AIExplainButton";
import ScienceInsight from "@/components/ui/ScienceInsight";
import { useUser } from "@/components/auth/UserProvider";
import { saveComparison } from "@/lib/actions/comparisons";

interface CompareViewProps {
  initialTopic?: string;
  initialQuestion?: string;
}

const religionOrbColors: Record<Religion, string> = {
  Hinduism: "var(--tradition-hinduism)",
  Christianity: "var(--tradition-christianity)",
  Islam: "var(--tradition-islam)",
  Judaism: "var(--tradition-judaism)",
  Sikhism: "var(--tradition-sikhism)",
  Buddhism: "var(--tradition-buddhism)",
};

const religionSymbols: Record<Religion, string> = {
  Hinduism: "🕉",
  Christianity: "✝",
  Islam: "☪",
  Judaism: "✡",
  Sikhism: "☬",
  Buddhism: "☸",
};

const perspectivesInsights = _perspectivesInsights as Record<string, Record<Religion, string>>;


export default function CompareView({ initialTopic, initialQuestion }: CompareViewProps) {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || "");
  const [selectedQuestion, setSelectedQuestion] = useState<string>(initialQuestion || "");
  const [loading, setLoading] = useState(false);
  const [fusing, setFusing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [fusionResult, setFusionResult] = useState("");
  const [fusionError, setFusionError] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const { user } = useUser();

  const topicOptions = topics.map((t) => ({
    value: t.id,
    label: t.name,
    icon: <span className={`h-2 w-2 rounded-full ${religionDotColors[t.passages[0]?.religion || "Hinduism"]}`} />,
  }));

  const questionOptions = questions.map((q) => ({
    value: q.id,
    label: q.question,
  }));

  const passages = useMemo(() => {
    const result: Passage[] = [];
    const seenVerseIds = new Set<string>();
    const keywordCounts = new Map<string, number>(); // verseId -> number of keywords matched

    if (selectedTopic) {
      const topic = topics.find((t) => t.id === selectedTopic);
      if (topic) {
        for (const p of topic.passages) {
          if (selectedBooks.length === 0 || selectedBooks.some((b) => b.id === p.bookId)) {
            result.push({ ...p, score: 1.0 });
          }
        }
      }
    }

    if (selectedQuestion) {
      const question = questions.find((q) => q.id === selectedQuestion);
      if (question) {
        const keywords = question.keywords;
        for (const keyword of keywords) {
          for (const book of selectedBooks.length > 0 ? selectedBooks : allBooks) {
            for (const chapter of book.chapters) {
              for (const verse of chapter.verses) {
                if (seenVerseIds.has(verse.id)) continue;
                const text = (verse.translation || verse.text).toLowerCase();
                if (text.includes(keyword)) {
                  seenVerseIds.add(verse.id);
                  keywordCounts.set(verse.id, (keywordCounts.get(verse.id) || 0) + 1);
                }
              }
            }
          }
        }

        // Build passages with scores
        for (const book of selectedBooks.length > 0 ? selectedBooks : allBooks) {
          for (const chapter of book.chapters) {
            for (const verse of chapter.verses) {
              const count = keywordCounts.get(verse.id) || 0;
              if (count > 0) {
                result.push({
                  bookId: book.id,
                  bookTitle: book.title,
                  religion: book.religion,
                  reference: `${book.title} ${chapter.title}`,
                  chapterId: chapter.id,
                  chapterTitle: chapter.title,
                  verseId: verse.id,
                  verseNumber: verse.number,
                  text: verse.translation || verse.text,
                  source: verse.source,
                  score: count / keywords.length,
                });
              }
            }
          }
        }
      }
    }

    // Sort by score descending
    result.sort((a, b) => (b.score || 0) - (a.score || 0));
    return result;
  }, [selectedBooks, selectedTopic, selectedQuestion]);

  const triggerFusion = useCallback(async () => {
    if (passages.length === 0) return;
    setFusing(true);
    setShowResults(false);
    setFusionResult("");
    setFusionError("");
    try {
      // Shuffle and balance passages so no single tradition dominates the AI prompt
      const byReligion = new Map<string, typeof passages>();
      for (const p of passages) {
        const arr = byReligion.get(p.religion) || [];
        arr.push(p);
        byReligion.set(p.religion, arr);
      }
      const balanced: typeof passages = [];
      const maxPerReligion = 10;
      for (const [, arr] of byReligion) {
        balanced.push(...arr.slice(0, maxPerReligion));
      }
      // Interleave by religion for mixed context
      balanced.sort((a, b) => a.religion.localeCompare(b.religion));

      const res = await fetch("/api/fuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passages: balanced.map((p) => ({
            religion: p.religion,
            bookTitle: p.bookTitle,
            text: p.text,
            reference: p.reference,
          })),
          topic: selectedTopic ? topics.find((t) => t.id === selectedTopic)?.name : undefined,
          question: selectedQuestion ? questions.find((q) => q.id === selectedQuestion)?.question : undefined,
        }),
      });
      if (res.status === 429) {
        setFusionError("Rate limited. Please try again in a moment.");
        setFusing(false);
        return;
      }
      if (res.status === 503) {
        setFusionError("AI features require an API key. Contact support.");
        setFusing(false);
        return;
      }
      if (!res.ok) {
        const err = await res.json();
        setFusionError(err.error || "Fusion failed");
        setFusing(false);
        return;
      }
      const reader = res.body?.getReader();
      if (!reader) {
        setFusionError("No response stream");
        setFusing(false);
        return;
      }
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setFusionResult((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (e) {
      setFusionError("Network error: could not reach AI service");
    }
    setFusing(false);
    setShowResults(true);
  }, [passages, selectedTopic, selectedQuestion, topics, questions]);

  const handleSave = useCallback(async () => {
    if (!user || saved) return;
    setSaving(true);
    try {
      const result = await saveComparison({
        questionId: selectedQuestion || undefined,
        questionText: selectedQuestion
          ? questions.find((q) => q.id === selectedQuestion)?.question || ""
          : selectedTopic
            ? topics.find((t) => t.id === selectedTopic)?.name || ""
            : "",
        topicId: selectedTopic || undefined,
        topicName: selectedTopic ? topics.find((t) => t.id === selectedTopic)?.name : undefined,
        selectedBooks: selectedBooks.map((b) => b.id),
        synthesis: fusionResult || undefined,
        passages: passages.map((p) => ({
          bookTitle: p.bookTitle,
          religion: p.religion,
          chapterTitle: p.chapterTitle,
          verseNumber: p.verseNumber,
          text: p.text,
          reference: p.reference,
        })),
      });
      if (result.success) setSaved(true);
    } catch {
      // Silently fail
    }
    setSaving(false);
  }, [user, saved, selectedQuestion, selectedTopic, selectedBooks, fusionResult, passages]);

  // Auto-select all books on mount when coming from deep-link
  useEffect(() => {
    if ((initialTopic || initialQuestion) && selectedBooks.length === 0) {
      setSelectedBooks([...allBooks]);
    }
  }, [initialTopic, initialQuestion, selectedBooks.length]);

  // Auto-trigger fusion when initialQuestion is set and passages are ready
  const autoTriggeredRef = useRef(false);
  useEffect(() => {
    if ((initialTopic || initialQuestion) && !autoTriggeredRef.current && passages.length > 0 && !fusing && !showResults) {
      autoTriggeredRef.current = true;
      setTimeout(() => triggerFusion(), 300);
    }
  }, [initialTopic, initialQuestion, passages.length, fusing, showResults, triggerFusion]);

  function toggleBook(book: Book) {
    setSelectedBooks((prev) =>
      prev.some((b) => b.id === book.id)
        ? prev.filter((b) => b.id !== book.id)
        : [...prev, book]
    );
    setShowResults(false);
  }

  function handleTopicChange(value: string) {
    setLoading(true);
    setSelectedTopic(value);
    setSelectedQuestion("");
    setShowResults(false);
    setTimeout(() => setLoading(false), 100);
  }

  function handleQuestionChange(value: string) {
    setLoading(true);
    setSelectedQuestion(value);
    setSelectedTopic("");
    setShowResults(false);
    setTimeout(() => setLoading(false), 100);
  }

  // Coverage per tradition
  const coverageByReligion = useMemo(() => {
    const map: Record<string, number> = {};
    const total = passages.length || 1;
    for (const p of passages) {
      map[p.religion] = (map[p.religion] || 0) + 1;
    }
    for (const key of Object.keys(map)) {
      map[key] = Math.round((map[key] / total) * 100);
    }
    return map;
  }, [passages]);

  return (
    <div className="space-y-8">
      <BookSelector
        books={allBooks}
        selected={selectedBooks}
        onToggle={toggleBook}
      />

      {/* Fusion Chamber */}
      {selectedBooks.length > 0 && (
        <div className="relative rounded-3xl border border-white/[0.06] bg-bg-secondary/50 backdrop-blur-sm p-8 overflow-hidden">
          {/* Background glow orbs */}
          <div className="absolute inset-0 opacity-30">
            {selectedBooks.map((book) => (
              <div
                key={book.id}
                className="absolute rounded-full blur-[80px]"
                style={{
                  background: religionOrbColors[book.religion],
                  width: "200px",
                  height: "200px",
                  left: `${20 + selectedBooks.indexOf(book) * 25}%`,
                  top: "50%",
                  transform: "translateY(-50%)",
                  opacity: 0.5,
                }}
              />
            ))}
          </div>

          {/* SVG Connection Lines */}
          {selectedBooks.length >= 2 && (
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {selectedBooks.map((book, i) => {
                if (i === 0) return null;
                const x1 = 20 + (i - 1) * 25;
                const x2 = 20 + i * 25;
                return (
                  <line
                    key={book.id}
                    x1={`${x1 + 5}%`} y1="50%"
                    x2={`${x2 - 5}%`} y2="50%"
                    className="compare-connection-line"
                    style={{ stroke: religionOrbColors[book.religion] }}
                  />
                );
              })}
            </svg>
          )}

          <div className="relative z-10">
            <div className="text-center mb-6">
              <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-text-muted mb-1">Fusion Chamber</h3>
              <p className="text-xs text-text-muted/60 font-body">
                {selectedBooks.length} tradition{selectedBooks.length !== 1 ? "s" : ""} selected
              </p>
            </div>

            {/* Book orbs with SVG icons */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {selectedBooks.map((book, i) => (
                <div
                  key={book.id}
                  className="relative group/orb"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: religionOrbColors[book.religion],
                      boxShadow: `0 0 20px ${religionGlowColors[book.religion]}, inset 0 0 20px ${religionGlowColors[book.religion]}`,
                      background: `radial-gradient(circle at 30% 30%, ${religionOrbColors[book.religion]}20, transparent)`,
                    }}
                  >
                    <span className="text-xl" style={{ color: religionOrbColors[book.religion] }}>
                      {religionSymbols[book.religion]}
                    </span>
                  </div>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-wider text-text-muted whitespace-nowrap">
                    {book.religion}
                  </span>
                  {i < selectedBooks.length - 1 && (
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-text-muted/30 text-xs">+</div>
                  )}
                </div>
              ))}
            </div>

            {/* Passage coverage indicators */}
            {passages.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="text-[10px] font-mono tracking-wider uppercase text-text-muted/50 text-center mb-3">Passage Coverage</p>
                {selectedBooks.map((book) => {
                  const pct = coverageByReligion[book.religion] || 0;
                  return (
                    <div key={book.id} className="flex items-center gap-3 px-4">
                      <span className="text-[10px] font-mono text-text-muted w-20 text-right">{book.religion}</span>
                      <div className="passage-coverage flex-1">
                        <div className="passage-coverage-fill" style={{ width: `${pct}%`, background: religionOrbColors[book.religion] }} />
                      </div>
                      <span className="text-[10px] font-mono text-text-muted w-8">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Fusion button */}
            {(selectedTopic || selectedQuestion) && passages.length > 0 && (
              <div className="text-center mt-8">
                <MagneticButton
                  onClick={triggerFusion}
                  className="relative px-8 py-3 rounded-xl font-mono text-sm tracking-wider uppercase transition-all duration-300 border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 disabled:opacity-50 ripple-effect"
                >
                  {fusing ? (
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                      Fusing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      ✦ Fuse Wisdom
                    </span>
                  )}
                </MagneticButton>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Topic/Question selectors */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative rounded-xl border border-border bg-bg-secondary p-5">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary font-body">
            <span className="text-accent">T</span>
            Browse by topic
          </label>
          <CustomDropdown
            options={topicOptions}
            value={selectedTopic}
            onChange={handleTopicChange}
            placeholder="Select a topic..."
          />
        </div>

        <div className="relative rounded-xl border border-border bg-bg-secondary p-5">
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary font-body">
            <span className="text-accent">?</span>
            Or ask a question
          </label>
          <CustomDropdown
            options={questionOptions}
            value={selectedQuestion}
            onChange={handleQuestionChange}
            placeholder="Select a question..."
          />
        </div>
      </div>

      {/* View mode toggle */}
      {showResults && passages.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all ${viewMode === "grid" ? "bg-accent/10 text-accent border border-accent/20" : "text-text-muted hover:text-text-primary"}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all ${viewMode === "timeline" ? "bg-accent/10 text-accent border border-accent/20" : "text-text-muted hover:text-text-primary"}`}
          >
            Timeline
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-bg-secondary p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="skeleton h-2 w-2 rounded-full" />
                <div className="skeleton h-4 w-20" />
              </div>
              <div className="skeleton mb-2 h-4 w-32" />
              <div className="skeleton mb-1.5 h-3.5 w-full" />
              <div className="skeleton mb-1.5 h-3.5 w-5/6" />
              <div className="skeleton mb-4 h-3.5 w-3/4" />
              <div className="skeleton h-3 w-40" />
            </div>
          ))}
        </div>
      )}

      {/* Fusion animation */}
      {fusing && (
        <div className="flex items-center justify-center py-16">
          <div className="relative">
            <div className="h-24 w-24 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
            <div className="absolute inset-2 animate-spin rounded-full border-2 border-accent/20 border-b-accent" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-accent">✦</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Synthesis panel */}
      {!fusing && showResults && fusionResult && (
        <div className="relative rounded-2xl border border-accent/20 bg-accent/5 backdrop-blur-sm p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-accent">✦</span>
              <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-accent">AI Synthesis</h3>
            </div>
            {user && (
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    const params = new URLSearchParams();
                    if (selectedQuestion) params.set("q", selectedQuestion);
                    else if (selectedTopic) params.set("topic", selectedTopic);
                    if (selectedBooks.length > 0) params.set("books", selectedBooks.map((b) => b.slug).join(","));
                    const url = `${window.location.origin}/compare?${params.toString()}`;
                    await navigator.clipboard.writeText(url);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-bg-tertiary/60 px-3 py-1.5 text-xs font-medium text-text-muted transition-all hover:bg-bg-tertiary hover:text-text-primary"
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                      Share
                    </>
                  )}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || saved}
                  className="flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-all hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saved ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                      Saved
                    </>
                  ) : saving ? (
                    <>
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                      Save
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="prose prose-invert prose-sm max-w-none text-text-secondary [&_strong]:text-accent [&_h3]:text-text-primary [&_h3]:text-sm [&_h3]:font-mono [&_h3]:tracking-wider [&_h3]:mt-4 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-4">
            {fusionResult.split("\n").map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) {
                return <h3 key={i} className="text-sm font-mono tracking-wider text-accent uppercase mt-4 mb-2">{line.replace(/\*\*/g, "")}</h3>;
              }
              if (line.startsWith("- ")) {
                return <li key={i} className="text-text-secondary text-sm ml-4">{line.slice(2)}</li>;
              }
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="text-text-secondary text-sm leading-relaxed mb-2">{line}</p>;
            })}
          </div>
        </div>
      )}

      {/* Fusion error */}
      {!fusing && showResults && fusionError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
          <p className="mb-2">{fusionError}</p>
          <button
            onClick={triggerFusion}
            className="text-xs text-red-200 underline hover:text-red-100"
          >
            Try again
          </button>
        </div>
      )}

      {/* Results — Wisdom Threads (Grid mode) */}
      {!loading && !fusing && (showResults || passages.length > 0) && viewMode === "grid" && passages.length > 0 && (() => {
        const byReligion = new Map<string, typeof passages>();
        for (const p of passages) {
          const arr = byReligion.get(p.religion) || [];
          arr.push(p);
          byReligion.set(p.religion, arr);
        }
        const traditions = ["Hinduism", "Christianity", "Islam", "Judaism", "Sikhism", "Buddhism"] as const;

        // Get insights from perspectives data - try multiple lookup strategies
        const q = (selectedQuestion || selectedTopic || "").toLowerCase().replace(/^q-/, "").replace(/-/g, " ");
        let insights = perspectivesInsights[q] || {};
        // Try matching by first keyword if no direct match
        if (!insights.Hinduism && selectedQuestion) {
          const question = questions.find((qu) => qu.id === selectedQuestion);
          if (question?.keywords) {
            for (const kw of question.keywords) {
              if (perspectivesInsights[kw]) {
                insights = perspectivesInsights[kw];
                break;
              }
            }
          }
        }

        const activeTraditions = traditions.filter((t) => byReligion.has(t) || insights[t]);
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-accent">
                Wisdom Threads
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            </div>

            <div className="space-y-3">
              {activeTraditions.map((religion) => {
                const verses = byReligion.get(religion) || [];
                const tradition = religion.toLowerCase();
                const insight = insights[religion];
                const top2 = verses.slice(0, 2);
                const isExpanded = expandedBook === religion;
                const hasVerses = top2.length > 0;

                return (
                  <div key={religion} className="tradition-panel tradition-tinted" data-tradition={tradition}>
                    {/* Header — always visible */}
                    <div
                      className="tradition-panel-header cursor-pointer select-none"
                      onClick={() => setExpandedBook(isExpanded ? null : religion)}
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{
                          background: religionOrbColors[religion],
                          boxShadow: `0 0 8px ${religionGlowColors[religion]}`,
                        }}
                      />
                      <span className="text-sm font-semibold" data-tradition-text={tradition}>
                        {religion}
                      </span>
                      {hasVerses ? (
                        <span className="text-xs text-text-muted font-body">
                          {verses.length} verse{verses.length !== 1 ? "s" : ""}
                        </span>
                      ) : insight ? (
                        <span className="text-xs text-accent/60 font-body italic">Theological Insight</span>
                      ) : null}
                      <svg
                        className={`ml-auto h-4 w-4 text-text-muted transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="perspective-panel" data-expanded="true">
                        <div>
                          {/* Insight summary */}
                          {insight && (
                            <div className="px-5 pb-4">
                              <p className="text-sm leading-relaxed text-text-secondary font-body">
                                {insight}
                              </p>
                            </div>
                          )}

                          {/* Cited verses */}
                          {top2.map((p) => {
                            const href = `/books/${p.bookId}?chapter=${p.chapterId}#verse-${p.verseId}`;
                            return (
                              <Link
                                key={`${p.bookId}-${p.verseId}`}
                                href={href}
                                className="tradition-verse block group"
                              >
                                <div className="mb-1.5 flex items-center gap-2 pl-6">
                                  <span className="text-xs text-text-muted font-body">{p.bookTitle}</span>
                                  <span className="text-xs text-text-muted font-body">·</span>
                                  <span className="text-xs text-text-muted font-body">{p.chapterTitle}</span>
                                  <span className="text-xs text-text-muted font-body">:</span>
                                  <span className="text-xs text-text-muted font-body">v.{p.verseNumber}</span>
                                  <span className="text-xs text-accent/60 font-body opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                    read →
                                  </span>
                                </div>
                                <p className="italic text-text-primary/80 border-l-2 border-accent/15 pl-6 transition-colors group-hover:border-accent/40 font-serif">
                                  &ldquo;{p.text.length > 200 ? p.text.slice(0, 200) + "..." : p.text}&rdquo;
                                </p>
                              </Link>
                            );
                          })}

                          {/* No verses + no insight */}
                          {!hasVerses && !insight && (
                            <div className="px-5 py-4 text-xs text-text-muted italic font-body">
                              No relevant verses found for this tradition.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Results — Timeline mode */}
      {!loading && !fusing && (showResults || passages.length > 0) && viewMode === "timeline" && passages.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-accent">
              Timeline ({passages.length})
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </div>

          <div className="relative pl-8">
            {/* Timeline line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />

            {passages.map((p, i) => (
              <div key={`${p.bookId}-${p.verseId}-${i}`} className="relative mb-8 last:mb-0">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-5 top-2 h-3 w-3 rounded-full border-2 border-bg-secondary tradition-dot--${p.religion.toLowerCase()}`}
                />

                <div className="rounded-xl border border-border bg-bg-secondary/80 p-5 transition-all duration-300 hover:border-border/80">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted font-mono">
                      {p.bookTitle}
                    </span>
                    <span className="text-border">·</span>
                    <span className="text-xs text-text-muted font-body">{p.reference}</span>
                  </div>
                  <p className="text-text-primary font-serif">
                    &ldquo;{p.text}&rdquo;
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="attribution">
                      — {p.source.translator} ({p.source.year})
                    </p>
                    <AIExplainButton
                      verse={p.text}
                      religion={p.religion}
                      bookTitle={p.bookTitle}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Science & Research insight */}
      {!loading && !fusing && (showResults || passages.length > 0) && (selectedTopic || selectedQuestion) && (
        <section className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.03] p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                <path d="M9 3h6v11l-3 3-3-3V3z" />
                <path d="M6 21h12" />
                <path d="M9 3v4" />
                <path d="M15 3v4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-emerald-400 font-mono tracking-wider uppercase">
                Science & Research
              </h3>
              <p className="text-xs text-text-muted">
                What empirical research says about{' '}
                {selectedTopic
                  ? topics.find((t) => t.id === selectedTopic)?.name
                  : selectedQuestion
                    ? questions.find((q) => q.id === selectedQuestion)?.question
                    : ''}
              </p>
            </div>
          </div>
          <ScienceInsight
            curatedNotes={
              selectedTopic
                ? topics.find((t) => t.id === selectedTopic)?.scienceNotes
                : selectedQuestion
                  ? questions.find((q) => q.id === selectedQuestion)?.scienceNotes
                  : undefined
            }
            label={
              selectedTopic
                ? topics.find((t) => t.id === selectedTopic)?.name || ""
                : selectedQuestion
                  ? questions.find((q) => q.id === selectedQuestion)?.question || ""
                  : ""
            }
            passages={passages}
          />
        </section>
      )}

      {/* Empty state */}
      {!loading && !fusing && !showResults && (
        <div className="rounded-2xl border border-dashed border-border py-20 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>
          </div>
          <p className="text-lg font-semibold text-text-primary font-body">Compare Across Traditions</p>
          <p className="text-sm text-text-muted max-w-sm mx-auto font-body">
            Select a topic or question above, then click <span className="text-accent">Fuse Wisdom</span> to see how different scriptures address the same timeless questions.
          </p>
        </div>
      )}
    </div>
  );
}
