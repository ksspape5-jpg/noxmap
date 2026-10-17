import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Roadmap from "@/shared/roadmap";
import { ContentPage, PageTitle } from "@/shared/ui";
import RankItem from "./components/RankItem";
import RankingDetail from "./components/RankingDetail";
import RankingSummary from "./components/RankingSummary";
import RankingToolbar from "./components/RankingToolbar";
import { exportCsv, exportGeoJson, exportPdf } from "./exportRanking";
import { periodFromFilter, rankMetricLabel, rankRows, type RankMetric } from "./rankingData";

export default function RankingPage() {
  const [filter, setFilter] = useState("Aujourd'hui");
  const [metric, setMetric] = useState<RankMetric>("volume");
  const [recurringOnly, setRecurringOnly] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const period = periodFromFilter(filter);
  const rows = rankRows(metric, period, recurringOnly);
  const max = Math.max(...rows.map((item) => item.value), 1);
  const total = rows.reduce((sum, item) => sum + item.value, 0);
  const detail = rows.find((item) => item.name === selected) ?? null;
  const unit = rankMetricLabel(metric);

  return (
    <ContentPage>
      <PageTitle
        className="mb-8"
        eyebrow="Priorités citoyennes"
        title="Quartiers les plus touchés"
        description="Une lecture simple des signalements reçus pour aider à prioriser les interventions."
      />
      <RankingToolbar
        filter={filter}
        onFilterChange={setFilter}
        metric={metric}
        onMetricChange={setMetric}
        recurringOnly={recurringOnly}
        onRecurringToggle={() => setRecurringOnly((value) => !value)}
        onExportCsv={() => exportCsv(rows)}
        onExportGeoJson={() => exportGeoJson(rows)}
        onExportPdf={exportPdf}
      />
      <div className="grid grid-cols-[1fr_310px] items-start gap-5.5 max-md:grid-cols-1 print:block">
        <section className="overflow-hidden rounded-[18px] border border-border bg-white">
          {rows.map((item, index) => (
            <RankItem
              key={item.name}
              item={item}
              index={index}
              max={max}
              unit={unit}
              active={selected === item.name}
              onClick={() => setSelected(item.name)}
            />
          ))}
        </section>
        {detail ? (
          <RankingDetail
            detail={detail}
            total={total}
            unit={unit}
            period={period}
            onClose={() => setSelected(null)}
            onShowOnMap={() => navigate(`/carte?focus=${encodeURIComponent(detail.name)}`)}
            onReport={() => navigate("/signaler")}
          />
        ) : (
          <RankingSummary rows={rows} total={total} unit={unit} onExplore={() => navigate("/carte")} />
        )}
      </div>
      <Roadmap className="mt-15 mb-0 max-md:-mx-0.75 max-md:mt-8.75 max-md:mb-0 print:hidden" />
    </ContentPage>
  );
}
