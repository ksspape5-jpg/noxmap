import { cn } from "@/shared/lib/cn";

const PERIODS = ["Dernière heure", "Aujourd'hui", "7 jours"];

type FiltersProps = { active: string; onChange: (filter: string) => void; className?: string };

export default function Filters({ active, onChange, className }: FiltersProps) {
  return (
    <div className={cn("filters flex rounded-xl bg-subtle p-1", className)} role="group" aria-label="Période">
      {PERIODS.map((filter) => (
        <button
          key={filter}
          className={cn(
            "min-h-9.5 flex-1 rounded-[9px] border-0 bg-transparent text-[10px] font-bold whitespace-nowrap text-muted",
            active === filter && "bg-white text-primary-dark shadow-[0_2px_8px_rgba(31,54,47,.1)]",
          )}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
