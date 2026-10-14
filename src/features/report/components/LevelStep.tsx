import { ArrowRight } from "lucide-react";
import { LEVELS, type Level } from "@/shared/flood";
import { Button } from "@/shared/ui";
import FormError from "./FormError";
import LevelCard from "./LevelCard";
import PhotoField from "./PhotoField";
import StepTitle from "./StepTitle";

const SPINNER_CLASSES = "size-4 animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-white/40 border-t-white";

type LevelStepProps = {
  level: Level | null;
  onLevelChange: (level: Level) => void;
  photo: boolean;
  onPhotoChange: (photo: boolean) => void;
  consent: boolean;
  onConsentChange: (consent: boolean) => void;
  error: string;
  sending: boolean;
  onSubmit: () => void;
};

export default function LevelStep({
  level,
  onLevelChange,
  photo,
  onPhotoChange,
  consent,
  onConsentChange,
  error,
  sending,
  onSubmit,
}: LevelStepProps) {
  return (
    <>
      <StepTitle
        title="Quel niveau d'eau ?"
        description="Choisissez le niveau le plus proche de ce que vous observez."
      />
      <div className="flex flex-col gap-2.25">
        {LEVELS.map((item) => (
          <LevelCard key={item} level={item} selected={level === item} onClick={() => onLevelChange(item)} />
        ))}
      </div>
      <PhotoField hasPhoto={photo} onChange={onPhotoChange} />
      <label className="flex cursor-pointer items-start gap-2.5 rounded-[11px] bg-canvas p-3 text-[9px] leading-[1.55] text-muted">
        <input
          type="checkbox"
          className="mt-0.5 size-4.25 accent-primary"
          checked={consent}
          onChange={(event) => onConsentChange(event.target.checked)}
        />
        <span className="flex flex-col"><b className="text-[10px] text-ink">Je confirme que l'information est actuelle.</b> Les visages et plaques seront floutés. Aucune adresse de maison n'est publiée.</span>
      </label>
      <FormError message={error} />
      <Button className="w-full" onClick={onSubmit} disabled={sending}>
        {sending ? <><span className={SPINNER_CLASSES} /> Envoi en cours…</> : <>Publier le signalement <ArrowRight size={18} /></>}
      </Button>
    </>
  );
}
