import { useNavigate } from "react-router-dom";
import { Map as MapIcon, Plus, ShieldCheck } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Button, DemoBadge } from "@/shared/ui";
import MiniMapVisual from "./MiniMapVisual";

const HERO_CLASSES = cn(
  "mx-auto grid min-h-150 max-w-310 grid-cols-[.85fr_1.15fr] items-center gap-17 px-6 pt-17.5 pb-20",
  "max-md:flex max-md:min-h-auto max-md:flex-col max-md:items-stretch max-md:gap-9 max-md:px-4.5 max-md:pt-11.5 max-md:pb-9.5",
);

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className={HERO_CLASSES}>
      <div className="flex flex-col items-start">
        <DemoBadge />
        <h1 className="my-5.5 text-[clamp(44px,5vw,68px)] leading-[1.03] tracking-[-.055em] max-md:my-4.5 max-md:text-[40px]">
          Voir où l'eau monte.<br /><em className="text-primary not-italic">Agir plus vite.</em>
        </h1>
        <p className="max-w-130 text-base leading-[1.7] text-muted max-md:text-sm">
          Une carte citoyenne des rues inondées à Dakar et dans sa banlieue, alimentée par les habitants.
        </p>
        <div className="mt-7 mb-5 flex gap-2.5 max-md:w-full max-md:flex-col">
          <Button className="max-md:w-full" onClick={() => navigate("/carte")}><MapIcon size={19} /> Voir la carte</Button>
          <Button className="max-md:w-full" variant="secondary" onClick={() => navigate("/signaler")}>
            <Plus size={19} /> Ici c'est inondé
          </Button>
        </div>
        <p className="flex items-center gap-2 text-[11px] leading-normal text-muted max-md:items-start">
          <ShieldCheck size={17} className="flex-none text-success" /> Aide à réagir, ne remplace ni les alertes officielles ni les secours.
        </p>
      </div>
      <div><MiniMapVisual /></div>
    </section>
  );
}
