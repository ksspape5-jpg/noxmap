import { LEVEL_BG, type Level } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";

const MAP_CLASSES = cn(
  "relative h-105 overflow-hidden rounded-3xl border-6 border-white bg-primary-soft shadow-[0_28px_70px_rgba(33,57,50,.2)]",
  "max-md:h-77.5 max-md:rounded-[18px]",
  // Quadrillage de fond
  "before:absolute before:inset-0 before:bg-size-[28px_28px] before:opacity-45 before:content-['']",
  "before:bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)]",
  // Filigrane « DAKAR »
  "after:absolute after:top-5.5 after:right-6 after:text-[46px] after:font-extrabold after:tracking-[.1em] after:text-primary/12",
  "after:content-['DAKAR'] max-md:after:text-[30px]",
);

const ROAD_CLASSES = "absolute z-1 h-4 w-[130%] origin-left border border-border bg-white";
const ROADS = ["top-[28%] -left-[10%] rotate-12", "top-[65%] -left-[12%] -rotate-17", "top-[8%] left-[44%] w-[90%] rotate-74"];

const DISTRICTS = [
  { name: "Pikine", position: "top-[35%] left-[15%]" },
  { name: "Keur Massar", position: "top-[22%] right-[16%]" },
  { name: "Thiaroye", position: "bottom-[22%] left-[37%]" },
];

const MARKER_CLASSES = cn(
  "absolute z-3 grid -rotate-45 place-items-center rounded-[50%_50%_50%_8px] border-4 border-white",
  "font-extrabold text-white shadow-[0_4px_12px_rgba(0,0,0,.2)]",
);
const MARKERS: { level: Level; label: string; className: string }[] = [
  { level: "knee", label: "2", className: "top-[24%] left-[22%] size-9.5" },
  { level: "waist", label: "!", className: "top-[40%] right-[25%] size-13" },
  { level: "ankle", label: "1", className: "bottom-[18%] left-[44%] size-7.75" },
];

export default function MiniMapVisual() {
  return (
    <div className={MAP_CLASSES} role="img" aria-label="Aperçu de la carte des signalements : 72 points actifs, mis à jour il y a 4 minutes">
      {ROADS.map((position) => (
        <div key={position} className={cn(ROAD_CLASSES, position)} />
      ))}
      {DISTRICTS.map(({ name, position }) => (
        <span key={name} className={cn("absolute z-2 text-[10px] font-bold tracking-[.08em] text-muted/80 uppercase", position)}>
          {name}
        </span>
      ))}
      {MARKERS.map(({ level, label, className }) => (
        <span key={level} className={cn(MARKER_CLASSES, LEVEL_BG[level], className)}>{label}</span>
      ))}
      <div className="absolute bottom-4.5 left-4.5 z-5 flex flex-col rounded-[14px] bg-white/94 px-4 py-3.25 shadow-[0_10px_25px_rgba(0,0,0,.12)] max-md:bottom-3 max-md:left-3">
        <b className="text-[13px]">72 points actifs</b>
        <span className="mt-0.75 text-[10px] text-muted">Mis à jour il y a 4 min</span>
      </div>
    </div>
  );
}
