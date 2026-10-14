import { ArrowRight, TrendingUp } from "lucide-react";
import type { DistrictRank } from "../rankingData";

type RankItemProps = { item: DistrictRank; index: number; onClick: () => void };

export default function RankItem({ item, index, onClick }: RankItemProps) {
  return (
    <button className="rank-item" onClick={onClick}>
      <span className={`rank-number ${index < 3 ? "top" : ""}`}>{String(index + 1).padStart(2, "0")}</span>
      <span className="rank-main">
        <span className="rank-title"><b>{item.name}</b>{item.recurring && <em>Zone récurrente</em>}</span>
        <span className="bar-track"><i style={{ width: `${item.count * 4}%` }} /></span>
        <small><TrendingUp size={13} /> {item.trend}</small>
      </span>
      <span className="rank-count"><b>{item.count}</b><small>signalements</small>{item.black && <em>Point noir</em>}</span>
      <ArrowRight size={18} />
    </button>
  );
}
