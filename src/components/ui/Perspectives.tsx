"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Religion } from "@/lib/types";

interface VerseResult {
  religion: Religion;
  bookTitle: string;
  bookSlug: string;
  chapterId: string;
  chapterTitle: string;
  chapterNumber: number;
  verseId: string;
  verseNumber: number;
  text: string;
}

const traditionInsights: Record<string, Record<Religion, string>> = {
  remarriage: {
    Hinduism: "Marriage is a sacred samskara. The Bhagavad Gita frames separation and union in spiritual terms — the soul's bond with the Divine is the model for marital covenant.",
    Christianity: "The Decalogue's adultery prohibition and Jesus's teaching in Matthew 19 establish marriage as an unbreakable covenant before God. Paul offers pastoral guidance for widowhood.",
    Islam: "The Quran permits remarriage after divorce (talaq) with waiting periods (iddah). Righteousness includes family obligation — remarriage must preserve duties to children and kin.",
    Judaism: "The Torah's adultery prohibition requires a formal get (writ of divorce) before remarriage. The covenant model of the Shema governs all sacred bonds.",
    Sikhism: "Guru Granth Sahib teaches that God dwells within all. Spiritual peace through Naam supersedes external marital status — remarriage is accepted with compassion.",
    Buddhism: "The Dhammapada teaches that hatred is appeased by love alone. Attachment, not marriage, causes suffering. Remarriage is a personal choice guided by wisdom.",
  },
  divorce: {
    Hinduism: "The Mahabharata presents Draupadi's story as a complex case of marital obligation. The BG teaches equanimity in all circumstances.",
    Christianity: "Jesus teaches that what God has joined, let no one separate. The Beatitudes comfort those who mourn — including mourning broken covenants.",
    Islam: "Talaq is permitted but disliked. The Quran emphasizes reconciliation and specifies waiting periods to ensure careful deliberation.",
    Judaism: "Divorce is permitted through the get. The Torah's laws govern the process as a legal and moral obligation.",
    Sikhism: "Guru Granth Sahib acknowledges separations occur. The focus is on dignity, fairness, and spiritual well-being of both parties.",
    Buddhism: "Non-attachment is the path. Compassion and honest communication guide the dissolution of relationships.",
  },
  marriage: {
    Hinduism: "Marriage is a sacred samskara — an eternal bond. The BG teaches devotion and duty as the foundation of all relationships.",
    Christianity: "Marriage is a covenant reflecting Christ's relationship with the Church. 'Honor your father and mother' establishes the family unit as sacred.",
    Islam: "Nikah is a sacred contract. The Quran calls spouses 'garments for one another.' Righteousness includes care for family.",
    Judaism: "Marriage (kiddushin) is a holy covenant. The Shema establishes monotheistic covenant as the model for all bonds.",
    Sikhism: "The Anand Karaj ceremony sanctifies marriage. The Guru unites husband and wife in devotion to God.",
    Buddhism: "Marriage is a social institution. The emphasis is on mutual respect, fidelity, and shared spiritual practice.",
  },
  death: {
    Hinduism: "The soul transmigrates. The BG teaches: 'As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies.'",
    Christianity: "Death is conquered through resurrection. 'We rejoice in our sufferings, knowing that suffering produces endurance.'",
    Islam: "Death is a transition to akhirah. 'Every soul shall taste death, then to Us you will be returned.'",
    Judaism: "Focus is on this life's moral obligations. The covenant continues beyond death.",
    Sikhism: "The soul passes through cycles of birth and death until it merges with God through Naam meditation.",
    Buddhism: "Death is part of samsara. 'You yourselves must make the effort; the Buddhas only show the way.'",
  },
  forgiveness: {
    Hinduism: "Forgiveness is a divine virtue. The BG describes the devotee who is 'forgiving' as dear to God.",
    Christianity: "'Father, forgive them, for they know not what they do.' Forgiveness is both received and extended.",
    Islam: "Al-Ghafur (The Forgiving) is one of Allah's names. 'If you pardon and forgive, Allah is Forgiving, Merciful.'",
    Judaism: "Teshuvah (repentance) leads to forgiveness. Yom Kippur is the Day of Atonement.",
    Sikhism: "Forgiveness comes through Naam and Guru's grace. 'Forgive the mistakes of all beings.'",
    Buddhism: "'Hatred is never appeased by hatred. By love alone is hatred appeased.'",
  },
  suffering: {
    Hinduism: "Suffering arises from ignorance and attachment. The BG teaches equanimity in pleasure and pain.",
    Christianity: "Suffering has redemptive power. 'Blessed are those who mourn, for they shall be comforted.'",
    Islam: "Suffering is a test. 'Do people think they will be left alone because they say, We believe?'",
    Judaism: "Covenant faithfulness persists even in trials. The Shema is declared in all circumstances.",
    Sikhism: "Suffering comes from ego and separation from God. 'Through pain, the Word is understood.'",
    Buddhism: "Dukkha is the First Noble Truth. It arises from craving. The Eightfold Path is the way out.",
  },
  love: {
    Hinduism: "Prema (divine love) is the highest emotion. The BG teaches devotion to God as the path to liberation.",
    Christianity: "'God is love. Whoever lives in love lives in God.' Agape — unconditional love — is the greatest virtue.",
    Islam: "'He loves them and they love Him.' Love of Allah and His creation is central to faith.",
    Judaism: "'You shall love your neighbor as yourself.' Ahavah is the foundation of covenant.",
    Sikhism: "'Through love, the disease of egotism is removed. Through love, all sorrows are dispelled.'",
    Buddhism: "'Hatred is never appeased by hatred. By love alone is hatred appeased.'",
  },
  peace: {
    Hinduism: "Shanti is inner peace from realizing the Divine. The BG teaches equanimity as the path to stillness.",
    Christianity: "'Peace I leave with you; my peace I give to you.' Divine peace transcends understanding.",
    Islam: "Salam is one of Allah's names. Peace comes through submission to the Divine will.",
    Judaism: "Shalom is wholeness. The vision is universal peace: 'Nation shall not lift up sword against nation.'",
    Sikhism: "'Meditating on the Lord of the Universe, I find peace. By the Guru's grace, all sorrows depart.'",
    Buddhism: "'Mind precedes all mental states. If with a pure mind a person acts, happiness follows.'",
  },
  prayer: {
    Hinduism: "Puja and japa connect the soul to the Divine. Meditation and devotion are forms of prayer.",
    Christianity: "'Pray without ceasing.' Prayer is communion with God — the model is the Lord's Prayer.",
    Islam: "Salat (five daily prayers) connects the servant directly to Allah without intermediary.",
    Judaism: "Tefillah connects the individual to God. The Shema declares oneness; the Amidah is the central prayer.",
    Sikhism: "Naam Simran is the core practice. 'Remember the Lord, and all thy fears shall depart.'",
    Buddhism: "Meditation and chanting cultivate mindfulness. Buddhist prayer is reflection and recitation.",
  },
};

