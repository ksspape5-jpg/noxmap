import { Info, Map as MapIcon, Megaphone, PenLine, ShieldCheck, Waves } from "lucide-react";
import { Eyebrow } from "@/shared/ui";

const MISSION = [
  {
    icon: Waves,
    title: "Le problème",
    text: "À chaque saison des pluies, des rues deviennent impraticables et l'information met du temps à circuler d'un quartier à l'autre.",
  },
  {
    icon: MapIcon,
    title: "Notre réponse",
    text: "Une carte citoyenne et sans compte, où chacun peut signaler une rue inondée et consulter les zones à éviter.",
  },
  {
    icon: ShieldCheck,
    title: "Vie privée d'abord",
    text: "Aucun compte, aucun nom, aucune adresse de maison publiée. Le floutage des visages et plaques est prévu mais pas encore actif.",
  },
  {
    icon: Info,
    title: "Nos limites",
    text: "Les signalements sont citoyens et parfois incomplets. L'outil aide à réagir, il ne remplace ni les secours ni les alertes officielles.",
  },
];

const STEPS = [
  {
    number: "01",
    icon: PenLine,
    title: "Signaler",
    text: "Un habitant place une rue et choisit un niveau d'eau (cheville, genou ou taille). C'est la matière première de la carte.",
  },
  {
    number: "02",
    icon: MapIcon,
    title: "Voir",
    text: "Les signalements s'affichent sur la carte partagée avec leur niveau et leur heure, pour éviter les rues risquées.",
  },
  {
    number: "03",
    icon: Megaphone,
    title: "Prévenir",
    text: "Une information visible par tous aide à prévenir son entourage et à orienter l'attention vers les zones les plus touchées.",
  },
];

export default function AboutGrid() {
  return (
    <section className="my-10 max-md:my-7">
      <Eyebrow>Notre mission</Eyebrow>
      <h2 className="text-balance text-[30px] font-bold leading-[1.12] tracking-[-.035em] max-md:text-[24px]">
        Rendre l'information plus lisible, ensemble.
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3.5 max-md:grid-cols-1">
        {MISSION.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-2xl border border-border bg-white p-6.25 max-md:p-5">
            <span className="mb-5.5 grid size-10.75 place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon aria-hidden />
            </span>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-2 text-[13px] leading-[1.7] text-muted">{text}</p>
          </article>
        ))}
      </div>

      <h3 className="mt-12 text-[22px] font-bold tracking-[-.03em] max-md:mt-9 max-md:text-[19px]">
        Comment ça fonctionne ?
      </h3>
      <div className="mt-4 grid grid-cols-3 gap-3.5 max-md:grid-cols-1">
        {STEPS.map(({ number, icon: Icon, title, text }) => (
          <article key={number} className="rounded-2xl border border-border bg-white p-5.5 max-md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-full bg-primary text-[13px] font-extrabold text-white">
                {number}
              </span>
              <Icon size={20} aria-hidden className="text-primary" />
            </div>
            <h4 className="text-[15px] font-bold">{title}</h4>
            <p className="mt-2 text-[12.5px] leading-[1.65] text-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
