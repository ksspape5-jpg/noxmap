import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CloudRain, X } from "lucide-react";
import { Button, IconButton } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";

export default function WeatherAlert() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  if (!visible) return null;
  return (
    <aside
      className={cn(
        "relative flex min-h-16 items-center gap-4.5 bg-weather-soft px-page py-2.5 text-weather-ink",
        "max-md:min-h-17.5 max-md:pr-10.5 max-md:pl-3.5 print:hidden",
      )}
    >
      <div className="flex flex-1 items-center gap-3 max-md:items-start">
        <CloudRain size={22} className="flex-none" />
        <div className="flex items-baseline gap-3 max-md:flex-col max-md:gap-0.5">
          <b className="text-[13px] max-md:text-[10px]">Vigilance pluie — simulation</b>
          <span className="text-xs leading-normal max-md:text-[9px] max-md:leading-[1.4]">
            Forte pluie prévue demain soir : Keur Massar et Pikine à risque
          </span>
        </div>
      </div>
      <Button variant="ghost" className="min-h-10 text-weather-ink max-md:hidden" onClick={() => navigate("/carte")}>
        Voir la carte <ArrowRight size={16} />
      </Button>
      <IconButton
        className="size-9 max-md:absolute max-md:top-1.25 max-md:right-1.25"
        aria-label="Fermer"
        onClick={() => setVisible(false)}
      >
        <X size={18} />
      </IconButton>
    </aside>
  );
}
