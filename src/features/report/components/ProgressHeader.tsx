import { cn } from "@/shared/lib/cn";
import type { ReportStep } from "../types";

type ProgressHeaderProps = { step: ReportStep; onBack: () => void };

export default function ProgressHeader({ step, onBack }: ProgressHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between text-[10px] font-bold text-muted">
        <button className="border-0 bg-transparent px-0 py-2 font-bold text-primary" onClick={onBack}>← Retour</button>
        <span>Étape {step} sur 2</span>
      </div>
      <div className="mt-2.5 mb-7 h-1 overflow-hidden rounded-full bg-subtle">
        <i className={cn("block h-full w-1/2 rounded-full bg-primary transition-all duration-200", step === 2 && "w-full")} />
      </div>
    </>
  );
}
