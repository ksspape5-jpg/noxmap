import { Code2 } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
      className={
        "grid min-h-45 grid-cols-[1.2fr_2fr_1fr] items-center gap-6 bg-night px-page py-10 text-white " +
        // Sur mobile, le pied de page passe sous la barre de navigation fixe.
        "max-md:-mb-18 max-md:flex max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-4.5 max-md:pt-8.5 max-md:pb-25"
      }
    >
      <div className="flex items-center gap-3 text-[13px]">
        <Logo />
        <b>Un outil citoyen, construit au grand jour.</b>
      </div>
      <p className="text-[11px] leading-[1.6] text-night-muted">
        Projet open source pour mieux comprendre et partager les risques d'inondation.
      </p>
      <a href="https://github.com" target="_blank" rel="noreferrer" className="flex gap-1.75 text-xs font-bold">
        <Code2 size={16} /> Voir sur GitHub
      </a>
      <span className="col-span-full border-t border-white/10 pt-4.5 text-[10px] text-night-muted/60">
        Hacktoberfest 2026 Dakar — Galsen DEV
      </span>
    </footer>
  );
}
