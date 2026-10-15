import { LEVEL_BG, type Level } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";

// Hauteur de l'eau sur la silhouette selon le niveau.
const WATER_BOTTOM: Record<Level, string> = {
  ankle: "bottom-2",
  knee: "bottom-6.75",
  waist: "bottom-11.5",
};

// Crête de vague dessinée au-dessus de la ligne d'eau (même couleur que la ligne).
const WAVE_CLASSES = cn(
  "before:absolute before:inset-x-0 before:-top-1 before:bottom-0 before:bg-inherit",
  "before:[clip-path:polygon(0_45%,12%_10%,25%_45%,38%_10%,52%_45%,67%_10%,82%_45%,100%_10%,100%_100%,0_100%)]",
);

// Silhouette : corps arrondi + tête en `::before`.
const SILHOUETTE_CLASSES = cn(
  "absolute top-3 left-7.25 h-13 w-3.75 rounded-[9px_9px_4px_4px] bg-[#927967]",
  "before:absolute before:-top-2 before:left-0.75 before:size-2.25 before:rounded-full before:bg-[#927967]",
);

export default function WaterFigure({ level }: { level: Level }) {
  return (
    <span className="relative block h-18 overflow-hidden rounded-[10px] bg-subtle">
      <i className={cn("absolute inset-x-0 z-2 h-1.75 opacity-90", WAVE_CLASSES, LEVEL_BG[level], WATER_BOTTOM[level])} />
      <span className={SILHOUETTE_CLASSES} />
    </span>
  );
}
