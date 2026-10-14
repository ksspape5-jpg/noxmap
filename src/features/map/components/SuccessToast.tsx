import { Check } from "lucide-react";

export default function SuccessToast() {
  return (
    <div className="success-toast">
      <Check size={18} />
      <span><b>Signalement ajouté</b>Le nouveau point est mis en avant.</span>
    </div>
  );
}
