import { ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { DistrictRank } from "../rankingData";

type RankItemProps = { item: DistrictRank; index: number; onClick: () => void };

export default function RankItem({ item, index, onClick }: RankItemProps) {
  return (
    <button
      className={cn(
        "grid min-h-24.5 w-full grid-cols-[40px_1fr_85px_auto] items-center gap-3.5 border-b border-border bg-white px-4.5 py-4 text-left last:border-0 hover:bg-canvas",
        "max-md:min-h-26 max-md:grid-cols-[34px_1fr_62px] max-md:gap-2 max-md:px-2.75 max-md:py-3.5",
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "text-[13px] font-extrabold text-[#8d9995]",
          index < 3 && "grid size-8.5 place-items-center rounded-[10px] bg-primary-soft text-primary",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="flex flex-col">
        <span className="flex items-center gap-1.75 max-md:flex-col max-md:items-start max-md:gap-1">
          <b className="text-[13px] max-md:text-xs">{item.name}</b>
          {item.recurring && (
            <em className="rounded-full bg-ankle-soft px-1.5 py-1 text-[8px] font-extrabold text-ankle-ink uppercase not-italic">
              Zone récurrente
            </em>
          )}
        </span>
        <span className="mt-2.5 mb-1.25 h-1.5 overflow-hidden rounded-full bg-subtle">
          <i className="block h-full max-w-full rounded-full bg-primary" style={{ width: `${item.count * 4}%` }} />
        </span>
        <small className="flex items-center gap-1 text-[9px] text-success">
          <TrendingUp size={13} /> {item.trend}
        </small>
      </span>
      <span className="flex flex-col items-end">
        <b className="text-xl max-md:text-[17px]">{item.count}</b>
        <small className="text-[8px] text-muted">signalements</small>
        {item.black && <em className="mt-1.25 text-[8px] font-extrabold text-waist not-italic">Point noir</em>}
      </span>
      <ArrowRight size={18} className="max-md:hidden" />
    </button>
  );
}
