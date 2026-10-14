import { BellRing, Map as MapIcon, MapPin } from "lucide-react";

const STEPS = [
  { number: "01", icon: MapPin, title: "Signaler", text: "Indiquez le lieu et le niveau d'eau en moins d'une minute." },
  { number: "02", icon: MapIcon, title: "Voir", text: "Consultez la carte et évitez les rues les plus touchées." },
  { number: "03", icon: BellRing, title: "Prévenir", text: "Partagez une information utile avec votre quartier." },
];

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="section-heading"><div><p className="eyebrow">Simple et citoyen</p><h2>Trois gestes pour mieux circuler</h2></div></div>
      <div className="steps-grid">
        {STEPS.map(({ number, icon: Icon, title, text }) => (
          <article key={number}><span>{number}</span><div className="step-icon"><Icon /></div><h3>{title}</h3><p>{text}</p></article>
        ))}
      </div>
    </section>
  );
}
