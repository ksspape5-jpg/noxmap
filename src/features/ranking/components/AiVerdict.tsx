import { useState } from "react";
import { CircleAlert, Loader2, RefreshCw, ScanEye, ShieldCheck } from "lucide-react";
import { LevelBadge } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import { Button, DemoBadge } from "@/shared/ui";
import { verifyDistrict, type FloodVerdict } from "../aiVerify";
import type { RankEntry, RankPeriod } from "../rankingData";

const CAPTION = "text-[9px] font-extrabold tracking-[.08em] text-muted uppercase";

type AiVerdictProps = { entry: RankEntry; period: RankPeriod };

type Status = "idle" | "loading" | "done";

function verdictStyle(verdict: FloodVerdict) {
  if (verdict.insufficient) {
    return {
      box: "bg-weather-soft text-weather-ink",
      label: "Donnée insuffisante",
      icon: <CircleAlert size={16} />,
    };
  }
  if (verdict.flooded) {
    return { box: "bg-danger-soft text-danger", label: "Inondation confirmée par l'IA", icon: <CircleAlert size={16} /> };
  }
  return {
    box: "bg-success-soft text-success",
    label: "Inondation non confirmée",
    icon: <ShieldCheck size={16} />,
  };
}

export default function AiVerdict({ entry, period }: AiVerdictProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [verdict, setVerdict] = useState<FloodVerdict | null>(null);
  const [simulated, setSimulated] = useState(false);
  const [cause, setCause] = useState("");

  const run = async () => {
    setStatus("loading");
    setCause("");
    const outcome = await verifyDistrict(entry, period);
    setVerdict(outcome.verdict);
    setSimulated(outcome.simulated);
    setCause(outcome.cause || "");
    setStatus("done");
  };

  const confidence = verdict ? Math.min(100, Math.max(0, Math.round(verdict.confidence || 0))) : 0;

  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-border bg-canvas/60 p-3.5">
      <div className="flex items-center justify-between">
        <span className={cn(CAPTION, "flex items-center gap-1.5")}>
          <ScanEye size={14} className="text-primary" /> Vérification IA
        </span>
        {status === "done" &&
          (simulated ? <DemoBadge /> : <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-extrabold text-muted">Confiance {confidence} %</span>)}
      </div>

      {status === "idle" && (
        <>
          <p className="text-[10.5px] leading-relaxed text-muted">
            L'IA croise les photos de terrain et les données du quartier pour confirmer si la zone est inondée ou non.
          </p>
          <Button variant="secondary" className="min-h-10 w-full text-xs" onClick={run}>
            <ScanEye size={15} /> Analyser cette zone
          </Button>
        </>
      )}

      {status === "loading" && (
        <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-3 text-muted">
          <Loader2 size={16} className="animate-spin text-primary" />
          <span className="text-[10.5px] font-semibold">Analyse photos + données en cours…</span>
        </div>
      )}

      {status === "done" && verdict && (
        <div className="flex flex-col gap-2">
          <div className={cn("flex flex-col gap-2 rounded-xl p-3", verdictStyle(verdict).box)}>
            <div className="flex items-center gap-2">
              {verdictStyle(verdict).icon}
              <b className="text-[11px] leading-tight">{verdictStyle(verdict).label}</b>
              {verdict.level && !verdict.insufficient && <LevelBadge level={verdict.level} className="ml-auto" />}
            </div>
            <p className="text-[10.5px] leading-relaxed">{verdict.reason}</p>
          </div>

          {simulated && (
            <p className="text-[9.5px] leading-relaxed text-muted italic">
              Appel IA indisponible ({cause}) — verdict simulé localement à partir des données de démonstration.
            </p>
          )}

          <span className="text-[9px] font-bold text-muted">
            Confiance {confidence} % · aide à la décision, non validée par la communauté
          </span>
          <span className="block h-1.75 overflow-hidden rounded-full bg-subtle">
            <i className="block h-full rounded-full bg-primary" style={{ width: `${confidence}%` }} />
          </span>

          <Button variant="ghost" className="min-h-9 w-full text-xs" onClick={run}>
            <RefreshCw size={14} /> Relancer l'analyse
          </Button>
        </div>
      )}
    </div>
  );
}
