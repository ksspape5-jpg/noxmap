import { Waves } from "lucide-react";
import { LevelBadge, reports } from "@/shared/flood";
import { Filters } from "@/shared/ui";

type ReportsPanelProps = {
  filter: string;
  onFilterChange: (filter: string) => void;
  selected: number | null;
  onSelect: (id: number) => void;
};

export default function ReportsPanel({ filter, onFilterChange, selected, onSelect }: ReportsPanelProps) {
  return (
    <aside className="reports-panel">
      <div className="panel-head">
        <p className="eyebrow">Carte citoyenne</p>
        <h1>Points actifs</h1>
        <p><span className="live-dot" /> 72 signalements · données démo</p>
      </div>
      <Filters active={filter} onChange={onFilterChange} />
      <div className="report-list">
        {reports.map((report) => (
          <button key={report.id} className={selected === report.id ? "active" : ""} onClick={() => onSelect(report.id)}>
            <span className={`list-marker ${report.level}`}><Waves size={15} /></span>
            <span><b>{report.place}</b><small>{report.detail}</small><em>{report.time}</em></span>
            <LevelBadge level={report.level} />
          </button>
        ))}
      </div>
    </aside>
  );
}
