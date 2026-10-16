import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { Map as MapIcon, Plus, ShieldCheck } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Button, DemoBadge } from "@/shared/ui";
import MiniMapVisual from "./MiniMapVisual";

const HERO_CLASSES = cn(
  "relative isolate mx-auto grid min-h-150 max-w-310 grid-cols-[.85fr_1.15fr] items-center gap-17 overflow-hidden px-6 pt-17.5 pb-20",
  "max-md:flex max-md:min-h-auto max-md:flex-col max-md:items-stretch max-md:gap-8 max-md:px-4.5 max-md:pt-10 max-md:pb-10",
);

const DECOR_CLASSES = "pointer-events-none absolute inset-0 -z-10";

const REVEAL = "animate-[fadeSlideUp_.55s_ease-out_both]";
const revealDelay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className={HERO_CLASSES}>
      <div aria-hidden className={DECOR_CLASSES}>
        <div className="absolute -top-40 -right-32 size-140 rounded-full bg-primary-soft blur-3xl" />
        <div className="absolute -bottom-32 -left-24 size-100 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="flex flex-col items-start">
        <DemoBadge className={REVEAL} />
        <h1 className={cn("my-5.5 text-balance text-[clamp(44px,5vw,68px)] font-extrabold leading-[1.02] tracking-[-.055em] max-md:my-4.5 max-md:text-[clamp(32px,9vw,40px)] max-md:leading-[1.08]", REVEAL)} style={revealDelay(60)}>
          Voir où l'eau monte.<br /><em className="text-primary not-italic">Agir plus vite.</em>
        </h1>
        <p className={cn("max-w-130 text-pretty text-base leading-[1.7] text-muted max-md:text-[15px]", REVEAL)} style={revealDelay(120)}>
          Une carte citoyenne des rues inondées à Dakar et dans sa banlieue, alimentée par les habitants.
        </p>
        <div className={cn("mt-7 mb-5 flex gap-2.5 max-md:w-full max-md:flex-col", REVEAL)} style={revealDelay(180)}>
          <Button className="group max-md:w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[.98]" onClick={() => navigate("/carte")}>
            <MapIcon size={19} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" /> Voir la carte
          </Button>
          <Button className="group max-md:w-full hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[.98]" variant="secondary" onClick={() => navigate("/signaler")}>
            <Plus size={19} aria-hidden className="transition-transform duration-200 group-hover:rotate-90" /> Ici c'est inondé
          </Button>
        </div>
        <p className={cn("flex items-center gap-2 text-[11px] leading-normal text-muted max-md:items-start", REVEAL)} style={revealDelay(240)}>
          <ShieldCheck size={17} aria-hidden className="flex-none text-success" /> Aide à réagir, ne remplace ni les alertes officielles ni les secours.
        </p>
      </div>
      <div className={REVEAL} style={revealDelay(160)}><MiniMapVisual /></div>
    </section>
  );
}
