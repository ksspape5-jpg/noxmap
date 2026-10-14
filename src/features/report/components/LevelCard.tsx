import { Check } from "lucide-react";
import { levelMeta, type Level } from "@/shared/flood";
import "./LevelCard.css";

type LevelCardProps = { level: Level; selected: boolean; onClick: () => void };

export default function LevelCard({ level, selected, onClick }: LevelCardProps) {
  const meta = levelMeta[level];
  return (
    <button className={`level-card ${selected ? "selected" : ""} ${level === "waist" ? "critical" : ""}`} onClick={onClick}>
      <span className="water-figure">
        <i className={`water-line ${level}`} />
        <span />
      </span>
      <span className="level-copy">
        <b>{meta.short}</b>
        <small>{meta.help}</small>
        {level === "waist" && <em>Point noir</em>}
      </span>
      <span className="select-circle">{selected && <Check size={15} />}</span>
    </button>
  );
}
