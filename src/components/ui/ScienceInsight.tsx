"use client";

import { useState, useRef, useEffect } from "react";
import { FlaskConical, Loader2, X, ChevronDown, ChevronUp } from "lucide-react";
import type { Passage } from "@/lib/types";

interface ScienceInsightProps {
  /** Pre-curated science notes from JSON data (hybrid approach — shows immediately) */
  curatedNotes?: string;
  /** Topic name or question for AI fallback */
  label: string;
  /** Optional passage context to help the AI generate more relevant science */
  passages?: Passage[];
}

export default function ScienceInsight({
  curatedNotes,
  label,
  passages,
}: ScienceInsightProps) {
  const [expanded, setExpanded] = useState(!!curatedNotes);
  const [aiContent, setAiContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // If curation is available, show it directly
  const isCurated = !!curatedNotes;
  const displayContent = isCurated ? curatedNotes : aiContent;

  // Cleanup on unmount
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Close on outside click when AI content is shown
  useEffect(() => {
    if (!expanded || isCurated) return;
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded, isCurated]);

  function fetchScience() {
    if (loading || aiContent) return;
    setLoading(true);
    setError("");
    abortRef.current = new AbortController();

    fetch("/api/science", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: label,
        passages: passages?.slice(0, 5).map((p) => ({
          religion: p.religion,
          bookTitle: p.bookTitle,
          text: p.text,
        })),
      }),
      signal: abortRef.current.signal,
    })
      .then(async (res) => {
        if (res.status === 429) {
          throw new Error("Rate limited. Please try again in a moment.");
        }
        if (res.status === 503) {
          throw new Error("AI features require an API key. Contact support.");
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Science API unavailable");
        }
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream");
        const decoder = new TextDecoder();
        let text = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          setAiContent(text);
        }
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));
  }

  function toggle() {
    if (!isCurated && !aiContent && !loading) {
      fetchScience();
    }
    setExpanded(!expanded);
  }

  return (
    <div ref={popoverRef}>
      <button
        onClick={toggle}
        className={`group inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-all duration-200 font-body ${
          expanded
            ? "border-emerald-500/30 bg-emerald-500/8 text-emerald-400"
            : "border-border text-text-muted hover:bg-bg-tertiary/50 hover:text-text-primary"
        }`}
        aria-label={expanded ? "Hide science insights" : "Show science insights"}
      >
        <FlaskConical className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
        <span>
          {expanded
            ? "Science & Research"
            : isCurated
              ? "Science & Research"
              : "Explore the science"}
        </span>
        {expanded ? (
          <ChevronUp className="h-3 w-3 text-text-muted" />
        ) : (
          <ChevronDown className="h-3 w-3 text-text-muted" />
        )}
      </button>

      {expanded && (
        <div className="mt-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] backdrop-blur-sm p-5 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10">
                <FlaskConical className="h-3 w-3 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 font-mono tracking-wider uppercase">
                Science & Research
              </span>
              {isCurated && (
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400/70 uppercase tracking-wider">
                  Curated
                </span>
              )}
            </div>
            {!isCurated && (
              <button
                onClick={() => { setExpanded(false); }}
                className="rounded-md p-0.5 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="relative">
            {loading && !aiContent && (
              <div className="flex items-center gap-2 py-2 text-sm text-text-muted">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                Retrieving scientific literature...
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                <p className="mb-2">{error}</p>
                <button
                  onClick={() => { setError(""); setAiContent(""); setLoading(false); }}
                  className="text-xs text-red-300 underline hover:text-red-200"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && aiContent && (
              <div className="text-sm leading-relaxed text-text-secondary font-body [&_strong]:text-emerald-300 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_li]:my-1">
                <ScienceContent text={aiContent} />
              </div>
            )}

            {!loading && isCurated && !aiContent && (
              <div className="text-sm leading-relaxed text-text-secondary font-body [&_strong]:text-emerald-300 [&_strong]:font-semibold">
                <ScienceContent text={curatedNotes} />
              </div>
            )}
          </div>

          {/* Footer */}
          {isCurated ? (
            <p className="mt-3 text-[10px] text-emerald-400/40 font-mono">
              Curated from peer-reviewed research · Real citations
            </p>
          ) : (
            <p className="mt-3 text-[10px] text-text-muted/40 font-mono">
              Generated by Gemini 2.0 Flash · Verify sources independently
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ScienceContent({ text }: { text: string }) {
  const html = text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
