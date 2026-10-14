import { Check, ShieldCheck } from "lucide-react";
import { DemoBadge } from "@/shared/ui";
import type { ReportStep } from "../types";
import AssuranceStep from "./AssuranceStep";

export default function ReportAssurance({ step }: { step: ReportStep }) {
  return (
    <aside className="flex flex-col items-start bg-primary-dark px-7 py-9 text-white max-md:hidden">
      <DemoBadge className="border-white/22 bg-white/8 text-[#d9e5e1]" />
      <div className="mt-12.5 mb-5 grid size-13.5 place-items-center rounded-2xl bg-white/10 text-[#a7d0c4]">
        <ShieldCheck size={28} />
      </div>
      <h2 className="text-[25px] leading-[1.2] tracking-[-.035em]">Un signalement utile, sans compte.</h2>
      <p className="mt-2.75 text-[11px] leading-[1.7] text-[#b8c9c4]">
        Deux informations suffisent pour aider les habitants à éviter une rue inondée.
      </p>
      <ol className="my-7.5 flex w-full list-none flex-col gap-5 p-0">
        <AssuranceStep
          state={step === 1 ? "active" : "done"}
          marker={step === 1 ? "1" : <Check size={14} />}
          title="Placer le point"
          hint="Position approximative publique"
        />
        <AssuranceStep
          state={step === 2 ? "active" : "todo"}
          marker="2"
          title="Décrire le niveau"
          hint="Photo toujours facultative"
        />
      </ol>
      <div className="mt-auto flex w-full gap-2.25 rounded-xl border border-white/13 bg-white/6 p-3.25 text-[#a7d0c4]">
        <ShieldCheck size={18} />
        <span className="flex flex-col text-[9px] leading-normal text-border-strong">
          <b className="mb-0.5 text-[10px] text-white">Vie privée visible</b>
          Aucun nom, téléphone ou adresse personnelle n'est demandé.
        </span>
      </div>
    </aside>
  );
}
