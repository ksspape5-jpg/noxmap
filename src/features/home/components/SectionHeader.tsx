import type { ReactNode } from "react";
import { Eyebrow } from "@/shared/ui";

type SectionHeaderProps = { eyebrow: string; title: string; children?: ReactNode };

// En-tête de section local à l'accueil : surtitre + titre en gras + zone optionnelle à droite.
export default function SectionHeader({ eyebrow, title, children }: SectionHeaderProps) {
  return (
    <div className="mb-7 flex items-end justify-between gap-5 max-md:items-start">
      <div>
        <Eyebrow className="text-[12px] tracking-[.1em]">{eyebrow}</Eyebrow>
        <h2 className="text-balance text-[32px] font-bold leading-[1.12] tracking-[-.035em] max-md:text-[26px]">{title}</h2>
      </div>
      {children}
    </div>
  );
}
