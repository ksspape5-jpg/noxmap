import { Info, Waves } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { LEVEL_BG, LEVELS, levelMeta, type Level } from "@/shared/flood";
import { Eyebrow } from "@/shared/ui";

// Couleur du texte sur la pastille de niveau (le jaune « cheville » demande un texte foncé).
const LEVEL_TEXT: Record<Level, string> = {
  ankle: "text-ankle-ink",
  knee: "text-white",
  waist: "text-white",
};

export default function LevelsGuide() {
  return (
    <section className="mx-auto max-w-310 px-6 py-16 max-md:px-4.5 max-md:py-10">
      <div className="grid grid-cols-[.95fr_1.05fr] items-center gap-14 max-md:grid-cols-1 max-md:gap-8">
        <div>
          <Eyebrow>Comprendre en un coup d'œil</Eyebrow>
          <h2 className="text-balance text-[34px] font-bold leading-[1.12] tracking-[-.04em] max-md:text-[26px]">
            Un code couleur pour décider vite où passer
          </h2>
          <p className="mt-4 max-w-110 text-pretty text-[15px] leading-[1.7] text-muted">
            Chaque point sur la carte indique la hauteur d'eau observée par un habitant. Plus le niveau est élevé,
            plus la rue est risquée. Un coup d'œil suffit pour choisir un autre chemin.
          </p>
          <p className="mt-6 flex items-start gap-2.5 rounded-2xl bg-primary-soft px-4.5 py-3.5 text-[12.5px] leading-[1.55] text-primary-dark">
            <Info size={16} className="mt-0.5 flex-none" aria-hidden />
            Les points noirs — niveau taille — sont des zones à éviter totalement pendant la pluie.
          </p>
        </div>
        <ul className="grid gap-3.5">
          {LEVELS.map((level) => (
            <li
              key={level}
              className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4.5 transition-shadow duration-200 hover:shadow-[0_12px_28px_rgba(16,35,28,.08)] max-md:p-4"
            >
              <span className={cn("grid size-12 flex-none place-items-center rounded-[14px]", LEVEL_BG[level], LEVEL_TEXT[level])}>
                <Waves size={23} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <b className="text-sm tracking-[-.01em]">{levelMeta[level].short}</b>
                <p className="mt-0.5 text-[12.5px] leading-[1.55] text-muted">{levelMeta[level].help}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
