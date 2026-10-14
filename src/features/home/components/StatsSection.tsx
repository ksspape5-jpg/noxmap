import { TrendingUp } from "lucide-react";
import { DemoBadge } from "@/shared/ui";

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-head"><span>La situation aujourd'hui</span><DemoBadge /></div>
      <div className="stats-grid">
        <div><strong>72</strong><span>signalements actifs</span><small><TrendingUp size={13} /> +16 depuis ce matin</small></div>
        <div><strong>5</strong><span>quartiers touchés</span><small>sur la zone de démo</small></div>
        <div><strong>8 min</strong><span>dernier point noir</span><small>Keur Massar</small></div>
        <div><strong>18</strong><span>points confirmés</span><small>par plusieurs habitants</small></div>
      </div>
    </section>
  );
}
