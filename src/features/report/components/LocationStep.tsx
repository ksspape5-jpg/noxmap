import { ArrowRight, Check, LocateFixed, MapPin } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { MapCanvas } from "@/shared/map";
import { Button } from "@/shared/ui";
import FormError from "./FormError";
import StepTitle from "./StepTitle";

// `transform` (et non `translate-*`) : la translation s'applique dans le repère pivoté par `rotate`.
const PIN_CLASSES = cn(
  "absolute top-1/2 left-1/2 z-400 grid size-11 place-items-center [transform:translate(-50%,-100%)] -rotate-45",
  "rounded-[50%_50%_50%_8px] bg-primary text-white shadow-[0_6px_18px_rgba(0,0,0,.25)]",
);

const LABEL_CLASSES = cn(
  "absolute bottom-3 left-1/2 z-400 flex -translate-x-1/2 items-center gap-1.25 whitespace-nowrap",
  "rounded-[9px] bg-white px-3 py-2.25 text-[10px] font-bold text-success shadow-[0_4px_15px_rgba(0,0,0,.15)]",
);

const DIVIDER_LINE = "before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border";

type LocationStepProps = {
  locationSet: boolean;
  error: string;
  onLocate: () => void;
  onContinue: () => void;
};

export default function LocationStep({ locationSet, error, onLocate, onContinue }: LocationStepProps) {
  return (
    <>
      <StepTitle
        title="Où est-ce inondé ?"
        description="Touchez la carte pour placer le point au plus près. Aucune adresse de maison ne sera publiée."
      />
      <div
        className={cn(
          "relative h-70 cursor-pointer overflow-hidden rounded-[15px] border-2 border-transparent max-md:h-66.25",
          locationSet && "border-primary",
        )}
        onClick={onLocate}
      >
        <MapCanvas compact className="pointer-events-none" />
        <span className={PIN_CLASSES}><MapPin size={24} className="rotate-45" /></span>
        {locationSet && <span className={LABEL_CLASSES}><Check size={15} /> Keur Massar, Unité 14</span>}
      </div>
      <div className={cn("my-3.75 flex items-center gap-3 text-[10px] text-muted", DIVIDER_LINE)}><span>ou</span></div>
      <Button variant="secondary" className="w-full" onClick={onLocate}><LocateFixed size={19} /> Utiliser ma position</Button>
      <FormError message={error} />
      <Button className="w-full" onClick={onContinue}>Continuer <ArrowRight size={18} /></Button>
    </>
  );
}
