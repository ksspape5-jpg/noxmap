import { useNavigate } from "react-router-dom";
import { Map as MapIcon, Plus, ShieldCheck } from "lucide-react";
import { Button, DemoBadge } from "@/shared/ui";
import MiniMapVisual from "./MiniMapVisual";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-copy">
        <DemoBadge />
        <h1>Voir où l'eau monte.<br /><em>Agir plus vite.</em></h1>
        <p>Une carte citoyenne des rues inondées à Dakar et dans sa banlieue, alimentée par les habitants.</p>
        <div className="hero-actions">
          <Button onClick={() => navigate("/carte")}><MapIcon size={19} /> Voir la carte</Button>
          <Button variant="secondary" onClick={() => navigate("/signaler")}><Plus size={19} /> Ici c'est inondé</Button>
        </div>
        <p className="safety-note"><ShieldCheck size={17} /> Aide à réagir, ne remplace ni les alertes officielles ni les secours.</p>
      </div>
      <div className="hero-map"><MiniMapVisual /></div>
    </section>
  );
}
