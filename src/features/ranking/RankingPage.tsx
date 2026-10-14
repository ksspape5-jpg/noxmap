import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Roadmap from "@/shared/roadmap";
import { DemoBadge, Filters, PageTitle } from "@/shared/ui";
import RankItem from "./components/RankItem";
import RankingSummary from "./components/RankingSummary";
import { rankData } from "./rankingData";

export default function RankingPage() {
  const [filter, setFilter] = useState("Aujourd'hui");
  const navigate = useNavigate();
  const goToMap = () => navigate("/carte");
  return (
    <main className="content-page ranking-page">
      <div className="content-container">
        <PageTitle
          eyebrow="Priorités citoyennes"
          title="Quartiers les plus touchés"
          description="Une lecture simple des signalements reçus pour aider à prioriser les interventions."
        />
        <div className="ranking-toolbar"><Filters active={filter} onChange={setFilter} /><DemoBadge /></div>
        <div className="ranking-layout">
          <section className="ranking-list">
            {rankData.map((item, index) => (
              <RankItem key={item.name} item={item} index={index} onClick={goToMap} />
            ))}
          </section>
          <RankingSummary onExplore={goToMap} />
        </div>
        <Roadmap />
      </div>
    </main>
  );
}