const traditions: Religion[] = [
  "Hinduism", "Christianity", "Islam", "Judaism", "Sikhism", "Buddhism",
];

const traditionSvgPaths: Record<Religion, string> = {
  Hinduism: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a2 2 0 110 4 2 2 0 010-4zm3 12H9v-1a3 3 0 016 0v1z",
  Christianity: "M12 2v8m-4-4h8m-8 4v8m4-8v8m-6-12h12",
  Islam: "M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v2h-2V7zm0 4h2v6h-2v-6z",
  Judaism: "M12 2l-7 7h3v6h2v-4h4v4h2v-6h3l-7-7z",
  Sikhism: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a2 2 0 110 4 2 2 0 010-4zm-3 8h6v2H9v-2zm1-4h4v2h-4v-2z",
  Buddhism: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a3 3 0 110 6 3 3 0 010-6zm-4 9a4 4 0 018 0H8z",
};

type ViewMode = "unified" | "side-by-side" | "focused";

export default function Perspectives({
  query,
  results,
}: {
  query: string;
  results: VerseResult[];
}) {
  const q = query.toLowerCase().trim();
  const insights = traditionInsights[q];
  const [viewMode, setViewMode] = useState<ViewMode>("unified");
  const [expandedReligion, setExpandedReligion] = useState<Religion | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  // Sliding pill indicator
  useEffect(() => {
    if (!tabsRef.current || !pillRef.current) return;
    const activeBtn = tabsRef.current.querySelector(`[data-view="${viewMode}"]`) as HTMLElement;
    if (!activeBtn) return;
    const tabsRect = tabsRef.current.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    pillRef.current.style.left = `${btnRect.left - tabsRect.left}px`;
    pillRef.current.style.width = `${btnRect.width}px`;
  }, [viewMode]);

  if (!insights) return null;

  const byReligion = new Map<Religion, VerseResult[]>();
  for (const r of results) {
    const arr = byReligion.get(r.religion) || [];
    if (arr.length < 2) arr.push(r);
    byReligion.set(r.religion, arr);
  }

  const activeTraditions = traditions.filter(
    (religion) => byReligion.has(religion) || insights[religion]
  );

  return (
    <div className="perspectives-panel">
      {/* ── Header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
            <span className="text-accent text-sm">✦</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary font-body">
              Sacred Perspectives
            </h2>
            <p className="text-sm text-text-muted font-body">
              &ldquo;{query}&rdquo;
            </p>
          </div>
        </div>

        {/* View mode toggle with sliding pill */}
        <div ref={tabsRef} className="perspective-tabs-wrapper relative">
          <div ref={pillRef} className="perspective-pill" />
          {(["unified", "side-by-side", "focused"] as const).map((mode) => (
            <button
              key={mode}
              data-view={mode}
              onClick={() => setViewMode(mode)}
              className={`relative z-10 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                viewMode === mode ? "text-accent" : "text-text-muted hover:text-text-primary"
              }`}
              aria-label={`View as ${mode}`}
            >
              {mode === "unified" && "Unified"}
              {mode === "side-by-side" && "Compare"}
              {mode === "focused" && "Focus"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tradition filter chips ── */}
      <div className="mb-8 flex flex-wrap gap-2">
        {activeTraditions.map((religion) => {
          const isActive = expandedReligion === religion;
          const tradition = religion.toLowerCase();
          return (
            <button
              key={religion}
              onClick={() => setExpandedReligion(isActive ? null : religion)}
              className={`tradition-filter-chip group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium transition-all duration-300 ${
                isActive ? "active" : ""
              }`}
              data-tradition={tradition}
            >
              <span
                className="inline-block h-2 w-2 rounded-full transition-shadow duration-300"
                data-tradition-dot={tradition}
              />
              {religion}
            </button>
          );
        })}
      </div>

      {/* ── Tradition panels with accordion transition ── */}
      <div className={`perspective-grid ${viewMode}`}>
        {activeTraditions.map((religion) => {
          const verses = byReligion.get(religion) || [];
          const insight = insights[religion];
          const isExpanded = expandedReligion === religion || expandedReligion === null;
          const tradition = religion.toLowerCase();

          const hasVerses = verses.length > 0;

          return (
            <div
              key={religion}
              className="tradition-panel tradition-tinted"
              data-tradition={tradition}
              data-expanded={isExpanded ? "true" : "false"}
            >
              {/* ── Tradition header with SVG icon ── */}
              <div
                className="tradition-panel-header"
                onClick={() => setExpandedReligion(isExpanded ? null : religion)}
              >
                {/* SVG tradition icon */}
                <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `var(--tradition-${tradition}-glow)` }}>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke={`var(--tradition-${tradition})`}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d={traditionSvgPaths[religion]} />
                  </svg>
                </div>

                <span
                  className="text-sm font-semibold"
                  data-tradition-text={tradition}
                >
                  {religion}
                </span>
                {hasVerses && (
                  <span className="text-xs text-text-muted font-body">
                    {verses.length} verse{verses.length !== 1 ? "s" : ""}
                  </span>
                )}
                <svg
                  className={`ml-auto h-4 w-4 text-text-muted transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {/* ── Accordion content ── */}
              <div className="perspective-panel" data-expanded={isExpanded ? "true" : "false"}>
                <div>
                  {/* ── Insight text ── */}
                  {insight && (
                    <div className="px-5 pb-4">
                      <p className="text-sm leading-relaxed text-text-secondary font-body">
                        {insight}
                      </p>
                    </div>
                  )}

                  {/* ── Cited verses ── */}
                  {verses.map((verse) => {
                    const href = `/books/${verse.bookSlug}?chapter=${verse.chapterId}#verse-${verse.verseId}`;
                    return (
                      <Link
                        key={verse.verseId}
                        href={href}
                        className="tradition-verse block"
                      >
                        <div className="mb-1.5 flex items-center gap-2 pl-6">
                          <span className="text-xs text-text-muted font-body">
                            {verse.bookTitle}
                          </span>
                          <span className="text-xs text-text-muted font-body">·</span>
                          <span className="text-xs text-text-muted font-body">
                            {verse.chapterTitle}
                          </span>
                          <span className="text-xs text-text-muted font-body">:</span>
                          <span className="text-xs text-text-muted font-body">
                            v.{verse.verseNumber}
                          </span>
                          <span className="text-xs text-accent/60 font-body opacity-0 group-hover:opacity-100 transition-opacity">
                            read →
                          </span>
                        </div>
                        <p
                          className="italic text-text-primary/80 border-l-2 border-accent/15 pl-6 transition-colors group-hover:border-accent/40 font-serif"
                        >
                          &ldquo;{verse.text.length > 200 ? verse.text.slice(0, 200) + "..." : verse.text}&rdquo;
                        </p>
                      </Link>
                    );
                  })}

                  {/* ── Semantic Insights variant ── */}
                  {!hasVerses && insight && (
                    <div className="semantic-insight px-5 py-4">
                      <div className="flex items-center gap-2 mb-2 pl-6">
                        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/8">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4M12 8h.01" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-text-primary font-body">
                          Theological Insight
                        </span>
                      </div>
                      <p className="text-xs text-text-muted pl-6 font-body">
                        No exact verse match — insight based on theological analysis
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
