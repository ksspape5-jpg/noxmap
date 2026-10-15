import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

// Fond de page commun au formulaire et à la confirmation (72px / 62px = hauteur de l'en-tête).
export default function FormPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main
      className={cn(
        "relative flex min-h-[calc(100vh-72px)] items-start justify-center px-6 pt-14 pb-24",
        "bg-gradient-to-b from-canvas via-canvas to-subtle",
        "max-md:min-h-[calc(100vh-62px)] max-md:bg-white max-md:px-4 max-md:pt-6 max-md:pb-8",
        className,
      )}
    >
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden max-md:hidden">
        <div className="absolute -top-[200px] -right-[100px] size-[500px] rounded-full bg-primary/[.03]" />
        <div className="absolute -bottom-[150px] -left-[80px] size-[400px] rounded-full bg-accent/[.04]" />
      </div>
      {children}
    </main>
  );
}
