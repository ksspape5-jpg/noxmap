import { Camera, Plus, Trash2 } from "lucide-react";
import { DEMO_PHOTO_URL } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";

// Cadre commun au bouton d'ajout (pointillés) et à l'aperçu (trait plein).
const BOX_CLASSES =
  "flex w-full items-center gap-2.75 rounded-xl border border-dashed border-border-strong bg-canvas p-3 text-left";

function PhotoText({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex flex-1 flex-col">
      <b className="text-[11px]">{title}</b>
      <small className="mt-0.5 text-[9px] text-muted">{hint}</small>
    </div>
  );
}

type PhotoFieldProps = { hasPhoto: boolean; onChange: (hasPhoto: boolean) => void };

export default function PhotoField({ hasPhoto, onChange }: PhotoFieldProps) {
  return (
    <div className="my-3.5">
      {!hasPhoto ? (
        <button className={BOX_CLASSES} onClick={() => onChange(true)}>
          <span className="grid size-9.5 place-items-center rounded-[10px] bg-primary-soft text-primary"><Camera size={21} /></span>
          <PhotoText title="Ajouter une photo" hint="Facultatif · aide à confirmer le niveau" />
          <Plus size={19} />
        </button>
      ) : (
        <div className={cn(BOX_CLASSES, "border-solid")}>
          <img className="h-11 w-13.5 rounded-[7px] object-cover" src={DEMO_PHOTO_URL} alt="Aperçu de la photo ajoutée" />
          <PhotoText title="Photo ajoutée" hint="Les visages et plaques seront floutés." />
          <button
            className="grid size-9 place-items-center rounded-lg border-0 bg-danger-soft text-danger"
            aria-label="Retirer la photo"
            onClick={() => onChange(false)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
