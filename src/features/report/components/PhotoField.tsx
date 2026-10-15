import { Camera, ImagePlus, Plus, Trash2 } from "lucide-react";
import { DEMO_PHOTO_URL } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";

function PhotoText({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex flex-1 flex-col">
      <b className="text-[12px]">{title}</b>
      <small className="mt-0.5 text-[10.5px] text-muted">{hint}</small>
    </div>
  );
}

type PhotoFieldProps = { hasPhoto: boolean; onChange: (hasPhoto: boolean) => void };

export default function PhotoField({ hasPhoto, onChange }: PhotoFieldProps) {
  return (
    <div className="my-4">
      {!hasPhoto ? (
        <button
          className={cn(
            "group flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-border-strong bg-canvas/60 p-4 text-left",
            "transition-all duration-200",
            "hover:border-primary/40 hover:bg-primary-soft/30",
          )}
          onClick={() => onChange(true)}
        >
          <span className="grid size-11 flex-none place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <Camera size={21} />
          </span>
          <PhotoText title="Ajouter une photo" hint="Facultatif · aide à confirmer le niveau" />
          <ImagePlus size={19} className="text-muted transition-colors group-hover:text-primary" />
        </button>
      ) : (
        <div
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl border-2 border-solid border-primary/20 bg-primary-soft/20 p-4",
            "animate-[fadeIn_0.3s_ease-out]",
          )}
        >
          <img
            className="h-14 w-16 flex-none rounded-xl object-cover shadow-[0_2px_8px_rgba(0,0,0,.1)]"
            src={DEMO_PHOTO_URL}
            alt="Aperçu de la photo ajoutée"
          />
          <PhotoText title="Photo ajoutée ✓" hint="Les visages et plaques seront floutés." />
          <button
            className="grid size-10 flex-none place-items-center rounded-xl border-0 bg-danger-soft text-danger transition-all hover:bg-danger hover:text-white"
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
