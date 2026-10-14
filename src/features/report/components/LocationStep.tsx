import { ArrowRight, Check, LocateFixed, MapPin } from "lucide-react";
import { MapCanvas } from "@/shared/map";
import { Button, PageTitle } from "@/shared/ui";
import FormError from "./FormError";

type LocationStepProps = {
  locationSet: boolean;
  error: string;
  onLocate: () => void;
  onContinue: () => void;
};

export default function LocationStep({ locationSet, error, onLocate, onContinue }: LocationStepProps) {
  return (
    <>
      <PageTitle
        eyebrow="Nouveau signalement"
        title="Où est-ce inondé ?"
        description="Touchez la carte pour placer le point au plus près. Aucune adresse de maison ne sera publiée."
      />
      <div className={`location-map ${locationSet ? "selected" : ""}`} onClick={onLocate}>
        <MapCanvas compact />
        <span className="location-pin"><MapPin size={24} /></span>
        {locationSet && <span className="location-label"><Check size={15} /> Keur Massar, Unité 14</span>}
      </div>
      <div className="or-divider"><span>ou</span></div>
      <Button variant="secondary" className="w-full" onClick={onLocate}><LocateFixed size={19} /> Utiliser ma position</Button>
      <FormError message={error} />
      <Button className="w-full" onClick={onContinue}>Continuer <ArrowRight size={18} /></Button>
    </>
  );
}
