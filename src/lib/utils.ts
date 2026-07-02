import type { Religion } from "./types";

export const religionColors: Record<Religion, string> = {
  Hinduism: "border-l-[var(--tradition-hinduism)] bg-[var(--tradition-hinduism)]/5 dark:bg-[var(--tradition-hinduism)]/8",
  Christianity: "border-l-[var(--tradition-christianity)] bg-[var(--tradition-christianity)]/5 dark:bg-[var(--tradition-christianity)]/8",
  Islam: "border-l-[var(--tradition-islam)] bg-[var(--tradition-islam)]/5 dark:bg-[var(--tradition-islam)]/8",
  Judaism: "border-l-[var(--tradition-judaism)] bg-[var(--tradition-judaism)]/5 dark:bg-[var(--tradition-judaism)]/8",
  Sikhism: "border-l-[var(--tradition-sikhism)] bg-[var(--tradition-sikhism)]/5 dark:bg-[var(--tradition-sikhism)]/8",
  Buddhism: "border-l-[var(--tradition-buddhism)] bg-[var(--tradition-buddhism)]/5 dark:bg-[var(--tradition-buddhism)]/8",
};

export const religionAccentColors: Record<Religion, string> = {
  Hinduism: "text-[var(--tradition-hinduism)]",
  Christianity: "text-[var(--tradition-christianity)]",
  Islam: "text-[var(--tradition-islam)]",
  Judaism: "text-[var(--tradition-judaism)]",
  Sikhism: "text-[var(--tradition-sikhism)]",
  Buddhism: "text-[var(--tradition-buddhism)]",
};

export const religionBadgeColors: Record<Religion, string> = {
  Hinduism: "bg-[var(--tradition-hinduism)]/15 text-[var(--tradition-hinduism)] border border-[var(--tradition-hinduism)]/20",
  Christianity: "bg-[var(--tradition-christianity)]/15 text-[var(--tradition-christianity)] border border-[var(--tradition-christianity)]/20",
  Islam: "bg-[var(--tradition-islam)]/15 text-[var(--tradition-islam)] border border-[var(--tradition-islam)]/20",
  Judaism: "bg-[var(--tradition-judaism)]/15 text-[var(--tradition-judaism)] border border-[var(--tradition-judaism)]/20",
  Sikhism: "bg-[var(--tradition-sikhism)]/15 text-[var(--tradition-sikhism)] border border-[var(--tradition-sikhism)]/20",
  Buddhism: "bg-[var(--tradition-buddhism)]/15 text-[var(--tradition-buddhism)] border border-[var(--tradition-buddhism)]/20",
};

export const religionCardBorders: Record<Religion, string> = {
  Hinduism: "hover:border-[var(--tradition-hinduism)]/30 hover:shadow-[0_0_30px_var(--tradition-hinduism-glow)]",
  Christianity: "hover:border-[var(--tradition-christianity)]/30 hover:shadow-[0_0_30px_var(--tradition-christianity-glow)]",
  Islam: "hover:border-[var(--tradition-islam)]/30 hover:shadow-[0_0_30px_var(--tradition-islam-glow)]",
  Judaism: "hover:border-[var(--tradition-judaism)]/30 hover:shadow-[0_0_30px_var(--tradition-judaism-glow)]",
  Sikhism: "hover:border-[var(--tradition-sikhism)]/30 hover:shadow-[0_0_30px_var(--tradition-sikhism-glow)]",
  Buddhism: "hover:border-[var(--tradition-buddhism)]/30 hover:shadow-[0_0_30px_var(--tradition-buddhism-glow)]",
};

export const religionDotColors: Record<Religion, string> = {
  Hinduism: "bg-[var(--tradition-hinduism)]",
  Christianity: "bg-[var(--tradition-christianity)]",
  Islam: "bg-[var(--tradition-islam)]",
  Judaism: "bg-[var(--tradition-judaism)]",
  Sikhism: "bg-[var(--tradition-sikhism)]",
  Buddhism: "bg-[var(--tradition-buddhism)]",
};

export const religionGlowColors: Record<Religion, string> = {
  Hinduism: "var(--tradition-hinduism-glow)",
  Christianity: "var(--tradition-christianity-glow)",
  Islam: "var(--tradition-islam-glow)",
  Judaism: "var(--tradition-judaism-glow)",
  Sikhism: "var(--tradition-sikhism-glow)",
  Buddhism: "var(--tradition-buddhism-glow)",
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function highlightText(text: string, query: string): string {
  if (!query.trim()) return escapeHtml(text);
  const words = query.trim().split(/\s+/).filter(Boolean);
  let result = escapeHtml(text);
  for (const word of words) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(
      new RegExp(`(${escaped})`, "gi"),
      "<mark>$1</mark>",
    );
  }
  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
