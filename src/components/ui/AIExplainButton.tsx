"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Loader2 } from "lucide-react";

interface AIExplainButtonProps {
  verse: string;
  religion?: string;
  bookTitle?: string;
}

export default function AIExplainButton({ verse, religion, bookTitle }: AIExplainButtonProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open || content || loading) return;
    setLoading(true);
    setError("");
    abortRef.current = new AbortController();

    fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verse, religion, bookTitle }),
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
          throw new Error(data.error || "Failed to explain");
        }
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No stream");
        const decoder = new TextDecoder();
        let text = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value, { stream: true });
          setContent(text);
        }
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));

    return () => abortRef.current?.abort();
  }, [open, verse, religion, bookTitle, content, loading]);

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => { setOpen(!open); setContent(""); setError(""); }}
        className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-all duration-200 ${
          open
            ? "bg-accent/15 text-accent"
            : "text-text-muted hover:bg-bg-tertiary/50 hover:text-text-primary"
        }`}
        aria-label="Explain this verse with AI"
      >
        <Sparkles className="h-3 w-3" />
        <span className="hidden sm:inline">AI</span>
      </button>

      {open && (
        <div className="absolute bottom-full right-0 z-50 mb-2 w-[min(400px,90vw)] rounded-xl border border-border/40 bg-bg-secondary/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              AI Explanation
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-0.5 text-text-muted hover:text-text-primary"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {loading && !content && (
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing verse...
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              <p className="mb-2">{error}</p>
              <button
                onClick={() => { setError(""); setContent(""); setLoading(false); }}
                className="text-xs text-red-300 underline hover:text-red-200"
              >
                Try again
              </button>
            </div>
          )}

          {content && (
            <div className="prose prose-sm prose-invert max-w-none text-sm leading-relaxed text-text-secondary font-body [&_strong]:text-text-primary [&_strong]:font-semibold [&_ul]:my-1 [&_ul]:ml-4 [&_li]:my-0.5">
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
            </div>
          )}

          <p className="mt-3 text-[10px] text-text-muted/60 font-mono">
            Powered by Gemini 2.0 Flash · Free tier
          </p>
        </div>
      )}
    </div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}
