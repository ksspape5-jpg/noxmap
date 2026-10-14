import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocateFixed, Plus } from "lucide-react";
import { MapCanvas } from "@/shared/map";
import { Button, Filters } from "@/shared/ui";
import Legend from "./components/Legend";
import ReportDetail from "./components/ReportDetail";
import ReportsPanel from "./components/ReportsPanel";
import SuccessToast from "./components/SuccessToast";
import "./map.css";

export default function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("Aujourd'hui");
  const [selected, setSelected] = useState<number | null>(location.state?.newReport ? 1 : null);
  const [legendOpen] = useState(true);
  const newReport = Boolean(location.state?.newReport);
  return (
    <main className="map-page">
      <ReportsPanel filter={filter} onFilterChange={setFilter} selected={selected} onSelect={setSelected} />
      <section className="map-stage">
        <MapCanvas onSelect={setSelected} selected={selected} newReport={newReport} />
        <div className="map-top-mobile"><Filters active={filter} onChange={setFilter} /></div>
        <div className="map-status"><span className="live-dot" /> 72 points actifs <small>démo</small></div>
        {legendOpen && <Legend />}
        <button className="locate-btn" aria-label="Ma position"><LocateFixed size={20} /><span>Ma position</span></button>
        <Button className="floating-report" onClick={() => navigate("/signaler")}><Plus size={20} /> Ici c'est inondé</Button>
        {selected && <ReportDetail reportId={selected} onClose={() => setSelected(null)} />}
        {newReport && !selected && <SuccessToast />}
      </section>
    </main>
  );
}
