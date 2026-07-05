"use client";

import { useState, useEffect, useCallback } from "react";
import { useGamificationStore } from "@/store/gamificationStore";
import { religionDotColors } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

function SparkleEffect({ tradition }: { tradition: string }) {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.3,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="sparkle-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            background: `var(--tradition-${tradition.toLowerCase()})`,
          }}
        />
      ))}
    </div>
  );
}

export default function DailyWisdom() {
  const [flipped, setFlipped] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const getDailyWisdom = useGamificationStore((s) => s.getDailyWisdom);
  const wisdom = getDailyWisdom();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleFlip = useCallback(() => {
    if (!flipped) {
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1000);
    }
    setFlipped(!flipped);
  }, [flipped]);

  if (!loaded) {
    return (
      <div className="rounded-2xl border border-border bg-bg-secondary/50 p-8">
        <div className="skeleton h-4 w-32 mx-auto mb-4" />
        <div className="skeleton h-48 w-full rounded-xl" />
      </div>
    );
  }

  const tradition = wisdom.book.religion.toLowerCase();

  return (
    <div className="relative">
      <div className="text-center mb-5">
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-accent">
          Daily Wisdom
        </span>
        <p className="text-xs text-text-muted font-body mt-1.5">
          Tap to reveal today&apos;s verse
        </p>
      </div>

      <div
        className="relative cursor-pointer card-perspective"
        role="button"
        tabIndex={0}
        aria-label={
          flipped
            ? "Daily wisdom verse. Press to flip back."
            : "Daily wisdom. Press to reveal today's verse."
        }
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleFlip();
          }
        }}
      >
        <div
          className="relative w-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front — Mandala */}
          <div
            className="w-full rounded-2xl border border-border bg-bg-secondary/80 backdrop-blur-sm p-8 text-center overflow-hidden card-backface-hidden"
          >
            {/* Tradition glow behind mandala */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, var(--tradition-${tradition}-glow) 0%, transparent 70%)`,
              }}
            />

            <div className="relative mx-auto mb-6 h-28 w-28">
              <div
                className="absolute inset-0 animate-spin rounded-full border opacity-40"
                style={{ borderColor: `var(--tradition-${tradition})` }}
              />
              <div
                className="absolute inset-2 animate-spin rounded-full border opacity-30"
                style={{
                  borderColor: `var(--tradition-${tradition})`,
                  animationDirection: "reverse",
                  animationDuration: "3s",
                }}
              />
              <div
                className="absolute inset-4 animate-spin rounded-full border opacity-20"
                style={{
                  borderColor: `var(--tradition-${tradition})`,
                  animationDuration: "5s",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-3xl"
                  style={{ color: `var(--tradition-${tradition})` }}
                >
                  ✦
                </span>
              </div>
            </div>

            <p className="relative text-sm text-text-muted font-body">
              A verse from the{" "}
              <span style={{ color: `var(--tradition-${tradition})` }}>
                {wisdom.book.religion}
              </span>{" "}
              tradition
            </p>

            <div className="relative mt-5 flex items-center justify-center gap-1.5 text-xs text-text-muted/50 font-mono">
              <RefreshCw className="h-3 w-3" />
              Tap to flip
            </div>
          </div>

          {/* Back — Verse */}
          <div
            className="absolute inset-0 w-full rounded-2xl border border-border bg-bg-secondary/80 backdrop-blur-sm p-7 text-center overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Sparkle burst on reveal */}
            {showSparkle && <SparkleEffect tradition={tradition} />}

            {/* Tradition glow */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 30%, var(--tradition-${tradition}-glow) 0%, transparent 60%)`,
              }}
            />

            <div className="relative mb-5">
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background: `var(--tradition-${tradition})`,
                    boxShadow: `0 0 10px var(--tradition-${tradition}-glow)`,
                  }}
                />
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-text-muted">
                  {wisdom.book.title}
                </span>
              </div>
            </div>

            <blockquote className="relative text-text-primary font-serif mb-5">
              &ldquo;{wisdom.verse.translation || wisdom.verse.text}&rdquo;
            </blockquote>

            <p className="relative text-xs text-text-muted/70 font-mono tracking-wide">
              — {wisdom.verse.source.translator} ({wisdom.verse.source.year})
            </p>

            <div className="relative mt-5 flex items-center justify-center gap-1.5 text-xs text-text-muted/50 font-mono">
              <RefreshCw className="h-3 w-3" />
              Tap to flip back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
