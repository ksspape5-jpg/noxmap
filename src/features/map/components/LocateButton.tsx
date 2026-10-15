import { LocateFixed } from "lucide-react";
import { cn } from "@/shared/lib/cn";

// Bouton « Ma position » : en haut à droite sur ordinateur, icône seule au-dessus du bouton de signalement sur mobile.
export default function LocateButton({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        "absolute top-4.5 right-5 z-400 flex h-11 items-center gap-1.75 rounded-[11px] bg-white px-3.25 text-[10px] font-bold text-primary shadow-[0_5px_16px_rgba(0,0,0,.14)]",
        "max-md:top-auto max-md:right-3 max-md:bottom-23 max-md:w-11.5 max-md:justify-center max-md:p-0",
        className,
      )}
      aria-label="Ma position"
    >
      <LocateFixed size={20} />
      <span className="max-md:hidden">Ma position</span>
    </button>
  );
}
