import { useState } from "react";
import { ChevronDown, Layers3 } from "lucide-react";
import { LEVELS, levelMeta } from "@/shared/flood";

export default function Legend() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`map-legend ${open ? "open" : ""}`}>
      <button onClick={() => setOpen(!open)}><Layers3 size={17} /> Légende <ChevronDown size={16} /></button>
      {open && (
        <div>
          {LEVELS.map((level) => (
            <span key={level}>
              <i className={`legend-dot ${level}`} />
              <b>{levelMeta[level].short}</b>
              {level === "waist" && <small>Point noir</small>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
