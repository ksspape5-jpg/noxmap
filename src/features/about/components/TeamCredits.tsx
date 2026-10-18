import { AlertTriangle, Handshake } from "lucide-react";
import { Eyebrow } from "@/shared/ui";

// Rôles établis à partir des contributions de chaque membre dans l'historique Git.
const MEMBERS = [
  { name: "Djibril Diasse", role: "Produit / idées & tests" },
  { name: "Amacodou Ndiaye", role: "Architecture & fonctionnalité Signalement" },
  { name: "Papa Assane Kasse", role: "Mainteneur & IA/PWA" },
  { name: "Mouhamadou Moustapha Fall", role: "Front-end (Accueil & À propos)" },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function TeamCredits() {
  return (
    <section className="my-10 max-md:my-7">
      <Eyebrow>L'équipe</Eyebrow>
      <h2 className="text-balance text-[30px] font-bold leading-[1.12] tracking-[-.035em] max-md:text-[24px]">
        Une petite équipe, un projet citoyen.
      </h2>
      <p className="mt-3 max-w-190 text-pretty text-[13px] leading-[1.7] text-muted">
        NdoxMap est développé par une équipe de 4 personnes, dans le cadre du Hacktoberfest 2026 Dakar.
      </p>

      <div className="mt-6 grid grid-cols-4 gap-3.5 max-md:grid-cols-2">
        {MEMBERS.map(({ name, role }) => (
          <article
            key={name}
            className="flex flex-col items-center rounded-2xl border border-border bg-white p-5 text-center max-md:p-4"
          >
            <span className="mb-3 grid size-12 place-items-center rounded-full bg-primary-soft text-[13px] font-bold text-primary">
              {initials(name)}
            </span>
            <h3 className="text-[13.5px] font-bold">{name}</h3>
            <p className="mt-1 text-[11.5px] leading-[1.4] text-muted">{role}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-border bg-white p-5 max-md:p-4">
        <Handshake size={19} aria-hidden className="mt-0.5 flex-none text-accent" />
        <p className="text-[12.5px] leading-[1.65] text-muted">
          Remerciements à <b className="font-bold text-ink">Galsen DEV</b> et <b className="font-bold text-ink">MLH</b>{" "}
          pour l'organisation du Hacktoberfest 2026 Dakar et le soutien à ce projet.
        </p>
      </div>

      <p className="mt-3.5 flex items-start gap-2.5 rounded-2xl border border-ankle-soft bg-ankle-soft/50 px-4 py-3 text-[12.5px] leading-[1.6] text-ankle-ink max-md:px-3.5">
        <AlertTriangle size={17} aria-hidden className="mt-0.5 flex-none" />
        <span>Pour rappel : cet outil aide à réagir ; il ne remplace ni les secours ni les alertes officielles.</span>
      </p>
    </section>
  );
}
