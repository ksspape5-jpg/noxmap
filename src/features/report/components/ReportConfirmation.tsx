import { CircleCheckBig, Image as ImageIcon, Map as MapIcon, MapPin, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { LevelBadge, levelMeta, type Level } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import { Button, Eyebrow } from "@/shared/ui";
import type { ReportLocation, ReportPhoto } from "../types";
import FormPage from "./FormPage";

const CARD_CLASSES = cn(
  "flex w-full max-w-[520px] flex-col items-center rounded-3xl bg-white p-12 text-center",
  "shadow-[0_20px_60px_rgba(33,51,46,.08)]",
  "animate-[fadeSlideUp_0.5s_ease-out]",
  "max-md:px-5 max-md:py-10 max-md:shadow-none",
);

type ReportConfirmationProps = {
  level: Level | null;
  location: ReportLocation | null;
  photos: ReportPhoto[];
  onViewMap: () => void;
  onRestart: () => void;
};

export default function ReportConfirmation({
  level,
  location,
  photos,
  onViewMap,
  onRestart,
}: ReportConfirmationProps) {
  return (
    <FormPage className="items-center max-md:items-start">
      <section className={CARD_CLASSES}>
        {/* Animated success icon */}
        <span className="relative mb-6">
          <span className="grid size-20 place-items-center rounded-full bg-success-soft text-success">
            <CircleCheckBig size={40} />
          </span>
          {/* Decorative sparkle */}
          <Sparkles
            size={20}
            className="absolute -top-1 -right-2 text-accent animate-[pulse_2s_ease-in-out_infinite]"
          />
        </span>

        <Eyebrow>Signalement envoyé</Eyebrow>
        <h1 className="max-w-md text-[30px] leading-[1.18] tracking-tight max-md:text-[26px]">
          Merci, votre signalement est sur la carte.
        </h1>
        <p className="mt-3 mb-7 max-w-sm text-[13px] leading-relaxed text-muted">
          Les habitants peuvent maintenant voir ce point et le confirmer.
        </p>

        {/* Report summary card */}
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-border bg-canvas/60 p-4 text-left max-md:grid-cols-[auto_1fr]">
          <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
            <MapPin size={22} />
          </span>
          <div className="flex flex-col">
            <b className="text-[12px]">{location ? location.placeName : "Position enregistrée"}</b>
            <small className="mt-0.75 text-[10px] text-muted">
              {location?.isRealGps ? "Coordonnées GPS réelles" : "Position sur carte"} · {level && levelMeta[level].label}
            </small>
          </div>
          {level && <LevelBadge level={level} className="max-md:col-start-2" />}
        </div>

        {/* Photos summary */}
        {photos.length > 0 && (
          <div className="mt-3 flex w-full items-center justify-between rounded-xl border border-border bg-canvas/40 px-3.5 py-2.5 text-left">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-ink">
              <ImageIcon size={15} className="text-primary" />
              <span>{photos.length} photo{photos.length > 1 ? "s" : ""} ajoutée{photos.length > 1 ? "s" : ""}</span>
            </div>
            <div className="flex -space-x-2">
              {photos.map((photo, i) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={`Photo ${i + 1}`}
                  className="size-7 rounded-lg border-2 border-white object-cover shadow-xs"
                />
              ))}
            </div>
          </div>
        )}

        {/* Privacy note */}
        <div className="mt-4 mb-6 flex w-full items-center justify-center gap-2 text-[11px] text-success">
          <ShieldCheck size={17} /> Aucune adresse de maison n'est publiée.
        </div>

        {/* Action buttons */}
        <Button className="w-full" onClick={onViewMap}>
          <MapIcon size={18} /> Voir sur la carte
        </Button>
        <Button variant="secondary" className="mt-3 w-full" onClick={onRestart}>
          <Plus size={18} /> Nouveau signalement
        </Button>
      </section>
    </FormPage>
  );
}
