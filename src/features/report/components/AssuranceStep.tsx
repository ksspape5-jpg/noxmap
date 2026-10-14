import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type StepState = "active" | "done" | "todo";

const BULLET_STATE: Record<StepState, string> = {
  active: "border-white bg-white text-primary-dark",
  done: "border-[#7eb09f] bg-[#7eb09f] text-white",
  todo: "",
};

type AssuranceStepProps = { state: StepState; marker: ReactNode; title: string; hint: string };

// Étape de la liste du panneau latéral : estompée tant qu'elle n'est pas atteinte.
export default function AssuranceStep({ state, marker, title, hint }: AssuranceStepProps) {
  return (
    <li className={cn("flex items-center gap-2.75", state === "todo" ? "opacity-48" : "opacity-100")}>
      <span
        className={cn(
          "grid size-7.75 flex-none place-items-center rounded-full border border-[#708a82] text-[10px] font-extrabold",
          BULLET_STATE[state],
        )}
      >
        {marker}
      </span>
      <div className="flex flex-col">
        <b className="text-[11px]">{title}</b>
        <small className="mt-0.75 text-[9px] text-[#9eb2ac]">{hint}</small>
      </div>
    </li>
  );
}
