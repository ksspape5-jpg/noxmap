import { Check, Map as MapIcon, MapPin, Plus, ShieldCheck } from "lucide-react";
import { LevelBadge, levelMeta, type Level } from "@/shared/flood";
import { Button } from "@/shared/ui";
import "./ReportConfirmation.css";

type ReportConfirmationProps = {
  level: Level | null;
  onViewMap: () => void;
  onRestart: () => void;
};

export default function ReportConfirmation({ level, onViewMap, onRestart }: ReportConfirmationProps) {
  return (
    <main className="form-page confirmation-page">
      <section className="confirmation-card">
        <span className="success-icon"><Check size={34} /></span>
        <p className="eyebrow">Signalement envoyé</p>
        <h1>Merci, votre signalement est sur la carte.</h1>
        <p>Les habitants peuvent maintenant voir ce point et le confirmer.</p>
        <div className="summary-card">
          <span><MapPin /></span>
          <div><b>Keur Massar — Unité 14</b><small>À l'instant · {level && levelMeta[level].label}</small></div>
          {level && <LevelBadge level={level} />}
        </div>
        <div className="privacy-confirm"><ShieldCheck size={18} /> Aucune adresse de maison n'est publiée.</div>
        <Button onClick={onViewMap}><MapIcon size={18} /> Voir sur la carte</Button>
        <Button variant="secondary" onClick={onRestart}><Plus size={18} /> Nouveau signalement</Button>
      </section>
    </main>
  );
}
