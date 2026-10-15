import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

// Petit surtitre en majuscules au-dessus d'un titre.
export default function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mb-2.5 text-[10px] font-extrabold tracking-[.12em] text-primary uppercase", className)}>
      {children}
    </p>
  );
}
