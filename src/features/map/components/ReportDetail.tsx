import { Check, Info, Navigation, X } from "lucide-react";
import { DEMO_PHOTO_URL, LevelBadge, reports } from "@/shared/flood";
import { Button } from "@/shared/ui";

type ReportDetailProps = { reportId: number; onClose: () => void };

export default function ReportDetail({ reportId, onClose }: ReportDetailProps) {
  const report = reports.find((item) => item.id === reportId)!;
  return (
    <aside className="report-sheet">
      <div className="sheet-handle" />
      <button className="icon-btn sheet-close" aria-label="Fermer" onClick={onClose}><X size={19} /></button>
      {report.photo && <img src={DEMO_PHOTO_URL} alt="Rue du quartier signalée, photo de démonstration" />}
      <div className="sheet-content">
        <LevelBadge level={report.level} />
        <h2>{report.place}</h2>
        <p>{report.detail} · {report.time}</p>
        <div className="confirm-row">
          <span><Check size={16} /></span>
          <div><b>Confirmé par {report.confirms} signalements</b><small>Concordance des informations reçues</small></div>
        </div>
        <div className="expiry">
          <Info size={17} />
          <span><b>Point temporaire</b>Il expirera dans 2 h sans nouvelle confirmation.</span>
        </div>
        <Button className="w-full"><Navigation size={18} /> Voir un itinéraire alternatif</Button>
      </div>
    </aside>
  );
}
