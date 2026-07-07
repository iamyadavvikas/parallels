"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Accessibility, Palette, CheckCircle, AlertTriangle, AlertCircle, ChevronDown, ChevronRight } from "lucide-react";

interface Finding {
  id: string;
  severity: "error" | "warning" | "pass";
  category: "accessibility" | "visual";
  component: string;
  description: string;
  selector?: string;
}

function scanAccessibility(): Finding[] {
  const findings: Finding[] = [];

  // Skip-to-content link
  if (!document.querySelector('a[href="#main-content"]')) {
    findings.push({
      id: "skip-to-content",
      severity: "error",
      category: "accessibility",
      component: "Layout",
      description: "Missing skip-to-content link for keyboard users",
    });
  }

  // aria-current on active nav
  const activeNavLinks = document.querySelectorAll("nav a[aria-current]");
  if (activeNavLinks.length === 0) {
    findings.push({
      id: "aria-current",
      severity: "error",
      category: "accessibility",
      component: "Navbar",
      description: "Active navigation link missing aria-current=\"page\"",
    });
  }

  // Search inputs without labels
  const searchInputs = document.querySelectorAll('input[type="search"]');
  searchInputs.forEach((input, i) => {
    if (!input.getAttribute("aria-label") && !input.getAttribute("aria-labelledby")) {
      findings.push({
        id: `search-label-${i}`,
        severity: "error",
        category: "accessibility",
        component: "SearchBar",
        description: "Search input missing aria-label",
        selector: `input[type="search"]:nth-of-type(${i + 1})`,
      });
    }
  });

  // Dialog roles
  const dialogs = document.querySelectorAll("[data-dialog]");
  dialogs.forEach((dialog) => {
    if (!dialog.getAttribute("role")) {
      findings.push({
        id: "dialog-role",
        severity: "error",
        category: "accessibility",
        component: "CommandPalette",
        description: "Modal dialog missing role=\"dialog\" and aria-modal",
      });
    }
  });

  // Tab patterns
  const tabContainers = document.querySelectorAll("[data-tablist]");
  tabContainers.forEach((container) => {
    if (!container.getAttribute("role")) {
      findings.push({
        id: "tab-pattern",
        severity: "error",
        category: "accessibility",
        component: "Bookmarks",
        description: "Tab container missing role=\"tablist\" and aria-selected on tabs",
      });
    }
  });

  // Buttons without accessible names
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    const hasLabel = btn.getAttribute("aria-label") || btn.textContent?.trim() || btn.getAttribute("title");
    if (!hasLabel) {
      findings.push({
        id: `btn-label-${i}`,
        severity: "warning",
        category: "accessibility",
        component: "Unknown",
        description: `Button without accessible name: ${btn.className.slice(0, 50)}...`,
      });
    }
  });

  // Heading hierarchy
  const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  let prevLevel = 0;
  headings.forEach((h) => {
    const level = parseInt(h.tagName[1]);
    if (prevLevel > 0 && level > prevLevel + 1) {
      findings.push({
        id: `heading-skip-${h.tagName}`,
        severity: "warning",
        category: "accessibility",
        component: "Page Structure",
        description: `Heading level skipped: h${prevLevel} → h${level} ("${h.textContent?.slice(0, 40)}")`,
      });
    }
    prevLevel = level;
  });

  // Focus indicators
  const interactiveElements = document.querySelectorAll("a, button, input, select, textarea, [tabindex]");
  let missingFocus = 0;
  interactiveElements.forEach((el) => {
    const style = getComputedStyle(el);
    if (style.outlineStyle === "none" && !el.classList.contains("sr-only")) {
      missingFocus++;
    }
  });
  if (missingFocus > 5) {
    findings.push({
      id: "focus-indicators",
      severity: "warning",
      category: "accessibility",
      component: "Global",
      description: `${missingFocus} interactive elements may lack visible focus indicators`,
    });
  }

  return findings;
}

