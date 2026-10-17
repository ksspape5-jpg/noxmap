import { Camera, Check, Clock, MapPin, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Eyebrow } from "@/shared/ui";

const APPLIED = [
  "Aucun compte à créer : le signalement reste anonyme.",
  "Aucun nom, téléphone ou adresse personnelle demandé.",
  "Seule une position approximative est utilisée, jamais une adresse de maison.",
  "Une règle de confidentialité est confirmée avant chaque publication.",
  "Dans cette démo, les signalements et les photos ne sont pas enregistrés sur un serveur.",
];

const PLANNED = [
  "Floutage automatique des visages et des plaques d'immatriculation (détection d'objets).",
  "Modération des contenus (photos inappropriées, spam, abus).",
  "Conservation des données réellement encadrée, une fois l'enregistrement branché.",
];

function Item({ icon: Icon, children }: { icon: typeof Check; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[12.5px] leading-[1.6] text-muted">
      <Icon size={15} aria-hidden className="mt-0.5 flex-none text-primary" />
      <span>{children}</span>
    </li>
  );
}

export default function PrivacyCard() {
  return (
    <section className="my-10 max-md:my-7">
      <Eyebrow>Vie privée</Eyebrow>
      <h2 className="text-balance text-[30px] font-bold leading-[1.12] tracking-[-.035em] max-md:text-[24px]">
        Vos données, réduites au minimum.
      </h2>
      <p className="mt-3 max-w-190 text-pretty text-[13px] leading-[1.7] text-muted">
        Deux types de données sont concernés : une <b className="font-bold text-ink">position approximative</b> et, si
        vous le souhaitez, des <b className="font-bold text-ink">photos</b> (facultatives). Voici ce qui est déjà
        appliqué et ce qui reste à faire.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-[11px] font-bold text-primary-dark">
          <MapPin size={14} aria-hidden /> Position approximative
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-[11px] font-bold text-primary-dark">
          <Camera size={14} aria-hidden /> Photos facultatives
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3.5 max-md:grid-cols-1">
        <article className="rounded-2xl border border-border bg-white p-5.5 max-md:p-5">
          <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold">
            <ShieldCheck size={17} aria-hidden className="text-success" /> Appliqué aujourd'hui
          </h3>
          <ul className="space-y-2">
            {APPLIED.map((item) => (
              <Item key={item} icon={Check}>
                {item}
              </Item>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-dashed border-border-strong bg-subtle/60 p-5.5 max-md:p-5">
          <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold">
            <Clock size={17} aria-hidden className="text-ankle-ink" /> Prévu — pas encore actif
          </h3>
          <ul className="space-y-2">
            {PLANNED.map((item) => (
              <Item key={item} icon={Clock}>
                {item}
              </Item>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
