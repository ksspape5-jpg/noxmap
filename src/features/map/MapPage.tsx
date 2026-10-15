import { useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { reports } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import { MapCanvas } from "@/shared/map";
import { Button, Filters } from "@/shared/ui";
import Legend from "./components/Legend";
import LiveDot from "./components/LiveDot";
import LocateButton from "./components/LocateButton";
import ReportDetail from "./components/ReportDetail";
import ReportsPanel from "./components/ReportsPanel";
import SuccessToast from "./components/SuccessToast";

export default function MapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // `?focus=<quartier>` (lien depuis le classement) centre la carte sur ce quartier.
  const focus = searchParams.get("focus");
  const focusReport = focus ? reports.find((report) => report.place === focus) : undefined;
  const focusCenter = useMemo<[number, number] | undefined>(
    () => (focusReport ? [focusReport.lat, focusReport.lng] : undefined),
    [focusReport],
  );
  const [filter, setFilter] = useState("Aujourd'hui");
  const [selected, setSelected] = useState<number | null>(
    focusReport ? focusReport.id : location.state?.newReport ? 1 : null,
  );
  const [legendOpen] = useState(true);
  const newReport = Boolean(location.state?.newReport);
  // Sur mobile, la fiche ouverte recouvre le bas de la carte : on masque les contrôles flottants.
  const hiddenUnderSheet = selected ? "max-md:hidden" : undefined;
  return (
    <main className="grid h-screen grid-cols-[380px_1fr] overflow-hidden bg-white pt-18 max-md:block max-md:h-[calc(100vh-72px)] max-md:p-0">
      <ReportsPanel filter={filter} onFilterChange={setFilter} selected={selected} onSelect={setSelected} />
      <section className="relative min-w-0 max-md:size-full">
        <MapCanvas onSelect={setSelected} selected={selected} newReport={newReport} center={focusCenter} />
        <div className="absolute inset-x-3 top-3 z-400 hidden max-md:block">
          <Filters className="bg-subtle/96 shadow-[0_3px_15px_rgba(0,0,0,.13)]" active={filter} onChange={setFilter} />
        </div>
        <div className="absolute top-4.5 left-4.5 z-400 rounded-[10px] bg-white/96 px-3.25 py-2.5 text-[11px] font-bold shadow-[0_4px_16px_rgba(0,0,0,.12)] max-md:top-16.75 max-md:left-3">
          <LiveDot /> 72 points actifs <small className="font-medium text-muted">démo</small>
        </div>
        {legendOpen && <Legend className={hiddenUnderSheet} />}
        <LocateButton className={hiddenUnderSheet} />
        <Button
          className={cn("absolute right-6 bottom-6 z-400 max-md:right-3 max-md:bottom-6.25 max-md:min-h-13", hiddenUnderSheet)}
          onClick={() => navigate("/signaler")}
        >
          <Plus size={20} /> Ici c'est inondé
        </Button>
        {selected && <ReportDetail reportId={selected} onClose={() => setSelected(null)} />}
        {newReport && !selected && <SuccessToast />}
      </section>
    </main>
  );
}
