import type { Religion } from "@/lib/types";

const r2 = (n: number) => Math.round(n * 100) / 100;

const christianityLines = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
  const rad = (angle * Math.PI) / 180;
  return { x2: r2(100 + 70 * Math.cos(rad)), y2: r2(100 + 70 * Math.sin(rad)) };
});

const buddhismLines = [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
  const rad = (angle * Math.PI) / 180;
  return { x2: r2(100 + 60 * Math.cos(rad)), y2: r2(100 + 60 * Math.sin(rad)) };
});

const buddhismDots = [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
  const rad = (angle * Math.PI) / 180;
  return { cx: r2(100 + 60 * Math.cos(rad)), cy: r2(100 + 60 * Math.sin(rad)) };
});

const patterns: Record<Religion, React.ReactNode> = {
  Hinduism: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="100"
          rx="40"
          ry="15"
          transform={`rotate(${angle} 100 100)`}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.8" />
    </svg>
  ),
  Christianity: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {christianityLines.map((l, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={l.x2}
          y2={l.y2}
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.3"
        />
      ))}
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="100" y1="60" x2="100" y2="140" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="80" y1="90" x2="120" y2="90" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    </svg>
  ),
  Islam: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="100,30 130,70 170,70 140,100 150,140 100,120 50,140 60,100 30,70 70,70"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <rect x="55" y="55" width="90" height="90" transform="rotate(45 100 100)" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <rect x="65" y="65" width="70" height="70" transform="rotate(22.5 100 100)" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.7" />
    </svg>
  ),
  Judaism: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[
        [100, 40], [60, 70], [140, 70], [40, 110], [100, 100], [160, 110],
        [60, 140], [100, 140], [140, 140], [100, 170],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx={x} cy={y} r="3" fill="currentColor" opacity="0.6" />
        </g>
      ))}
      {[[100, 40], [60, 70]].map(([x1, y1], i) => (
        <line key={`l${i}`} x1={x1} y1={y1} x2={100} y2={100} stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      ))}
      {[[140, 70], [40, 110], [160, 110], [60, 140], [140, 140], [100, 170]].map(([x1, y1], i) => (
        <line key={`l2${i}`} x1={x1} y1={y1} x2={100} y2={100} stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      ))}
    </svg>
  ),
  Sikhism: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="100" y1="40" x2="100" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <path d="M 85 60 Q 70 100 85 140" stroke="currentColor" strokeWidth="1.5" opacity="0.5" fill="none" />
      <path d="M 115 60 Q 130 100 115 140" stroke="currentColor" strokeWidth="1.5" opacity="0.5" fill="none" />
      <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.7" />
    </svg>
  ),
  Buddhism: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="100" cy="100" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.7" />
      {buddhismLines.map((l, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={l.x2}
          y2={l.y2}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
      {buddhismDots.map((d, i) => (
        <circle
          key={`d${i}`}
          cx={d.cx}
          cy={d.cy}
          r="4"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
    </svg>
  ),
};

export default function SacredGeometry({ religion }: { religion: Religion }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-current opacity-[0.07]">
      <div className="w-[200px] h-[200px]">
        {patterns[religion]}
      </div>
    </div>
  );
}
