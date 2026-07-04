"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  verseId: string;
  reference: string;
  text: string;
  bookSlug?: string;
  chapterId?: string;
}

export default function ShareButton({
  verseId,
  reference,
  text,
  bookSlug,
  chapterId,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const verseUrl =
    bookSlug && chapterId
      ? `${typeof window !== "undefined" ? window.location.origin : ""}/verse/${bookSlug}/${chapterId}/${verseId}`
      : "";

  async function handleShare() {
    const content = `"${text}" — ${reference}`;
    const fullShare = verseUrl ? `${content}\n\n${verseUrl}` : content;

    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${reference} — Parallels`,
          text: content,
          url: verseUrl || undefined,
        });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    // Fallback: clipboard
    try {
      await navigator.clipboard.writeText(fullShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = fullShare;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-all hover:bg-bg-tertiary hover:text-accent hover:scale-110 active:scale-90"
      aria-label={copied ? "Copied to clipboard" : "Share verse"}
      title={copied ? "Copied!" : "Share verse"}
    >
      {copied ? (
        <span className="text-[10px] font-semibold text-accent">OK</span>
      ) : (
        <Share2 className="h-4 w-4" />
      )}
    </button>
  );
}
