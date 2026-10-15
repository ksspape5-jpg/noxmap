import { Check } from "lucide-react";
import { levelMeta, type Level } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import WaterFigure from "./WaterFigure";

const LEVEL_ACCENT: Record<Level, string> = {
  ankle: "border-ankle/40 bg-ankle/5 hover:border-ankle hover:bg-ankle/8",
  knee: "border-knee/40 bg-knee/5 hover:border-knee hover:bg-knee/8",
  waist: "border-waist/40 bg-waist/5 hover:border-waist/60 hover:bg-waist/10",
};

const LEVEL_ACCENT_SELECTED: Record<Level, string> = {
  ankle: "border-ankle bg-ankle/10 ring-2 ring-ankle/20",
  knee: "border-knee bg-knee/10 ring-2 ring-knee/20",
  waist: "border-waist bg-waist/10 ring-2 ring-waist/25",
};

const CHECK_COLOR: Record<Level, string> = {
  ankle: "border-ankle bg-ankle text-white",
  knee: "border-knee bg-knee text-white",
  waist: "border-waist bg-waist text-white",
};

const CRITICAL_BADGE_CLASSES =
  "mt-1.5 w-fit rounded-full bg-waist px-2 py-0.75 text-[8px] font-extrabold tracking-[.06em] text-white not-italic uppercase";

type LevelCardProps = { level: Level; selected: boolean; onClick: () => void };

export default function LevelCard({ level, selected, onClick }: LevelCardProps) {
  const meta = levelMeta[level];
  const critical = level === "waist";
  return (
    <button
      className={cn(
        "group grid w-full grid-cols-[80px_1fr_auto] items-center gap-4 rounded-2xl border-2 p-3.5 text-left",
        "transition-all duration-250 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,.06)]",
        "active:translate-y-0 active:shadow-none",
        selected ? LEVEL_ACCENT_SELECTED[level] : LEVEL_ACCENT[level],
        "max-md:grid-cols-[72px_1fr_auto] max-md:gap-3",
      )}
      onClick={onClick}
    >
      <WaterFigure level={level} />
      <span className="flex flex-col gap-0.5">
        <b className="text-[15px] leading-snug tracking-tight">{meta.short}</b>
        <small className="text-[11px] leading-relaxed text-muted">{meta.help}</small>
        {critical && <em className={CRITICAL_BADGE_CLASSES}>Point noir</em>}
      </span>
      <span
        className={cn(
          "grid size-7 flex-none place-items-center rounded-full border-2 transition-all duration-200",
          selected ? CHECK_COLOR[level] : "border-border-strong bg-white",
        )}
      >
        {selected && <Check size={15} strokeWidth={3} />}
      </span>
    </button>
  );
}
