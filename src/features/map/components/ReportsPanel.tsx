import { Waves } from "lucide-react";
import { LEVEL_BG, LevelBadge, reports } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import { Eyebrow, Filters } from "@/shared/ui";
import LiveDot from "./LiveDot";

type ReportsPanelProps = {
  filter: string;
  onFilterChange: (filter: string) => void;
  selected: number | null;
  onSelect: (id: number) => void;
};

const ITEM_CLASSES =
  "grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 border-b border-border bg-white px-4.5 py-4 text-left hover:bg-canvas";
const ITEM_META_CLASSES = "mt-0.75 truncate text-[9px] text-muted not-italic";

// Liste latérale des signalements (masquée sur mobile).
export default function ReportsPanel({ filter, onFilterChange, selected, onSelect }: ReportsPanelProps) {
  return (
    <aside className="z-500 flex min-w-0 flex-col overflow-hidden border-r border-border bg-white max-md:hidden">
      <div className="px-5.5 pt-6 pb-3.5">
        <Eyebrow>Carte citoyenne</Eyebrow>
        <h1 className="text-[26px] tracking-[-.04em]">Points actifs</h1>
        <p className="mt-1.75 text-[10px] text-muted"><LiveDot /> 72 signalements · données démo</p>
      </div>
      <Filters className="mx-5 mb-3.5" active={filter} onChange={onFilterChange} />
      <div className="overflow-y-auto border-t border-border">
        {reports.map((report) => (
          <button
            key={report.id}
            className={cn(ITEM_CLASSES, selected === report.id && "bg-canvas")}
            onClick={() => onSelect(report.id)}
          >
            <span className={cn("grid size-7.75 place-items-center rounded-[10px] text-white", LEVEL_BG[report.level])}>
              <Waves size={15} />
            </span>
            <span className="flex min-w-0 flex-col">
              <b className="text-xs">{report.place}</b>
              <small className={ITEM_META_CLASSES}>{report.detail}</small>
              <em className={ITEM_META_CLASSES}>{report.time}</em>
            </span>
            <LevelBadge level={report.level} />
          </button>
        ))}
      </div>
    </aside>
  );
}
