import { CheckCircle2, FlaskConical, Hammer } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { DemoBadge, Eyebrow } from "@/shared/ui";

const COLUMNS = [
  {
    icon: CheckCircle2,
    tone: "text-success",
    dot: "bg-success",
    title: "Ce qui fonctionne",
    items: [
      "Navigation complète et responsive (accueil, carte, signaler, classement, à propos).",
      "Carte interactive Leaflet + OpenStreetMap.",
      "Parcours de signalement complet, en 2 étapes.",
      "Classement filtrable par période et indicateur, avec export CSV / GeoJSON / PDF.",
      "Assistant connecté à Gemini via l'API locale.",
      "Application installable (PWA), avec un cache hors ligne partiel.",
    ],
  },
  {
    icon: FlaskConical,
    tone: "text-ankle-ink",
    dot: "bg-ankle",
    title: "Données de démonstration",
    items: [
      "Signalements, chiffres et classement codés en dur dans le projet.",
      "Les niveaux d'eau affichés ne proviennent pas de capteurs réels.",
      "Aucun signalement n'est enregistré sur un serveur pour l'instant.",
    ],
  },
  {
    icon: Hammer,
    tone: "text-primary",
    dot: "bg-primary",
    title: "À venir",
    items: [
      "Enregistrement réel des signalements (API + base de données PostGIS).",
      "Alertes météo réelles.",
      "Lectures des photos, floutage des visages et plaques, détection des doublons.",
      "Version wolof validée par un locuteur natif.",
    ],
  },
];

export default function ProjectStatus() {
  return (
    <section className="my-10 max-md:my-7">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow>État du projet</Eyebrow>
          <h2 className="text-balance text-[30px] font-bold leading-[1.12] tracking-[-.035em] max-md:text-[24px]">
            Où en est la démonstration ?
          </h2>
        </div>
        <DemoBadge />
      </div>

      <div className="grid grid-cols-3 gap-3.5 max-md:grid-cols-1">
        {COLUMNS.map(({ icon: Icon, tone, dot, title, items }) => (
          <article key={title} className="rounded-2xl border border-border bg-white p-5.5 max-md:p-5">
            <h3 className={cn("mb-3 flex items-center gap-2 text-[15px] font-bold", tone)}>
              <Icon size={18} aria-hidden /> {title}
            </h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[12.5px] leading-[1.6] text-muted">
                  <span aria-hidden className={cn("mt-1.75 size-1.25 flex-none rounded-full", dot)} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
