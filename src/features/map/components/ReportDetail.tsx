import { Check, Info, Navigation, X } from "lucide-react";
import { DEMO_PHOTO_URL, LevelBadge, reports } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import { Button, IconButton } from "@/shared/ui";

type ReportDetailProps = { reportId: number; onClose: () => void };

// Fiche flottante à droite sur ordinateur, panneau ancré en bas (bottom sheet) sur mobile.
const SHEET_CLASSES = cn(
  "absolute top-19 right-6 z-600 max-h-[calc(100%-124px)] w-87.5 overflow-y-auto rounded-[18px] bg-white shadow-[0_20px_60px_rgba(27,45,40,.28)]",
  "max-md:inset-x-0 max-md:top-auto max-md:bottom-0 max-md:max-h-[70%] max-md:w-auto max-md:rounded-t-[22px] max-md:rounded-b-none max-md:pb-2",
);

export default function ReportDetail({ reportId, onClose }: ReportDetailProps) {
  const report = reports.find((item) => item.id === reportId)!;
  return (
    <aside className={SHEET_CLASSES}>
      <div className="mx-auto my-2.25 hidden h-1 w-10.5 rounded-full bg-[#ced6d2] max-md:block" />
      <IconButton className="absolute top-2.25 right-2.25 z-1 bg-white/94 max-md:top-3" aria-label="Fermer" onClick={onClose}>
        <X size={19} />
      </IconButton>
      {report.photo && (
        <img
          className="h-37.5 w-full object-cover max-md:h-30"
          src={DEMO_PHOTO_URL}
          alt="Rue du quartier signalée, photo de démonstration"
        />
      )}
      <div className="p-4.5 max-md:py-4">
        <LevelBadge level={report.level} />
        <h2 className="mt-3.25 mb-0.75 text-[22px] max-md:text-xl">{report.place}</h2>
        <p className="text-[11px] text-muted">{report.detail} · {report.time}</p>
        <div className="mt-3.5 flex items-center gap-2.5 border-y border-border py-3.25">
          <span className="grid size-7.25 place-items-center rounded-full bg-success-soft text-success"><Check size={16} /></span>
          <div className="flex flex-col">
            <b className="text-[10px]">Confirmé par {report.confirms} signalements</b>
            <small className="mt-0.5 text-[9px] text-muted">Concordance des informations reçues</small>
          </div>
        </div>
        <div className="my-3.5 flex gap-2.25 rounded-[10px] bg-canvas p-2.75 text-muted">
          <Info size={17} />
          <span className="flex flex-col text-[9px] leading-normal">
            <b className="text-ink">Point temporaire</b>Il expirera dans 2 h sans nouvelle confirmation.
          </span>
        </div>
        <Button className="w-full"><Navigation size={18} /> Voir un itinéraire alternatif</Button>
      </div>
    </aside>
  );
}
