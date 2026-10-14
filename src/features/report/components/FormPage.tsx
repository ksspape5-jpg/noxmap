import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

// Fond de page commun au formulaire et à la confirmation (72px / 62px = hauteur de l'en-tête).
export default function FormPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main
      className={cn(
        "flex min-h-[calc(100vh-72px)] items-start justify-center bg-subtle px-5 pt-12.5 pb-22.5",
        "max-md:min-h-[calc(100vh-62px)] max-md:bg-white max-md:px-3 max-md:pt-5 max-md:pb-7.5",
        className,
      )}
    >
      {children}
    </main>
  );
}
