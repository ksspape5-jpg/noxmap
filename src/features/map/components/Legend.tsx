import { useState } from "react";
import { ChevronDown, Layers3 } from "lucide-react";
import { LEVEL_BG, LEVELS, levelMeta, type Level } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";

// Taille de la pastille : proportionnelle à la gravité, comme les marqueurs de la carte.
const DOT_SIZE: Record<Level, string> = {
  ankle: "size-2.5",
  knee: "size-3.5",
  waist: "size-4.5",
};

export default function Legend({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "absolute bottom-6 left-4.5 z-400 min-w-37.5 overflow-hidden rounded-xl bg-white/96 shadow-[0_5px_20px_rgba(0,0,0,.13)]",
        "max-md:bottom-23 max-md:left-3",
        className,
      )}
    >
      <button
        className="flex min-h-10.5 w-full items-center gap-1.75 bg-white px-3 text-[11px] font-bold"
        onClick={() => setOpen(!open)}
      >
        <Layers3 size={17} /> Légende <ChevronDown size={16} className="ml-auto" />
      </button>
      {open && (
        <div className="flex flex-col gap-2 px-3 pb-2.5">
          {LEVELS.map((level) => (
            <span key={level} className="flex items-center gap-1.75 text-[9px]">
              <i
                className={cn(
                  "rounded-full border-2 border-white shadow-[0_0_0_1px_#899]",
                  LEVEL_BG[level],
                  DOT_SIZE[level],
                )}
              />
              <b>{levelMeta[level].short}</b>
              {level === "waist" && <small className="ml-auto text-muted">Point noir</small>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
