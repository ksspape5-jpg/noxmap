import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Roadmap from "@/shared/roadmap";
import { ContentPage, DemoBadge, Filters, PageTitle } from "@/shared/ui";
import RankItem from "./components/RankItem";
import RankingSummary from "./components/RankingSummary";
import { rankData } from "./rankingData";

export default function RankingPage() {
  const [filter, setFilter] = useState("Aujourd'hui");
  const navigate = useNavigate();
  const goToMap = () => navigate("/carte");
  return (
    <ContentPage>
      <PageTitle
        className="mb-8"
        eyebrow="Priorités citoyennes"
        title="Quartiers les plus touchés"
        description="Une lecture simple des signalements reçus pour aider à prioriser les interventions."
      />
      <div className="mb-3.75 flex items-center justify-between max-md:flex-col max-md:items-stretch max-md:gap-2.25">
        <Filters className="w-82.5 max-md:w-full" active={filter} onChange={setFilter} />
        <DemoBadge />
      </div>
      <div className="grid grid-cols-[1fr_310px] items-start gap-5.5 max-md:grid-cols-1">
        <section className="overflow-hidden rounded-[18px] border border-border bg-white">
          {rankData.map((item, index) => (
            <RankItem key={item.name} item={item} index={index} onClick={goToMap} />
          ))}
        </section>
        <RankingSummary onExplore={goToMap} />
      </div>
      <Roadmap className="mt-15 mb-0 max-md:-mx-0.75 max-md:mt-8.75 max-md:mb-0" />
    </ContentPage>
  );
}
