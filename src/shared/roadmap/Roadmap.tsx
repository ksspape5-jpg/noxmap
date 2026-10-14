import { BellRing, CloudRain, Layers3, Sparkles, Waves } from "lucide-react";
import "./Roadmap.css";

const ROADMAP_ITEMS = [
  ["Analyse IA des photos", Sparkles],
  ["Bot WhatsApp", BellRing],
  ["Alertes météo réelles", CloudRain],
  ["Version wolof audio", Waves],
  ["Carte de risque", Layers3],
] as const;

export default function Roadmap() {
  return (
    <section className="roadmap">
      <div className="section-heading">
        <div><p className="eyebrow">Feuille de route</p><h2>Ce que nous voulons construire ensuite</h2></div>
        <span className="soon-pill">Bientôt</span>
      </div>
      <p>Ces fonctions présentent notre vision. Elles ne sont pas encore actives dans cette démo.</p>
      <div className="roadmap-grid">
        {ROADMAP_ITEMS.map(([label, Icon]) => (
          <div key={label}><Icon size={21} /><span>{label}</span><small>Bientôt</small></div>
        ))}
      </div>
    </section>
  );
}
