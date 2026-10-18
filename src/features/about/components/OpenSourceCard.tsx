import { Code2, FileText, HeartHandshake, Scale } from "lucide-react";

const REPO_URL = "https://github.com/ksspape5-jpg/noxmap";

const LINKS = [
  { href: REPO_URL, label: "Explorer le dépôt", icon: Code2 },
  { href: `${REPO_URL}/blob/main/CONTRIBUTING.md`, label: "Guide de contribution", icon: FileText },
  { href: `${REPO_URL}/blob/main/LICENSE`, label: "Licence MIT", icon: Scale },
];

export default function OpenSourceCard() {
  return (
    <section className="my-7 rounded-[18px] bg-night p-7 text-white max-md:p-5.5">
      <div className="flex items-start gap-5 max-md:flex-col max-md:gap-4">
        <Code2 size={30} aria-hidden className="flex-none text-accent" />
        <div>
          <h2 className="text-lg font-bold">Ouvert par principe</h2>
          <p className="mt-1.5 max-w-150 text-[12.5px] leading-[1.65] text-night-muted">
            Le code est publié sous <b className="font-bold text-white">licence MIT</b> : vous pouvez l'utiliser, le
            modifier et le redistribuer librement. Cette démo est portée par une équipe de 4 personnes avec le soutien de
            Galsen DEV et MLH, dans le cadre du Hacktoberfest 2026 Dakar.
          </p>
          <p className="mt-2 text-[12.5px] leading-[1.65] text-night-muted">
            Les contributions sont bienvenues : code, design, retours d'usage ou traduction en wolof.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 max-md:flex-col">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-white/20 px-4 text-[12px] font-bold transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent max-md:w-full"
          >
            <Icon size={17} aria-hidden /> {label}
          </a>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-2 text-[11px] text-night-muted">
        <HeartHandshake size={15} aria-hidden className="text-accent" />
        Projet citoyen, sans publicité et sans but lucratif.
      </p>
    </section>
  );
}
