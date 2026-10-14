import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CloudRain, X } from "lucide-react";
import { Button } from "@/shared/ui";

export default function WeatherAlert() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  if (!visible) return null;
  return (
    <aside className="weather-alert">
      <div className="weather-copy">
        <CloudRain size={22} />
        <div>
          <b>Vigilance pluie — simulation</b>
          <span>Forte pluie prévue demain soir : Keur Massar et Pikine à risque</span>
        </div>
      </div>
      <Button variant="ghost" onClick={() => navigate("/carte")}>
        Voir la carte <ArrowRight size={16} />
      </Button>
      <button className="icon-btn alert-close" aria-label="Fermer" onClick={() => setVisible(false)}>
        <X size={18} />
      </button>
    </aside>
  );
}
