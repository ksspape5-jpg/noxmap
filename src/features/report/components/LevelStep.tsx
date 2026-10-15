import { ArrowRight, Droplets } from "lucide-react";
import { LEVELS, type Level } from "@/shared/flood";
import { Button } from "@/shared/ui";
import FormError from "./FormError";
import LevelCard from "./LevelCard";
import PhotoField from "./PhotoField";
import StepTitle from "./StepTitle";

import type { ReportPhoto } from "../types";

const SPINNER_CLASSES =
  "size-5 animate-[spin_0.7s_linear_infinite] rounded-full border-[2.5px] border-white/30 border-t-white";

type LevelStepProps = {
  level: Level | null;
  onLevelChange: (level: Level) => void;
  photos: ReportPhoto[];
  onPhotosChange: (photos: ReportPhoto[]) => void;
  consent: boolean;
  onConsentChange: (consent: boolean) => void;
  error: string;
  sending: boolean;
  onSubmit: () => void;
};

export default function LevelStep({
  level,
  onLevelChange,
  photos,
  onPhotosChange,
  consent,
  onConsentChange,
  error,
  sending,
  onSubmit,
}: LevelStepProps) {

  return (
    <>
      <StepTitle
        icon={<Droplets size={22} />}
        title="Quel niveau d'eau ?"
        description="Choisissez le niveau le plus proche de ce que vous observez."
      />

      {/* Level cards */}
      <div className="flex flex-col gap-3">
        {LEVELS.map((item) => (
          <LevelCard key={item} level={item} selected={level === item} onClick={() => onLevelChange(item)} />
        ))}
      </div>

      {/* Photo section */}
      <PhotoField photos={photos} onChange={onPhotosChange} />

      {/* Consent checkbox */}
      <label
        className="group mt-1 flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-canvas/60 p-4 transition-all hover:border-primary/30 hover:bg-primary-soft/20"
      >
        <input
          type="checkbox"
          className="mt-0.5 size-[18px] accent-primary rounded"
          checked={consent}
          onChange={(event) => onConsentChange(event.target.checked)}
        />
        <span className="flex flex-col gap-0.5">
          <b className="text-[12px] text-ink">Je confirme que l'information est actuelle.</b>
          <small className="text-[10.5px] leading-relaxed text-muted">
            Les visages et plaques seront floutés. Aucune adresse de maison n'est publiée.
          </small>
        </span>
      </label>

      <FormError message={error} />

      {/* Submit button */}
      <Button className="mt-5 w-full" onClick={onSubmit} disabled={sending}>
        {sending ? (
          <>
            <span className={SPINNER_CLASSES} /> Envoi en cours…
          </>
        ) : (
          <>
            Publier le signalement <ArrowRight size={18} />
          </>
        )}
      </Button>
    </>
  );
}
