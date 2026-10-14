import { Waves } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { levelMeta } from "./levels";
import type { Level } from "./types";

const BADGE_COLORS: Record<Level, string> = {
  ankle: "bg-ankle-soft text-ankle-ink",
  knee: "bg-knee-soft text-knee-ink",
  waist: "bg-waist text-white",
};

export default function LevelBadge({ level, className }: { level: Level; className?: string }) {
  return (
    <span
      className={cn(
        "level-badge inline-flex items-center gap-1 rounded-full px-1.75 py-1.25 text-[9px] font-extrabold whitespace-nowrap",
        BADGE_COLORS[level],
        className,
      )}
    >
      <Waves size={14} />
      {levelMeta[level].short}
    </span>
  );
}
