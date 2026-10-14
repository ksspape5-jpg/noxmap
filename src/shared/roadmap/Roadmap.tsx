import { BellRing, CloudRain, Layers3, Sparkles, Waves } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { SectionHeading } from "@/shared/ui";

const ROADMAP_ITEMS = [
  ["Analyse IA des photos", Sparkles],
  ["Bot WhatsApp", BellRing],
  ["Alertes météo réelles", CloudRain],
  ["Version wolof audio", Waves],
  ["Carte de risque", Layers3],
] as const;

export default function Roadmap({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "mx-auto mb-16 max-w-298 rounded-3xl bg-primary-soft px-6 py-16",
        "max-md:mx-3 max-md:mt-2.5 max-md:mb-8.75 max-md:rounded-[20px] max-md:px-4.5 max-md:py-8.5",
        className,
      )}
    >
      <SectionHeading eyebrow="Feuille de route" title="Ce que nous voulons construire ensuite">
        <span className="rounded-full bg-accent px-2.75 py-1.75 text-[10px] font-extrabold tracking-[.08em] text-night uppercase">
          Bientôt
        </span>
      </SectionHeading>
      <p className="-mt-3 mb-6 text-[13px] text-muted">
        Ces fonctions présentent notre vision. Elles ne sont pas encore actives dans cette démo.
      </p>
      <div className="grid grid-cols-5 gap-2.5 max-md:grid-cols-2">
        {ROADMAP_ITEMS.map(([label, Icon]) => (
          <div
            key={label}
            className="flex min-h-28 flex-col items-start rounded-[14px] border border-white bg-white/70 p-4 max-md:last:col-span-full max-md:last:min-h-21.25"
          >
            <Icon size={21} className="mb-3.5 text-primary" />
            <span className="flex-1 text-xs font-bold max-md:text-[10px]">{label}</span>
            <small className="text-[9px] text-muted uppercase">Bientôt</small>
          </div>
        ))}
      </div>
    </section>
  );
}
