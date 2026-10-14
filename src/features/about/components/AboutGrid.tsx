import { Info, Map as MapIcon, ShieldCheck, Waves } from "lucide-react";

const ABOUT_ITEMS = [
  { icon: Waves, title: "Le problème", text: "Après une forte pluie, l'information sur les rues impraticables circule difficilement entre quartiers." },
  { icon: MapIcon, title: "Notre réponse", text: "Un signalement simple, une carte partagée et des données lisibles pour orienter l'attention." },
  { icon: ShieldCheck, title: "Vie privée d'abord", text: "Pas de compte, pas d'adresse de maison. Les visages et plaques seront floutés dans une future version." },
  { icon: Info, title: "Nos limites", text: "Les informations sont citoyennes et peuvent être incomplètes. Cet outil ne remplace pas les secours." },
];

export default function AboutGrid() {
  return (
    <section className="about-grid">
      {ABOUT_ITEMS.map(({ icon: Icon, title, text }) => (
        <article key={title}><span><Icon /></span><h2>{title}</h2><p>{text}</p></article>
      ))}
    </section>
  );
}
