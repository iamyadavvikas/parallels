"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
  const h = size;
  const w = size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Parallels logo"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.5" />
        </linearGradient>
        <filter id="logo-glow" x="-4" y="-4" width="40" height="40">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#logo-glow)">
        {/* Left line — shorter */}
        <rect x="6" y="8" width="2.2" height="16" rx="1.1" fill="url(#logo-grad)" opacity="0.7" />
        {/* Center line — tallest */}
        <rect x="14.9" y="4" width="2.2" height="24" rx="1.1" fill="url(#logo-grad)" />
        {/* Right line — medium */}
        <rect x="23.8" y="10" width="2.2" height="12" rx="1.1" fill="url(#logo-grad)" opacity="0.7" />
        {/* Connecting arcs */}
        <path d="M7.1 16 Q11 13 16 12" stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round" />
        <path d="M16 20 Q20 19 24.9 16" stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
