import { ChevronLeft } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { ReportStep } from "../types";

type ProgressHeaderProps = { step: ReportStep; onBack: () => void };

const STEP_LABELS = ["Localisation", "Niveau d'eau"] as const;

export default function ProgressHeader({ step, onBack }: ProgressHeaderProps) {
  return (
    <div className="mb-8 max-md:mb-6">
      {/* Top row: back + step counter */}
      <div className="flex items-center justify-between">
        <button
          className="group flex items-center gap-1 border-0 bg-transparent px-0 py-2 text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
          onClick={onBack}
        >
          <ChevronLeft
            size={18}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Retour
        </button>
        <span className="rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold text-primary">
          Étape {step}/2
        </span>
      </div>

      {/* Step indicator pills */}
      <div className="mt-4 flex items-center gap-2">
        {STEP_LABELS.map((label, i) => {
          const stepNum = (i + 1) as 1 | 2;
          const isActive = step === stepNum;
          const isDone = step > stepNum;
          return (
            <div key={label} className="flex flex-1 flex-col gap-1.5">
              <div
                className={cn(
                  "h-1.5 w-full overflow-hidden rounded-full transition-all duration-500",
                  isDone || isActive ? "bg-primary" : "bg-border",
                )}
              >
                {isActive && !isDone && (
                  <div className="h-full w-full origin-left animate-[grow_0.4s_ease-out_forwards] rounded-full bg-primary" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold transition-colors",
                  isActive ? "text-primary" : isDone ? "text-muted" : "text-border-strong",
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
