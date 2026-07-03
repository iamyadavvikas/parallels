"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

interface ShareButtonProps {
  verseId: string;
  reference: string;
  text: string;
}

export default function ShareButton({ verseId, reference, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const content = `"${text}" — ${reference}`;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = content;
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
      aria-label={copied ? "Copied to clipboard" : "Copy verse to clipboard"}
      title={copied ? "Copied!" : "Copy verse"}
    >
      {copied ? (
        <span className="text-[10px] font-semibold text-accent">OK</span>
      ) : (
        <Share2 className="h-4 w-4" />
      )}
    </button>
  );
}
