import { Check, Lock, ShieldCheck } from "lucide-react";
import { DemoBadge } from "@/shared/ui";
import type { ReportStep } from "../types";
import AssuranceStep from "./AssuranceStep";

export default function ReportAssurance({ step }: { step: ReportStep }) {
  return (
    <aside className="flex flex-col items-start bg-gradient-to-b from-primary-dark to-[#003d28] px-8 py-10 text-white max-md:hidden">
      <DemoBadge className="border-white/20 bg-white/8 text-white/85" />

      {/* Icon */}
      <div className="mt-14 mb-5 grid size-14 place-items-center rounded-2xl bg-white/10 text-accent backdrop-blur-sm">
        <ShieldCheck size={28} />
      </div>

      {/* Heading */}
      <h2 className="text-[26px] leading-[1.18] tracking-tight">
        Un signalement utile,
        <br />
        <span className="text-accent">sans compte.</span>
      </h2>
      <p className="mt-3 text-[12px] leading-[1.7] text-white/65">
        Deux informations suffisent pour aider les habitants à éviter une rue inondée.
      </p>

      {/* Step progress */}
      <ol className="my-9 flex w-full list-none flex-col gap-6 p-0">
        <AssuranceStep
          state={step === 1 ? "active" : "done"}
          marker={step === 1 ? "1" : <Check size={15} strokeWidth={3} />}
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

      {/* Privacy card */}
      <div className="mt-auto flex w-full gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <Lock size={18} className="flex-none text-accent" />
        <span className="flex flex-col text-[10px] leading-normal text-white/60">
          <b className="mb-0.5 text-[11px] text-white">Vie privée protégée</b>
          Aucun nom, téléphone ou adresse personnelle n'est demandé.
        </span>
      </div>
    </aside>
  );
}
