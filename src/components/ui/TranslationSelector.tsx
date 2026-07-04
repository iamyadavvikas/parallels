"use client";

import { useState } from "react";
import { Languages, ChevronDown } from "lucide-react";
import type { Translation } from "@/lib/types";

interface TranslationSelectorProps {
  translations: Translation[];
  onSelect: (translationId: string | null) => void;
  activeId?: string | null;
}

export default function TranslationSelector({
  translations,
  onSelect,
  activeId,
}: TranslationSelectorProps) {
  const [open, setOpen] = useState(false);

  if (translations.length === 0) return null;

  const active = translations.find((t) => t.id === activeId);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium transition-all duration-200 ${
          active
            ? "bg-accent/15 text-accent"
            : "text-text-muted hover:bg-bg-tertiary/50 hover:text-text-primary"
        }`}
        aria-label="Select translation"
      >
        <Languages className="h-3 w-3" />
        <span className="hidden sm:inline">{active?.translator || "Translation"}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 z-50 mb-2 w-56 rounded-xl border border-border/40 bg-bg-secondary/95 p-1 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => { onSelect(null); setOpen(false); }}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              !active
                ? "bg-accent/10 text-accent"
                : "text-text-secondary hover:bg-bg-tertiary/50 hover:text-text-primary"
            }`}
          >
            Default Translation
          </button>
          {translations.map((t) => (
            <button
              key={t.id}
              onClick={() => { onSelect(t.id); setOpen(false); }}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeId === t.id
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:bg-bg-tertiary/50 hover:text-text-primary"
              }`}
            >
              {t.translator}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
