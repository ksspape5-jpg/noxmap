import { Download, FileJson, FileText, TrendingUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { DemoBadge, Filters } from "@/shared/ui";
import type { RankMetric } from "../rankingData";

const METRICS: { key: RankMetric; label: string }[] = [
  { key: "volume", label: "Volume" },
  { key: "severity", label: "Gravité" },
  { key: "waist", label: "Taille" },
  { key: "knee", label: "Genou" },
  { key: "ankle", label: "Cheville" },
];

const CHIP =
  "inline-flex min-h-9.5 items-center gap-1.5 rounded-full border border-border bg-white px-3 text-[10px] font-bold whitespace-nowrap text-muted";
const CHIP_ACTIVE = "border-primary bg-primary-soft text-primary-dark";
const EXPORT =
  "inline-flex min-h-9.5 items-center gap-1.5 rounded-[10px] border border-border bg-white px-3 text-[10px] font-bold text-primary hover:border-primary hover:bg-primary-soft";

type RankingToolbarProps = {
  filter: string;
  onFilterChange: (filter: string) => void;
  metric: RankMetric;
  onMetricChange: (metric: RankMetric) => void;
  recurringOnly: boolean;
  onRecurringToggle: () => void;
  onExportCsv: () => void;
  onExportGeoJson: () => void;
  onExportPdf: () => void;
};

export default function RankingToolbar(props: RankingToolbarProps) {
  return (
    <div className="mb-3.75 flex flex-wrap items-center justify-between gap-3 max-md:flex-col max-md:items-stretch max-md:gap-2.25 print:hidden">
      <Filters className="max-w-82.5 flex-[1_1_240px] max-md:max-w-none" active={props.filter} onChange={props.onFilterChange} />
      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Indicateur affiché">
        {METRICS.map((option) => (
          <button
            key={option.key}
            className={cn(CHIP, props.metric === option.key && CHIP_ACTIVE)}
            onClick={() => props.onMetricChange(option.key)}
          >
            {option.label}
          </button>
        ))}
        <button className={cn(CHIP, props.recurringOnly && CHIP_ACTIVE)} onClick={props.onRecurringToggle}>
          <TrendingUp size={14} /> Zones récurrentes
        </button>
      </div>
      <div className="ml-auto flex items-center gap-2 max-md:ml-0 max-md:flex-wrap">
        <DemoBadge />
        <button className={EXPORT} onClick={props.onExportCsv}>
          <Download size={15} /> CSV
        </button>
        <button className={EXPORT} onClick={props.onExportGeoJson}>
          <FileJson size={15} /> GeoJSON
        </button>
        <button className={EXPORT} onClick={props.onExportPdf}>
          <FileText size={15} /> PDF
        </button>
      </div>
    </div>
  );
}
