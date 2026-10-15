import { Check } from "lucide-react";

export default function SuccessToast() {
  return (
    <div className="absolute top-5 left-1/2 z-700 flex -translate-x-1/2 items-center gap-2.5 rounded-xl bg-white px-4 py-3 text-success shadow-[0_8px_25px_rgba(0,0,0,.2)]">
      <Check size={18} />
      <span className="flex flex-col text-[9px] text-muted">
        <b className="text-[11px] text-ink">Signalement ajouté</b>Le nouveau point est mis en avant.
      </span>
    </div>
  );
}
