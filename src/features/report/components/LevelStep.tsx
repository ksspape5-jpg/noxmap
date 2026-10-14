import { ArrowRight } from "lucide-react";
import { LEVELS, type Level } from "@/shared/flood";
import { Button, PageTitle } from "@/shared/ui";
import FormError from "./FormError";
import LevelCard from "./LevelCard";
import PhotoField from "./PhotoField";

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
      <PageTitle
        eyebrow="Nouveau signalement"
        title="Quel niveau d'eau ?"
        description="Choisissez le niveau le plus proche de ce que vous observez."
      />
      <div className="level-selector">
        {LEVELS.map((item) => (
          <LevelCard key={item} level={item} selected={level === item} onClick={() => onLevelChange(item)} />
        ))}
      </div>
      <PhotoField hasPhoto={photo} onChange={onPhotoChange} />
      <label className="consent-row">
        <input type="checkbox" checked={consent} onChange={(event) => onConsentChange(event.target.checked)} />
        <span><b>Je confirme que l'information est actuelle.</b> Les visages et plaques seront floutés. Aucune adresse de maison n'est publiée.</span>
      </label>
      <FormError message={error} />
      <Button className="w-full" onClick={onSubmit} disabled={sending}>
        {sending ? <><span className="spinner" /> Envoi en cours…</> : <>Publier le signalement <ArrowRight size={18} /></>}
      </Button>
    </>
  );
}
