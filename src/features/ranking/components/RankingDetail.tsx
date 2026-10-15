import { Map as MapIcon, Plus, TrendingUp, X } from "lucide-react";
import { LEVEL_BG, LEVELS, levelMeta } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import { Button, Eyebrow, IconButton } from "@/shared/ui";
import { seasonDelta, type RankRow } from "../rankingData";
import Sparkline from "./Sparkline";

const CAPTION = "text-[9px] font-extrabold tracking-[.08em] text-muted uppercase";
const TAG = "rounded-full px-1.75 py-1 text-[8px] font-extrabold tracking-[.05em] uppercase";

type RankingDetailProps = {
  detail: RankRow;
  total: number;
  unit: string;
  onClose: () => void;
  onShowOnMap: () => void;
  onReport: () => void;
};

export default function RankingDetail({ detail, total, unit, onClose, onShowOnMap, onReport }: RankingDetailProps) {
  const delta = seasonDelta(detail);
  return (
    <aside className="sticky top-22.5 flex flex-col gap-3.5 rounded-[18px] border border-border bg-white p-5.5 max-md:static print:hidden">
      <IconButton className="absolute top-2.5 right-2.5 text-muted" aria-label="Fermer le détail" onClick={onClose}>
        <X size={17} />
      </IconButton>
      <div>
        <Eyebrow>Détail du quartier</Eyebrow>
        <h2 className="text-2xl tracking-[-.03em]">{detail.name}</h2>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {detail.black && <span className={cn(TAG, "bg-waist text-white")}>Point noir</span>}
        {detail.recurring && <span className={cn(TAG, "bg-ankle-soft text-ankle-ink")}>Zone récurrente</span>}
      </div>
      <div className="flex flex-col">
        <b className="text-[34px] leading-none tracking-[-.04em]">{detail.value}</b>
        <span className="mt-1 text-[10px] text-muted">
          {unit} · {total > 0 ? Math.round((detail.value / total) * 100) : 0} % du total
        </span>
      </div>
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl px-3 py-2.5 text-[10px] font-semibold",
          delta >= 0 ? "bg-danger-soft text-danger" : "bg-primary-soft text-primary-dark",
        )}
      >
        <TrendingUp size={15} />
        <span>
          <b className="text-xs">{delta >= 0 ? `+${delta}` : delta} %</b> vs saison précédente ({detail.previous} signalements)
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className={CAPTION}>Évolution sur 7 jours</span>
        <Sparkline data={detail.history} />
      </div>
      <div className="mt-0.5 mb-1 flex flex-col gap-2">
        <span className={CAPTION}>Répartition par niveau (24 h)</span>
        {LEVELS.map((level) => {
          const value = detail.levels[level];
          const pct = detail.counts.day > 0 ? Math.round((value / detail.counts.day) * 100) : 0;
          return (
            <span key={level} className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 text-[10px]">
              <i className={cn("size-2.5 rounded-full", LEVEL_BG[level])} />
              <b className="min-w-13">{levelMeta[level].short}</b>
              <span className="h-1.75 overflow-hidden rounded-full bg-subtle">
                <i className={cn("block h-full rounded-full", LEVEL_BG[level])} style={{ width: `${pct}%` }} />
              </span>
              <small className="min-w-4.5 text-right font-bold text-muted">{value}</small>
            </span>
          );
        })}
      </div>
      <Button className="w-full" onClick={onShowOnMap}>
        <MapIcon size={17} /> Voir sur la carte
      </Button>
      <Button variant="secondary" className="w-full" onClick={onReport}>
        <Plus size={17} /> Signaler ici
      </Button>
    </aside>
  );
}