function scanVisual(): Finding[] {
  const findings: Finding[] = [];

  // Inconsistent text colors
  const whiteText = document.querySelectorAll(".text-white");
  if (whiteText.length > 0) {
    findings.push({
      id: "text-white",
      severity: "warning",
      category: "visual",
      component: "Global",
      description: `${whiteText.length} elements use text-white instead of design token (should use text-void or text-text-primary)`,
    });
  }

  // Inline styles that could be CSS classes
  const inlineStyles = document.querySelectorAll("[style*='background']");
  if (inlineStyles.length > 3) {
    findings.push({
      id: "inline-bg",
      severity: "warning",
      category: "visual",
      component: "Global",
      description: `${inlineStyles.length} elements use inline background styles (consider CSS classes)`,
    });
  }

  // Check for consistent border-radius
  const cards = document.querySelectorAll(".card, [class*='rounded-']");
  const radii = new Set<string>();
  cards.forEach((card) => {
    const style = getComputedStyle(card);
    radii.add(style.borderRadius);
  });

  // Check z-index layering
  const fixedElements = document.querySelectorAll("[class*='fixed'], [class*='sticky']");
  const zIndexes: number[] = [];
  fixedElements.forEach((el) => {
    const style = getComputedStyle(el);
    const z = parseInt(style.zIndex);
    if (!isNaN(z)) zIndexes.push(z);
  });
  const hasOverlap = zIndexes.filter((z) => z >= 40 && z <= 60).length > 3;
  if (hasOverlap) {
    findings.push({
      id: "z-index-overlap",
      severity: "warning",
      category: "visual",
      component: "Layout",
      description: "Multiple fixed elements in z-40 to z-60 range may cause overlap issues",
    });
  }

  // Responsive: check for horizontal overflow
  if (document.body.scrollWidth > window.innerWidth) {
    findings.push({
      id: "horizontal-overflow",
      severity: "error",
      category: "visual",
      component: "Page",
      description: "Page has horizontal overflow — content may be clipped on mobile",
    });
  }

  // Check contrast (basic)
  const lowContrastElements: string[] = [];
  document.querySelectorAll("p, span, a, h1, h2, h3").forEach((el) => {
    const style = getComputedStyle(el);
    const color = style.color;
    if (color.includes("106, 100, 120") || color.includes("42, 42, 58")) {
      lowContrastElements.push(el.tagName);
    }
  });
  if (lowContrastElements.length > 0) {
    findings.push({
      id: "low-contrast",
      severity: "warning",
      category: "visual",
      component: "Typography",
      description: `${lowContrastElements.length} elements may have low contrast on dark backgrounds`,
    });
  }

  return findings;
}

