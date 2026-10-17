import { Bot, Check, ShieldAlert, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Eyebrow } from "@/shared/ui";

const WIRED = [
  "Un assistant qui répond aux questions d'usage, disponible via le bouton ✨.",
  "Un modèle Gemini, appelé par une petite API locale (server/) : la clé n'est jamais exposée dans le navigateur.",
  "Une base de connaissances locale consultée par mots-clés (extraits pertinents, sans base vectorielle).",
  "Le contexte de la page et l'historique de la conversation.",
  "Une interface en français et en wolof (traductions à valider par un locuteur natif).",
];

const LIMITS = [
  "Elle propose mais ne décide jamais seule d'une urgence : la communauté ou un responsable confirme.",
  "Elle peut se tromper et n'invente pas d'information : si les données manquent, elle répond « donnée insuffisante ».",
  "Elle est invitée à indiquer un niveau de confiance plutôt qu'une certitude.",
];

const TOOLS = [
  "Gemini — modèle configurable via GEMINI_MODEL (défaut : gemini-3.1-flash-lite).",
  "Express (API locale) — relais sécurisé entre le front et Gemini.",
  "Figma Make — design de départ de l'interface (à confirmer par l'équipe).",
  // TODO: lister les autres outils IA de développement réellement utilisés (à confirmer par l'équipe).
  "Autres outils IA de développement — à préciser.",
];

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[12.5px] leading-[1.6] text-muted">
      <Check size={15} aria-hidden className="mt-0.5 flex-none text-primary" />
      <span>{children}</span>
    </li>
  );
}

export default function AiPrinciples() {
  return (
    <section className="my-7 rounded-[20px] bg-primary-soft p-9.5 max-md:px-4.5 max-md:py-7">
      <div className="max-w-190">
        <Eyebrow>Intelligence artificielle</Eyebrow>
        <h2 className="text-balance text-[28px] font-bold leading-[1.15] tracking-[-.035em] max-md:text-[23px]">
          Un assistant qui propose, jamais qui décide seul.
        </h2>
        <p className="mt-3 text-pretty text-[13px] leading-[1.7] text-muted">
          Aujourd'hui, la seule IA réellement branchée est l'assistant de l'application. Le reste (lecture des photos,
          floutage des visages et plaques, détection des doublons) fait partie de la feuille de route.
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3.5 max-md:grid-cols-1">
        <article className="rounded-2xl border border-white bg-white/80 p-5.5">
          <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold">
            <Bot size={17} aria-hidden className="text-primary" /> Ce qui est branché aujourd'hui
          </h3>
          <ul className="space-y-2">
            {WIRED.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-white bg-white/80 p-5.5">
          <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold">
            <ShieldAlert size={17} aria-hidden className="text-primary" /> Limites et garde-fous
          </h3>
          <ul className="space-y-2">
            {LIMITS.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </article>
      </div>

      <article className="mt-3.5 rounded-2xl border border-white bg-white/80 p-5.5">
        <h3 className="mb-3 flex items-center gap-2 text-[15px] font-bold">
          <Sparkles size={17} aria-hidden className="text-primary" /> Outils, modèles et APIs déclarés
        </h3>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 max-md:grid-cols-1">
          {TOOLS.map((item) => (
            <Bullet key={item}>{item}</Bullet>
          ))}
        </ul>
      </article>
    </section>
  );
}
