import { Check, Map as MapIcon, MapPin, Plus, ShieldCheck } from "lucide-react";
import { LevelBadge, levelMeta, type Level } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import { Button, Eyebrow } from "@/shared/ui";
import FormPage from "./FormPage";

const CARD_CLASSES = cn(
  "flex w-full max-w-145 flex-col items-center rounded-[22px] bg-white p-10 text-center shadow-[0_16px_45px_rgba(33,51,46,.09)]",
  "max-md:px-1.25 max-md:py-7.5 max-md:shadow-none",
);

type ReportConfirmationProps = {
  level: Level | null;
  onViewMap: () => void;
  onRestart: () => void;
};

export default function ReportConfirmation({ level, onViewMap, onRestart }: ReportConfirmationProps) {
  return (
    <FormPage className="items-center max-md:items-start">
      <section className={CARD_CLASSES}>
        <span className="mb-5.5 grid size-17 place-items-center rounded-full bg-success-soft text-success"><Check size={34} /></span>
        <Eyebrow>Signalement envoyé</Eyebrow>
        <h1 className="max-w-112.5 text-[32px] leading-[1.2] tracking-[-.04em] max-md:text-[29px]">
          Merci, votre signalement est sur la carte.
        </h1>
        <p className="mt-3 mb-6 text-[13px] text-muted">Les habitants peuvent maintenant voir ce point et le confirmer.</p>
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2.75 rounded-[13px] border border-border p-3.5 text-left max-md:grid-cols-[auto_1fr]">
          <span className="grid size-9.5 place-items-center rounded-[10px] bg-primary-soft text-primary"><MapPin /></span>
          <div className="flex flex-col">
            <b className="text-[11px]">Keur Massar — Unité 14</b>
            <small className="mt-0.75 text-[9px] text-muted">À l'instant · {level && levelMeta[level].label}</small>
          </div>
          {level && <LevelBadge level={level} className="max-md:col-start-2" />}
        </div>
        <div className="mt-3.25 mb-5 flex w-full items-center justify-center gap-1.75 text-[10px] text-success max-md:text-[9px]">
          <ShieldCheck size={18} /> Aucune adresse de maison n'est publiée.
        </div>
        <Button className="mt-2.25 w-full" onClick={onViewMap}><MapIcon size={18} /> Voir sur la carte</Button>
        <Button variant="secondary" className="mt-2.25 w-full" onClick={onRestart}><Plus size={18} /> Nouveau signalement</Button>
      </section>
    </FormPage>
  );
}
