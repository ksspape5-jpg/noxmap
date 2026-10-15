import { LEVEL_BG, type Level } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";

// Hauteur de l'eau sur la silhouette selon le niveau.
const WATER_BOTTOM: Record<Level, string> = {
  ankle: "h-[25%]",
  knee: "h-[50%]",
  waist: "h-[72%]",
};

const WATER_GLOW: Record<Level, string> = {
  ankle: "shadow-[0_-4px_12px_rgba(242,194,48,0.4)]",
  knee: "shadow-[0_-4px_12px_rgba(232,89,12,0.4)]",
  waist: "shadow-[0_-4px_12px_rgba(43,10,15,0.4)]",
};

// Silhouette : corps arrondi + tête en `::before`.
const SILHOUETTE_CLASSES = cn(
  "absolute top-3.5 left-1/2 -translate-x-1/2 h-[52px] w-[16px] rounded-[10px_10px_5px_5px] bg-[#8b7565]",
  "before:absolute before:-top-[9px] before:left-1/2 before:-translate-x-1/2 before:size-[10px] before:rounded-full before:bg-[#8b7565]",
);

export default function WaterFigure({ level }: { level: Level }) {
  return (
    <span className="relative flex h-[80px] w-[72px] items-end overflow-hidden rounded-xl bg-gradient-to-b from-[#f0ece6] to-[#e4dfd6]">
      {/* Water fill */}
      <i
        className={cn(
          "absolute inset-x-0 bottom-0 z-2 transition-all duration-500 ease-out",
          LEVEL_BG[level],
          WATER_BOTTOM[level],
          WATER_GLOW[level],
          "opacity-85",
        )}
      />
      {/* Animated wave crest */}
      <i
        className={cn(
          "absolute inset-x-0 z-3 h-[8px] transition-all duration-500 ease-out",
          LEVEL_BG[level],
          "opacity-60",
          level === "ankle" && "bottom-[calc(25%-4px)]",
          level === "knee" && "bottom-[calc(50%-4px)]",
          level === "waist" && "bottom-[calc(72%-4px)]",
          "[clip-path:polygon(0_60%,10%_20%,20%_60%,30%_20%,40%_60%,50%_20%,60%_60%,70%_20%,80%_60%,90%_20%,100%_60%,100%_100%,0_100%)]",
          "animate-[wave_2s_ease-in-out_infinite]",
        )}
      />
      {/* Silhouette */}
      <span className={SILHOUETTE_CLASSES} />
    </span>
  );
}
