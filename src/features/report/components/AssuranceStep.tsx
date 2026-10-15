import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type StepState = "active" | "done" | "todo";

const BULLET_STATE: Record<StepState, string> = {
  active: "border-white bg-white text-primary-dark shadow-[0_2px_8px_rgba(255,255,255,.3)]",
  done: "border-accent bg-accent text-night",
  todo: "border-white/25 bg-white/5",
};

type AssuranceStepProps = { state: StepState; marker: ReactNode; title: string; hint: string };

// Étape de la liste du panneau latéral : estompée tant qu'elle n'est pas atteinte.
export default function AssuranceStep({ state, marker, title, hint }: AssuranceStepProps) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 transition-all duration-300",
        state === "todo" ? "opacity-40" : "opacity-100",
      )}
    >
      <span
        className={cn(
          "grid size-9 flex-none place-items-center rounded-full border-2 text-[11px] font-extrabold transition-all duration-300",
          BULLET_STATE[state],
        )}
      >
        {marker}
      </span>
      <div className="flex flex-col">
        <b className="text-[12px]">{title}</b>
        <small className="mt-0.5 text-[10px] text-white/55">{hint}</small>
      </div>
    </li>
  );
}
