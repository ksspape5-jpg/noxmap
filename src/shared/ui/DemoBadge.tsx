import { cn } from "@/shared/lib/cn";

export default function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "demo-badge inline-flex w-fit rounded-full border border-border-strong/60 bg-white/85 px-2.25 py-1.5 text-[9px] font-extrabold tracking-[.06em] text-muted uppercase",
        className,
      )}
    >
      Données de démonstration
    </span>
  );
}
