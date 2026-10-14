import { Camera, Plus, Trash2 } from "lucide-react";
import { DEMO_PHOTO_URL } from "@/shared/flood";
import "./PhotoField.css";

type PhotoFieldProps = { hasPhoto: boolean; onChange: (hasPhoto: boolean) => void };

export default function PhotoField({ hasPhoto, onChange }: PhotoFieldProps) {
  return (
    <div className="photo-field">
      {!hasPhoto ? (
        <button onClick={() => onChange(true)}>
          <span><Camera size={21} /></span>
          <div><b>Ajouter une photo</b><small>Facultatif · aide à confirmer le niveau</small></div>
          <Plus size={19} />
        </button>
      ) : (
        <div className="photo-preview">
          <img src={DEMO_PHOTO_URL} alt="Aperçu de la photo ajoutée" />
          <div><b>Photo ajoutée</b><small>Les visages et plaques seront floutés.</small></div>
          <button aria-label="Retirer la photo" onClick={() => onChange(false)}><Trash2 size={18} /></button>
        </div>
      )}
    </div>
  );
}
