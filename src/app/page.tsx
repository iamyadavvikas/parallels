import { books, topics } from "@/data";
import BookCard from "@/components/ui/BookCard";
import SearchBar from "@/components/ui/SearchBar";
import ReligionBadge from "@/components/ui/ReligionBadge";
import ReadingHistorySection from "@/components/layout/ReadingHistorySection";
import Logo from "@/components/ui/Logo";
import VerseOfDay from "@/components/ui/VerseOfDay";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import GamificationBar from "@/components/ui/GamificationBar";
import Link from "next/link";

const featureTopicId = "peace";
const featureTopic = topics.find((t) => t.id === featureTopicId);

const traditionIcons: Record<string, string> = {
  Hinduism: "🕉",
  Christianity: "✝",
  Islam: "☪",
  Judaism: "✡",
  Sikhism: "☬",
  Buddhism: "☸",
};

export default function Home() {
  return (
    <div className="space-y-20 page-enter">
      {/* ═══ HERO — Galaxy ═══ */}
      <section className="relative overflow-hidden rounded-3xl bg-bg-surface px-6 py-24 text-center sm:px-16 sm:py-32"
        style={{ boxShadow: '0 0 80px rgba(255, 209, 102, 0.04), 0 4px 24px var(--color-shadow-sm), 0 32px 100px var(--color-shadow-md)' }}>
        {/* Deep space backdrop */}
        <div className="galaxy-layer galaxy-backdrop" />

        {/* Nebula — slow rotating conic gradient */}
        <div className="galaxy-layer galaxy-nebula" />

        {/* Star field — twinkling dots */}
        <div className="galaxy-layer galaxy-stars" />

        {/* Orbit rings — faint circles */}
        <div className="galaxy-orbit-ring" style={{ width: 240, height: 240, marginTop: -120, marginLeft: -120 }} />
        <div className="galaxy-orbit-ring" style={{ width: 380, height: 380, marginTop: -190, marginLeft: -190 }} />
        <div className="galaxy-orbit-ring" style={{ width: 540, height: 540, marginTop: -270, marginLeft: -270 }} />

        {/* Orbiting planets — one per tradition, larger with glow */}
        <div className="galaxy-planet galaxy-planet--hinduism" style={{ width: 8, height: 8, '--orbit-radius': '120px', '--orbit-duration': '18s', animationDelay: '0s' } as React.CSSProperties} />
        <div className="galaxy-planet galaxy-planet--christianity" style={{ width: 7, height: 7, '--orbit-radius': '190px', '--orbit-duration': '26s', animationDelay: '-5s' } as React.CSSProperties} />
        <div className="galaxy-planet galaxy-planet--islam" style={{ width: 9, height: 9, '--orbit-radius': '270px', '--orbit-duration': '36s', animationDelay: '-12s' } as React.CSSProperties} />
        <div className="galaxy-planet galaxy-planet--judaism" style={{ width: 6, height: 6, '--orbit-radius': '145px', '--orbit-duration': '22s', animationDelay: '-8s' } as React.CSSProperties} />
        <div className="galaxy-planet galaxy-planet--sikhism" style={{ width: 6, height: 6, '--orbit-radius': '210px', '--orbit-duration': '32s', animationDelay: '-15s' } as React.CSSProperties} />
        <div className="galaxy-planet galaxy-planet--buddhism" style={{ width: 7, height: 7, '--orbit-radius': '165px', '--orbit-duration': '28s', animationDelay: '-3s' } as React.CSSProperties} />

        <div className="relative z-10">
          {/* Sigil — neon glow */}
          <div className="hero-headline mx-auto mb-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/8 border border-accent/20 hero-sigil"
            style={{ boxShadow: '0 0 24px rgba(255, 209, 102, 0.15), 0 0 48px rgba(255, 209, 102, 0.05)' }}>
            <Logo size={40} />
          </div>

          {/* Headline — larger, tighter */}
          <h1 className="hero-headline-delay mb-6 text-5xl font-extrabold tracking-tight text-text-primary sm:text-7xl font-display"
            style={{ letterSpacing: "-0.045em", lineHeight: "1.05" }}>
            See How the World
            <br />
            <span className="gradient-text-wide">Compares</span>
          </h1>

          <p className="hero-headline-delay-2 mx-auto mb-14 max-w-2xl text-lg text-text-secondary font-body leading-relaxed">
            Browse, search, and <span className="text-accent font-semibold">compare passages</span> from six major religious
            traditions — side by side, in a space designed for reverence.
          </p>

          {/* Search */}
          <div className="hero-headline-delay-2 mx-auto max-w-xl">
            <SearchBar large />
            <p className="mt-3 text-xs text-text-muted/50 font-body text-center">
              Try: <span className="text-accent/60">forgiveness</span>, <span className="text-accent/60">afterlife</span>, <span className="text-accent/60">suffering</span>, <span className="text-accent/60">justice</span>
            </p>
          </div>

          {/* Sample comparison questions — curiosity + controversy */}
          <div className="hero-headline-delay-2 mt-8 mx-auto max-w-2xl">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-text-muted/60 mb-3">
              Try a question
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { id: "q-one-true-path", text: "Is there one true path to God?" },
                { id: "q-good-without-belief", text: "Can a good person be condemned for not believing?" },
                { id: "q-suffering-best", text: "Which tradition explains suffering best?" },
                { id: "q-most-compelling-afterlife", text: "Which afterlife concept is most honest?" },
                { id: "q-all-true", text: "Can different religions all be true?" },
              ].map((q) => (
                <Link
                  key={q.id}
                  href={`/compare?q=${q.id}`}
                  className="question-chip group inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary/40 backdrop-blur-md px-4 py-2 text-sm text-text-muted hover:text-accent hover:border-accent/30 transition-all font-body"
                >
                  <span className="text-accent/70 group-hover:text-accent font-mono text-xs">?</span>
                  <span>{q.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tradition chips — neon border glow on hover */}
          <div className="hero-headline-delay-2 mt-14 flex flex-wrap justify-center gap-3">
            {books.map((b, i) => (
              <Link
                key={b.id}
                href={`/books/${b.slug}`}
                data-tradition={b.religion.toLowerCase()}
                className="tradition-chip inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-secondary/50 backdrop-blur-md px-5 py-2.5 text-sm text-text-muted hover:text-current transition-all font-body"
                style={{ animationDelay: `${0.4 + i * 0.06}s` }}
              >
                <span className="text-lg">{traditionIcons[b.religion]}</span>
                <span>{b.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ READING HISTORY ═══ */}
      <ReadingHistorySection />

      {/* ═══ VERSE OF THE DAY ═══ */}
      <VerseOfDay />

      {/* ═══ FEATURED TOPIC ═══ */}
      {featureTopic && (
        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="mb-2 inline-block text-xs font-mono tracking-[0.25em] uppercase text-accent">
                Featured Topic
              </span>
              <h2 className="text-3xl font-bold text-text-primary font-display tracking-tight sm:text-4xl">
                {featureTopic.name}
              </h2>
              <p className="mt-2 text-sm text-text-muted font-body max-w-lg">
                {featureTopic.description}
              </p>
            </div>
            <Link
              href={`/topics/${featureTopic.id}`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-accent/20 px-4 py-2 text-sm text-accent hover:bg-accent/8 transition-all font-body"
            >
              View all
              <span className="text-lg leading-none">→</span>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featureTopic.passages.slice(0, 3).map((p, i) => (
              <div
                key={i}
                className="stagger-in group card relative overflow-hidden rounded-2xl bg-bg-surface p-6 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Tradition accent strip */}
                <div className="absolute left-0 top-0 h-full w-[3px] opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ background: `var(--tradition-${p.religion.toLowerCase()})` }} />

                <div className="mb-4 flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full"
                    style={{
                      background: `var(--tradition-${p.religion.toLowerCase()})`,
                      boxShadow: `0 0 8px var(--tradition-${p.religion.toLowerCase()}-glow)`,
                    }} />
                  <ReligionBadge religion={p.religion} />
                </div>

                <blockquote className="text-text-primary font-serif mb-5">
                  &ldquo;{p.text}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between text-xs text-text-muted font-body">
                  <span className="attribution">— {p.reference}</span>
                  <Link href={`/topics/${featureTopic.id}`}
                    className="text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ═══ SACRED LIBRARY ═══ */}
      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="mb-2 inline-block text-xs font-mono tracking-[0.25em] uppercase text-accent">
              Sacred Library
            </span>
            <h2 className="text-3xl font-bold text-text-primary font-display tracking-tight sm:text-4xl">
              Six Traditions
            </h2>
            <p className="mt-2 text-sm text-text-muted font-body">
              Explore the full texts of six major world religions
            </p>
          </div>
          <Link href="/topics"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-accent/20 px-4 py-2 text-sm text-accent hover:bg-accent/8 transition-all font-body">
            Browse topics
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        <div className="grid gap-6 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <div key={book.id} className="stagger-in w-full max-w-[260px]"
              style={{ animationDelay: `${i * 0.08}s` }}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ COMPARE CTA — Futuristic ═══ */}
      <section className="compare-cta-section relative overflow-hidden rounded-3xl p-12 text-center sm:p-20">
        <div className="compare-cta-bg" />
        <div className="absolute left-1/2 top-0 h-px w-64 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="absolute left-1/2 bottom-0 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        <div className="relative z-10">
          <div className="ornate-divider mx-auto mb-8 max-w-xs"><span>✦</span></div>
          <h2 className="mb-5 text-4xl font-bold text-text-primary font-display tracking-tight sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}>
            Compare Across Traditions
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-text-secondary font-body leading-relaxed">
            See how different scriptures address the same timeless questions —
            love, peace, justice, and the meaning of life.
          </p>
          <Link href="/compare"
            className="btn-primary inline-flex items-center gap-2.5 rounded-xl px-12 py-4 text-sm font-semibold ripple-effect">
            Start Comparing
            <span className="text-lg">→</span>
          </Link>
        </div>
      </section>

      {/* ═══ NEWSLETTER SIGNUP ═══ */}
      <NewsletterSignup />
    </div>
  );
}
