import { BellRing, Map as MapIcon, MapPin } from "lucide-react";
import { SectionHeading } from "@/shared/ui";

const STEPS = [
  { number: "01", icon: MapPin, title: "Signaler", text: "Indiquez le lieu et le niveau d'eau en moins d'une minute." },
  { number: "02", icon: MapIcon, title: "Voir", text: "Consultez la carte et évitez les rues les plus touchées." },
  { number: "03", icon: BellRing, title: "Prévenir", text: "Partagez une information utile avec votre quartier." },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-310 px-6 pt-12 pb-16 max-md:px-4.5 max-md:py-8.5">
      <SectionHeading eyebrow="Simple et citoyen" title="Trois gestes pour mieux circuler" />
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {STEPS.map(({ number, icon: Icon, title, text }) => (
          <article key={number} className="relative overflow-hidden rounded-[18px] border border-border bg-white p-7 max-md:p-5.5">
            <span className="absolute top-3 right-4.5 text-[44px] font-extrabold text-primary-soft">{number}</span>
            <div className="mb-6 grid size-12.5 place-items-center rounded-[15px] bg-primary-soft text-primary"><Icon /></div>
            <h3 className="mb-2 text-lg">{title}</h3>
            <p className="text-[13px] leading-[1.65] text-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
