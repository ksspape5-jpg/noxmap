import type { ReactNode } from "react";
import { Eyebrow } from "@/shared/ui";

type SectionHeaderProps = { eyebrow: string; title: string; children?: ReactNode };

// En-tête de section local à l'accueil : surtitre + titre en gras + zone optionnelle à droite.
export default function SectionHeader({ eyebrow, title, children }: SectionHeaderProps) {
  return (
    <div className="mb-7 flex items-end justify-between gap-5 max-md:items-start">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-balance text-[28px] font-bold tracking-[-.035em] max-md:text-2xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
