import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/shared/ui";

export default function RankingSummary({ onExplore }: { onExplore: () => void }) {
  return (
    <aside className="ranking-summary">
      <div>
        <span className="summary-icon"><BarChart3 /></span>
        <h2>72 signalements</h2>
        <p>recensés sur 5 quartiers dans cette démonstration.</p>
      </div>
      <hr />
      <p><b>À retenir</b>Keur Massar concentre un tiers des points actifs et les niveaux les plus élevés.</p>
      <Button onClick={onExplore}>Explorer la carte <ArrowRight size={17} /></Button>
    </aside>
  );
}
