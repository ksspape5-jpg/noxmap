import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

// Gabarit des pages de contenu (classement, à propos…) : marges et largeur max de 1120px.
export default function ContentPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main className={cn("px-6 pt-17.5 pb-22.5 max-md:px-3.75 max-md:pt-10.5 max-md:pb-8.75", className)}>
      <div className="mx-auto max-w-280">{children}</div>
    </main>
  );
}
