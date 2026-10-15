import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

type SectionHeadingProps = { eyebrow: string; title: string; children?: ReactNode };

// En-tête de section : surtitre + titre à gauche, élément optionnel (badge…) à droite.
export default function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className="mb-7 flex items-end justify-between gap-5 max-md:items-start">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-[28px] tracking-[-.035em] max-md:text-2xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
