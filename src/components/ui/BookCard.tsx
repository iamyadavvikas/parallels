"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Book } from "@/lib/types";
import SacredGeometry from "./SacredGeometry";

const traditionThemes: Record<string, string> = {
  Hinduism: "Dharma",
  Christianity: "Covenant",
  Islam: "Tawhid",
  Judaism: "Tikkun",
  Sikhism: "Seva",
  Buddhism: "Nirvana",
};

const traditionIcons: Record<string, string> = {
  Hinduism: "\u{1F549}",
  Christianity: "\u271D",
  Islam: "\u262A",
  Judaism: "\u2721",
  Sikhism: "\u262B",
  Buddhism: "\u2638",
};

const coverGradients: Record<string, string> = {
  Hinduism: "linear-gradient(160deg, #2A1008 0%, #5C2210 30%, #D45A28 65%, #FF7A3A 85%, #FFAA70 100%)",
  Christianity: "linear-gradient(160deg, #081428 0%, #103060 30%, #3880C0 65%, #5AA8E8 85%, #88CCFF 100%)",
  Islam: "linear-gradient(160deg, #081E10 0%, #104828 30%, #289050 65%, #40C070 85%, #70E8A0 100%)",
  Judaism: "linear-gradient(160deg, #120828 0%, #281060 30%, #6838C0 65%, #8850E8 85%, #B080FF 100%)",
  Sikhism: "linear-gradient(160deg, #1A1408 0%, #403010 30%, #B08810 65%, #E0B020 85%, #FFE060 100%)",
  Buddhism: "linear-gradient(160deg, #1E0C08 0%, #482018 30%, #B05838 65%, #D87050 85%, #F0A080 100%)",
};

export default function BookCard({ book }: { book: Book }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const theme = traditionThemes[book.religion] || "";
  const icon = traditionIcons[book.religion] || "\u2726";
  const tradition = book.religion.toLowerCase();

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }

  return (
    <div ref={cardRef} data-tradition={tradition}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative" style={{ perspective: "1200px" }}>
      <Link href={`/books/${book.slug}`} className="block">
        <div className="vault-tile relative w-full rounded-2xl overflow-hidden transition-all duration-500 ease-out"
          data-tradition={tradition}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            boxShadow: isHovered
              ? `0 25px 80px var(--color-shadow-lg), 0 0 60px var(--tradition-${tradition}-glow), 0 0 100px var(--tradition-${tradition}-glow)`
              : "0 2px 12px var(--color-shadow-sm), 0 0 30px rgba(0,0,0,0.2)",
          }}>

          {/* COVER IMAGE */}
          <div className="relative w-full aspect-[3/4] overflow-hidden"
            style={{ background: coverGradients[book.religion] || coverGradients.Hinduism }}>

            {/* Sacred geometry pattern */}
            <div className="absolute inset-0 flex items-center justify-center opacity-15 transition-opacity duration-700 group-hover:opacity-30"
              style={{ color: `var(--tradition-${tradition})` }}>
              <div className="w-[140%] h-[140%]">
                <SacredGeometry religion={book.religion} />
              </div>
            </div>

            {/* Decorative border frame */}
            <div className="absolute inset-3 rounded-lg border border-white/[0.15] pointer-events-none" />
            <div className="absolute inset-5 rounded-md border border-white/[0.10] pointer-events-none" />

            {/* Top decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Central icon with orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/[0.25] bg-white/[0.15] backdrop-blur-sm transition-all duration-700 group-hover:scale-110 group-hover:border-white/20"
                  style={{ boxShadow: `0 0 40px var(--tradition-${tradition}-glow), 0 0 80px var(--tradition-${tradition}-glow)` }}>
                  <span className="text-4xl">{icon}</span>
                </div>
                <div className="absolute -inset-6 rounded-full border border-white/[0.12] transition-all duration-700 group-hover:scale-110 group-hover:border-white/20" />
                <div className="absolute -inset-10 rounded-full border border-white/[0.08] transition-all duration-700 group-hover:scale-105" />
              </div>
            </div>

            {/* Religion label */}
            <div className="absolute top-6 left-0 right-0 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-[9px] font-mono tracking-[0.3em] uppercase text-white/70 bg-white/[0.15] backdrop-blur-sm border border-white/[0.15]">
                {book.religion}
              </span>
            </div>

            {/* Shimmer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 60%)",
                backgroundSize: "250% 100%",
              }} />

            {/* Bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--color-bg-primary,#0a0a12)] via-[var(--color-bg-primary,#0a0a12)_at_80%] to-transparent" />

            {/* Title + stats at bottom of cover */}
            <div className="absolute bottom-0 left-0 right-0 p-5 pb-4 text-center">
              <h3 className="text-lg font-bold text-white font-display tracking-tight mb-1.5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                {book.title}
              </h3>
              <p className="text-[10px] text-white/40 font-mono tracking-wider mb-2">
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="h-1 w-8 rounded-full" style={{ background: `var(--tradition-${tradition})`, opacity: 0.8 }} />
                <span className="text-[10px] italic text-white/70 font-serif">{theme}</span>
                <span className="h-1 w-8 rounded-full" style={{ background: `var(--tradition-${tradition})`, opacity: 0.8 }} />
              </div>
            </div>
          </div>



          {/* Edge glow */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
            style={{
              border: `1px solid var(--tradition-${tradition})`,
              opacity: isHovered ? 0.5 : 0,
              boxShadow: isHovered ? `inset 0 0 24px var(--tradition-${tradition}-glow)` : "none",
            }} />

          {/* Embers */}
          <div className="ember-particle" />
          <div className="ember-particle" />
          <div className="ember-particle" />
          <div className="ember-particle" />
          <div className="ember-particle" />
        </div>
      </Link>
    </div>
  );
}
