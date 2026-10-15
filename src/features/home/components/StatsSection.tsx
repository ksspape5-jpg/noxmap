import { TrendingUp } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { DemoBadge } from "@/shared/ui";

const STATS = [
  { value: "72", label: "signalements actifs", note: "+16 depuis ce matin", trend: true },
  { value: "5", label: "quartiers touchés", note: "sur la zone de démo" },
  { value: "8 min", label: "dernier point noir", note: "Keur Massar" },
  { value: "18", label: "points confirmés", note: "par plusieurs habitants" },
];

// Bordures internes : 4 colonnes sur desktop, grille 2×2 sur mobile.
const STAT_CLASSES = cn(
  "flex flex-col border-r border-border p-6 last:border-0",
  "max-md:border-b max-md:p-4.5 max-md:nth-2:border-r-0 max-md:nth-[n+3]:border-b-0",
);

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-310 px-6 pb-16 max-md:px-4.5 max-md:pb-8.5">
      <div className="mb-3.5 flex items-center justify-between text-[11px] text-muted">
        <span>La situation aujourd'hui</span>
        <DemoBadge />
      </div>
      <div className="grid grid-cols-4 overflow-hidden rounded-[18px] border border-border bg-white max-md:grid-cols-2">
        {STATS.map(({ value, label, note, trend }) => (
          <div key={label} className={STAT_CLASSES}>
            <strong className="text-[28px] tracking-[-.04em] max-md:text-2xl">{value}</strong>
            <span className="mt-0.75 mb-3.5 text-xs text-muted max-md:text-[10px]">{label}</span>
            <small className="flex items-center gap-1.25 text-[10px] text-success">
              {trend && <TrendingUp size={13} />}
              {note}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}
