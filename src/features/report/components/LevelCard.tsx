import { Check } from "lucide-react";
import { levelMeta, type Level } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import WaterFigure from "./WaterFigure";

const CARD_CLASSES = cn(
  "grid min-h-24.5 w-full grid-cols-[72px_1fr_auto] items-center gap-3.5 rounded-[14px] border border-border bg-white p-3 text-left",
  "hover:border-primary hover:ring-2 hover:ring-primary-soft",
  "max-md:min-h-23.5 max-md:grid-cols-[65px_1fr_auto]",
);

type LevelCardProps = { level: Level; selected: boolean; onClick: () => void };

export default function LevelCard({ level, selected, onClick }: LevelCardProps) {
  const meta = levelMeta[level];
  const critical = level === "waist";
  return (
    <button
      className={cn(
        CARD_CLASSES,
        selected && "border-primary ring-2 ring-primary-soft",
        // La bordure du point noir reste visible, même survolé ou sélectionné.
        critical && "border-[#bdaeb0] bg-[#fdfafa] hover:border-[#bdaeb0]",
      )}
      onClick={onClick}
    >
      <WaterFigure level={level} />
      <span className="flex flex-col">
        <b className="text-sm">{meta.short}</b>
        <small className="mt-1.25 text-[10px] text-muted">{meta.help}</small>
        {critical && (
          <em className="mt-1.5 w-fit rounded-full bg-waist px-1.5 py-1 text-[8px] font-extrabold tracking-[.06em] text-white not-italic uppercase">
            Point noir
          </em>
        )}
      </span>
      <span
        className={cn(
          "grid size-5.75 place-items-center rounded-full border border-border-strong text-white",
          selected && "border-primary bg-primary",
        )}
      >
        {selected && <Check size={15} />}
      </span>
    </button>
  );
}
