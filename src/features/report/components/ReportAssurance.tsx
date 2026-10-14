import { Check, ShieldCheck } from "lucide-react";
import { DemoBadge } from "@/shared/ui";
import type { ReportStep } from "../types";
import "./ReportAssurance.css";

export default function ReportAssurance({ step }: { step: ReportStep }) {
  return (
    <aside className="form-assurance">
      <DemoBadge />
      <div className="assurance-icon"><ShieldCheck size={28} /></div>
      <h2>Un signalement utile, sans compte.</h2>
      <p>Deux informations suffisent pour aider les habitants à éviter une rue inondée.</p>
      <ol>
        <li className={step === 1 ? "active" : "done"}>
          <span>{step === 1 ? "1" : <Check size={14} />}</span>
          <div><b>Placer le point</b><small>Position approximative publique</small></div>
        </li>
        <li className={step === 2 ? "active" : ""}>
          <span>2</span>
          <div><b>Décrire le niveau</b><small>Photo toujours facultative</small></div>
        </li>
      </ol>
      <div className="assurance-note">
        <ShieldCheck size={18} />
        <span><b>Vie privée visible</b>Aucun nom, téléphone ou adresse personnelle n'est demandé.</span>
      </div>
    </aside>
  );
}
