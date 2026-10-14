import "./Filters.css";

const PERIODS = ["Dernière heure", "Aujourd'hui", "7 jours"];

type FiltersProps = { active: string; onChange: (filter: string) => void };

export default function Filters({ active, onChange }: FiltersProps) {
  return (
    <div className="filters" role="group" aria-label="Période">
      {PERIODS.map((filter) => (
        <button key={filter} className={active === filter ? "active" : ""} onClick={() => onChange(filter)}>
          {filter}
        </button>
      ))}
    </div>
  );
}
