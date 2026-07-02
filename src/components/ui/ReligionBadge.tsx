import { religionBadgeColors, religionDotColors } from "@/lib/utils";
import type { Religion } from "@/lib/types";

export default function ReligionBadge({ religion }: { religion: Religion }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase ${religionBadgeColors[religion]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${religionDotColors[religion]}`} />
      {religion}
    </span>
  );
}
