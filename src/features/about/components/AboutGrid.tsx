import { Info, Map as MapIcon, ShieldCheck, Waves } from "lucide-react";

const ABOUT_ITEMS = [
  { icon: Waves, title: "Le problème", text: "Après une forte pluie, l'information sur les rues impraticables circule difficilement entre quartiers." },
  { icon: MapIcon, title: "Notre réponse", text: "Un signalement simple, une carte partagée et des données lisibles pour orienter l'attention." },
  { icon: ShieldCheck, title: "Vie privée d'abord", text: "Pas de compte, pas d'adresse de maison. Les visages et plaques seront floutés dans une future version." },
  { icon: Info, title: "Nos limites", text: "Les informations sont citoyennes et peuvent être incomplètes. Cet outil ne remplace pas les secours." },
];

export default function AboutGrid() {
  return (
    <section className="grid grid-cols-2 gap-3.5 max-md:grid-cols-1">
      {ABOUT_ITEMS.map(({ icon: Icon, title, text }) => (
        <article key={title} className="rounded-2xl border border-border bg-white p-6.25">
          <span className="mb-5.5 grid size-10.75 place-items-center rounded-xl bg-primary-soft text-primary">
            <Icon />
          </span>
          <h2 className="text-lg">{title}</h2>
          <p className="mt-2 text-xs leading-[1.7] text-muted">{text}</p>
        </article>
      ))}
    </section>
  );
}