export default function UIReviewAgent() {
  const [open, setOpen] = useState(false);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["accessibility", "visual"]));
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const runScan = useCallback(() => {
    const a11y = scanAccessibility();
    const visual = scanVisual();
    setFindings([...a11y, ...visual]);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key === "R") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) runScan();
  }, [open, runScan]);

  function toggleSection(section: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  }

  function highlightElement(selector: string) {
    // Remove previous highlight
    const prev = document.querySelector("[data-review-highlight]");
    if (prev) prev.removeAttribute("data-review-highlight");

    const el = document.querySelector(selector);
    if (el) {
      (el as HTMLElement).setAttribute("data-review-highlight", "true");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(selector);
      setTimeout(() => {
        (el as HTMLElement).removeAttribute("data-review-highlight");
        setHighlightedId(null);
      }, 3000);
    }
  }

  const errors = findings.filter((f) => f.severity === "error");
  const warnings = findings.filter((f) => f.severity === "warning");
  const passed = findings.filter((f) => f.severity === "pass");

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-[9999] flex h-10 items-center gap-2 rounded-xl border border-border bg-obsidian/90 backdrop-blur-xl px-3 text-xs font-mono text-text-muted hover:text-accent hover:border-accent/30 transition-all shadow-lg"
        aria-label="Open UI Review Agent"
      >
        <Accessibility className="h-4 w-4" />
        <span className="hidden sm:inline">Review</span>
      </button>
    );
  }

  return (
    <>
      {/* Highlight overlay style */}
      <style>{`
        [data-review-highlight] {
          outline: 3px solid var(--color-accent) !important;
          outline-offset: 4px !important;
          border-radius: 8px !important;
          transition: outline 0.3s ease !important;
        }
      `}</style>

      <div className="fixed inset-0 z-[9999] flex items-start justify-end p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm max-h-[85vh] flex flex-col rounded-2xl border border-border bg-obsidian/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Accessibility className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-text-primary font-body">UI Review Agent</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={runScan}
                className="rounded-lg border border-border px-2 py-1 text-[10px] font-mono text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
              >
                Re-scan
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close review agent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Summary badges */}
          <div className="flex gap-2 border-b border-border px-4 py-2">
            {errors.length > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-mono text-red-400">
                <AlertCircle className="h-3 w-3" />
                {errors.length} error{errors.length !== 1 ? "s" : ""}
              </span>
            )}
            {warnings.length > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-0.5 text-[10px] font-mono text-yellow-400">
                <AlertTriangle className="h-3 w-3" />
                {warnings.length} warning{warnings.length !== 1 ? "s" : ""}
              </span>
            )}
            {passed.length > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-mono text-green-400">
                <CheckCircle className="h-3 w-3" />
                {passed.length} passed
              </span>
            )}
          </div>

          {/* Findings list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {/* Accessibility section */}
            <div>
              <button
                onClick={() => toggleSection("accessibility")}
                className="flex w-full items-center gap-2 text-xs font-semibold text-text-primary font-body mb-2"
              >
                {expandedSections.has("accessibility") ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                <Accessibility className="h-3.5 w-3.5 text-accent" />
                Accessibility ({findings.filter((f) => f.category === "accessibility").length})
              </button>
              {expandedSections.has("accessibility") && (
                <div className="space-y-2 ml-5">
                  {findings.filter((f) => f.category === "accessibility").map((f) => (
                    <div
                      key={f.id}
                      className={`rounded-lg border p-3 text-xs ${
                        f.severity === "error"
                          ? "border-red-500/20 bg-red-500/5"
                          : f.severity === "warning"
                            ? "border-yellow-500/20 bg-yellow-500/5"
                            : "border-green-500/20 bg-green-500/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] text-text-muted">{f.component}</span>
                          <p className="text-text-primary font-body mt-0.5">{f.description}</p>
                        </div>
                        {f.selector && (
                          <button
                            onClick={() => highlightElement(f.selector!)}
                            className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-mono transition-colors ${
                              highlightedId === f.selector
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border text-text-muted hover:text-accent hover:border-accent/30"
                            }`}
                          >
                            locate
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Visual section */}
            <div>
              <button
                onClick={() => toggleSection("visual")}
                className="flex w-full items-center gap-2 text-xs font-semibold text-text-primary font-body mb-2"
              >
                {expandedSections.has("visual") ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                <Palette className="h-3.5 w-3.5 text-yellow-400" />
                Visual ({findings.filter((f) => f.category === "visual").length})
              </button>
              {expandedSections.has("visual") && (
                <div className="space-y-2 ml-5">
                  {findings.filter((f) => f.category === "visual").map((f) => (
                    <div
                      key={f.id}
                      className={`rounded-lg border p-3 text-xs ${
                        f.severity === "error"
                          ? "border-red-500/20 bg-red-500/5"
                          : f.severity === "warning"
                            ? "border-yellow-500/20 bg-yellow-500/5"
                            : "border-green-500/20 bg-green-500/5"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] text-text-muted">{f.component}</span>
                          <p className="text-text-primary font-body mt-0.5">{f.description}</p>
                        </div>
                        {f.selector && (
                          <button
                            onClick={() => highlightElement(f.selector!)}
                            className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-mono transition-colors ${
                              highlightedId === f.selector
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border text-text-muted hover:text-accent hover:border-accent/30"
                            }`}
                          >
                            locate
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2 text-center">
            <p className="text-[10px] text-text-muted/40 font-mono">
              Press <kbd className="rounded border border-border px-1 py-0.5 text-[10px]">Ctrl+Shift+R</kbd> to toggle
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
