import { BellRing, CloudRain, FileText, Layers3, MapPin, ShieldCheck, Sparkles, TrendingUp, Waves } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { SectionHeading } from "@/shared/ui";

const ROADMAP_ITEMS = [
  ["Lecture des photos (hauteur, confiance)", "MVP", Sparkles],
  ["Floutage des visages et plaques", "MVP", ShieldCheck],
  ["Détection des doublons", "MVP", Layers3],
  ["Messages vocaux (français, wolof)", "V2", Waves],
  ["Lieu depuis un texte ou un vocal", "V2", MapPin],
  ["Réponses WhatsApp depuis la carte", "V2", BellRing],
  ["Modération des contenus", "V2", ShieldCheck],
  ["Rapports automatiques pour la mairie", "V3", FileText],
  ["Prédiction des quartiers à risque", "V3", TrendingUp],
  ["Alertes météo réelles", "V3", CloudRain],
] as const;

const PRIORITY_COLORS = {
  MVP: "text-primary",
  V2: "text-ankle-ink",
  V3: "text-waist",
};

export default function Roadmap({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "mx-auto mb-16 max-w-298 rounded-3xl bg-primary-soft px-6 py-16",
        "max-md:mx-3 max-md:mt-2.5 max-md:mb-8.75 max-md:rounded-[20px] max-md:px-4.5 max-md:py-8.5",
        className,
      )}
    >
      <SectionHeading eyebrow="Feuille de route IA" title="Ce que nous voulons construire ensuite">
        <span className="rounded-full bg-accent px-2.75 py-1.75 text-[10px] font-extrabold tracking-[.08em] text-night uppercase">
          Bientôt
        </span>
      </SectionHeading>
      <p className="-mt-3 mb-6 text-[13px] text-muted">
        Ces fonctions présentent notre vision. Elles ne sont pas encore actives dans cette démo. Le premier prototype se
        concentre sur la lecture des photos, le floutage des visages et plaques, et la détection des doublons.
      </p>
      <div className="grid grid-cols-5 gap-2.5 max-md:grid-cols-2">
        {ROADMAP_ITEMS.map(([label, priority, Icon]) => (
          <div
            key={label}
            className="flex min-h-28 flex-col items-start rounded-[14px] border border-white bg-white/70 p-4"
          >
            <Icon size={21} className="mb-3.5 text-primary" />
            <span className="flex-1 text-xs font-bold max-md:text-[10px]">{label}</span>
            <small className={cn("text-[9px] font-extrabold uppercase", PRIORITY_COLORS[priority])}>{priority}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
