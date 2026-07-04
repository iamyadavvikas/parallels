"use client";

import { useState, useRef } from "react";
import { Share2, Download, Copy } from "lucide-react";

interface ComparisonCardProps {
  query: string;
  results: {
    religion: string;
    text: string;
    reference: string;
    bookTitle: string;
  }[];
}

const traditionColors: Record<string, { bg: string; text: string; border: string }> = {
  Hinduism: { bg: "#FF6B35", text: "#fff", border: "#FF6B35" },
  Christianity: { bg: "#4A90D9", text: "#fff", border: "#4A90D9" },
  Islam: { bg: "#2ECC71", text: "#fff", border: "#2ECC71" },
  Judaism: { bg: "#9B59B6", text: "#fff", border: "#9B59B6" },
  Sikhism: { bg: "#F39C12", text: "#fff", border: "#F39C12" },
  Buddhism: { bg: "#E74C3C", text: "#fff", border: "#E74C3C" },
};

export default function ComparisonCard({ query, results }: ComparisonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const displayResults = results.slice(0, 6);

  async function handleCopyImage() {
    if (!cardRef.current) return;

    try {
      // Use html2canvas-like approach with native API
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Background
      ctx.fillStyle = "#0D0D12";
      ctx.fillRect(0, 0, 1200, 630);

      // Title
      ctx.fillStyle = "#FFD166";
      ctx.font = "bold 48px Inter, sans-serif";
      ctx.fillText(`"${query}"`, 60, 80);

      ctx.fillStyle = "#888";
      ctx.font = "24px Inter, sans-serif";
      ctx.fillText("across six world religions", 60, 120);

      // Results
      let y = 180;
      for (const r of displayResults) {
        const color = traditionColors[r.religion]?.border || "#666";

        // Religion label
        ctx.fillStyle = color;
        ctx.font = "bold 20px Inter, sans-serif";
        ctx.fillText(r.religion, 60, y);

        // Verse text (truncated)
        ctx.fillStyle = "#ddd";
        ctx.font = "18px serif";
        const text = r.text.length > 80 ? r.text.slice(0, 80) + "..." : r.text;
        ctx.fillText(`"${text}"`, 60, y + 30);

        // Reference
        ctx.fillStyle = "#666";
        ctx.font = "16px Inter, sans-serif";
        ctx.fillText(`${r.bookTitle} · ${r.reference}`, 60, y + 55);

        y += 90;
      }

      // Footer
      ctx.fillStyle = "#444";
      ctx.font = "16px Inter, sans-serif";
      ctx.fillText("parallels-ten.vercel.app", 60, 600);

      // Download
      const link = document.createElement("a");
      link.download = `parallels-${query}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Fallback: copy text
      handleCopyText();
    }
  }

  async function handleCopyText() {
    const text = `"${query}" across six world religions:\n\n${displayResults
      .map((r) => `${r.religion}: "${r.text}" — ${r.bookTitle} ${r.reference}`)
      .join("\n\n")}\n\n— parallels-ten.vercel.app`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  }

  return (
    <div className="space-y-3">
      {/* Visual preview */}
      <div
        ref={cardRef}
        className="rounded-2xl border border-border/40 bg-bg-secondary/80 p-6 backdrop-blur-xl"
      >
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-accent font-display">
            &ldquo;{query}&rdquo;
          </h3>
          <p className="text-sm text-text-muted">across six world religions</p>
        </div>

        <div className="space-y-4">
          {displayResults.map((r, i) => {
            const color = traditionColors[r.religion];
            return (
              <div
                key={i}
                className="border-l-2 pl-4"
                style={{ borderColor: color?.border || "#666" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: color?.border }}
                  >
                    {r.religion}
                  </span>
                </div>
                <p className="text-sm text-text-primary font-serif leading-relaxed">
                  &ldquo;{r.text.length > 120 ? r.text.slice(0, 120) + "..." : r.text}&rdquo;
                </p>
                <p className="text-xs text-text-muted mt-1">
                  {r.bookTitle} · {r.reference}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border/20 flex items-center justify-between">
          <span className="text-xs text-text-muted/60 font-mono">
            parallels-ten.vercel.app
          </span>
          <span className="text-xs text-text-muted/60">
            {displayResults.length} traditions compared
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleCopyImage}
          className="flex items-center gap-2 rounded-lg border border-accent/20 px-4 py-2 text-sm text-accent hover:bg-accent/8 transition-all"
        >
          <Download className="h-4 w-4" />
          Download image
        </button>
        <button
          onClick={handleCopyText}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-text-muted hover:bg-bg-tertiary transition-all"
        >
          {copied ? (
            <span className="text-accent">Copied!</span>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy text
            </>
          )}
        </button>
      </div>
    </div>
  );
}
