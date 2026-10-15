import { ArrowRight, Check, LocateFixed, MapPin, Navigation } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { MapCanvas } from "@/shared/map";
import { Button } from "@/shared/ui";
import FormError from "./FormError";
import StepTitle from "./StepTitle";

// Floating marker pin in the center of the map
const PIN_CLASSES = cn(
  "absolute top-1/2 left-1/2 z-400 grid size-12 place-items-center [transform:translate(-50%,-100%)]",
  "rounded-full bg-primary text-white",
  "shadow-[0_4px_20px_rgba(0,112,74,.35)]",
  "transition-all duration-300",
  "after:absolute after:-bottom-[6px] after:left-1/2 after:-translate-x-1/2",
  "after:size-0 after:border-x-[6px] after:border-t-[7px] after:border-x-transparent after:border-t-primary",
);

const LABEL_CLASSES = cn(
  "absolute bottom-4 left-1/2 z-400 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap",
  "rounded-xl bg-white/95 backdrop-blur-sm px-3.5 py-2.5 text-[11px] font-bold text-success",
  "shadow-[0_4px_20px_rgba(0,0,0,.12)]",
  "animate-[fadeSlideUp_0.3s_ease-out]",
);

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
        icon={<MapPin size={22} />}
        title="Où est-ce inondé ?"
        description="Touchez la carte pour placer le point au plus près. Aucune adresse de maison ne sera publiée."
      />

      {/* Map card */}
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer",
          "h-[280px] max-md:h-[240px]",
          locationSet
            ? "border-primary shadow-[0_0_0_3px_rgba(0,112,74,.12)]"
            : "border-border hover:border-primary/40 hover:shadow-[0_4px_16px_rgba(0,0,0,.06)]",
        )}
        onClick={onLocate}
      >
        <MapCanvas compact className="pointer-events-none" />
        <span className={cn(PIN_CLASSES, locationSet && "scale-110")}>
          <MapPin size={22} className={cn(locationSet && "animate-[bounce_0.3s_ease-out]")} />
        </span>
        {locationSet && (
          <span className={LABEL_CLASSES}>
            <Check size={15} /> Keur Massar, Unité 14
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="relative my-5 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-semibold text-muted">ou</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Geolocation button */}
      <button
        className={cn(
          "group flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-border-strong bg-canvas/60 p-4 text-left",
          "transition-all duration-200",
          "hover:border-primary/40 hover:bg-primary-soft/30",
        )}
        onClick={onLocate}
      >
        <span className="grid size-11 flex-none place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Navigation size={20} />
        </span>
        <span className="flex flex-col">
          <b className="text-[13px]">Utiliser ma position</b>
          <small className="mt-0.5 text-[11px] text-muted">GPS du téléphone</small>
        </span>
        <LocateFixed size={18} className="ml-auto text-muted transition-colors group-hover:text-primary" />
      </button>

      <FormError message={error} />

      {/* Continue button */}
      <Button className="mt-5 w-full" onClick={onContinue}>
        Continuer <ArrowRight size={18} />
      </Button>
    </>
  );
}
