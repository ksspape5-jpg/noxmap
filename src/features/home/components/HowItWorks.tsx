import { Fragment } from "react";
import { BellRing, ChevronRight, Map as MapIcon, MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";

const STEPS = [
  { number: "01", icon: MapPin, title: "Signaler", text: "Décrivez la rue et la hauteur d'eau en moins d'une minute, avec une photo si vous pouvez." },
  { number: "02", icon: MapIcon, title: "Voir", text: "Consultez la carte pour repérer les rues touchées et choisir un itinéraire plus sûr." },
  { number: "03", icon: BellRing, title: "Prévenir", text: "Partagez l'information : votre voisin, votre famille ou votre quartier en profite aussi." },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-310 px-6 pb-16 max-md:px-4.5 max-md:pb-10">
      <SectionHeader eyebrow="Simple et citoyen" title="Trois gestes pour mieux circuler">
        <span className="rounded-full bg-primary-soft px-3.5 py-1.5 text-[11px] font-bold text-primary-dark">
          En quelques minutes
        </span>
      </SectionHeader>
      <div className="flex items-stretch gap-3.5 max-md:flex-col">
        {STEPS.map(({ number, icon: Icon, title, text }, index) => (
          <Fragment key={number}>
            <article className="group relative flex flex-1 flex-col rounded-3xl border border-border bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_40px_rgba(16,35,28,.1)] max-md:p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-full bg-primary text-[15px] font-extrabold tracking-[-.02em] text-white shadow-brand">
                  {number}
                </span>
                <span className="grid size-11 place-items-center rounded-full bg-primary-soft text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                  <Icon size={20} aria-hidden />
                </span>
              </div>
              <h3 className="text-lg font-bold tracking-[-.01em]">{title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.65] text-muted">{text}</p>
            </article>
            {index < STEPS.length - 1 && (
              <div aria-hidden className="hidden flex-none items-center md:flex">
                <ChevronRight size={22} className="text-border-strong" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
