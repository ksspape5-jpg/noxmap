import { Car, Landmark, Store, Users } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import SectionHeader from "./SectionHeader";

const AUDIENCES = [
  { icon: Users, title: "Habitants & familles", text: "Savoir si la rue de l'école ou du marché est praticable avant de sortir.", tone: "bg-primary-soft text-primary" },
  { icon: Car, title: "Conducteurs & taxis", text: "Repérer les axes bloqués et choisir un itinéraire qui évite l'eau.", tone: "bg-ankle-soft text-ankle-ink" },
  { icon: Store, title: "Commerçants & livreurs", text: "Anticiper les rues coupées pour livrer sans rester bloqué.", tone: "bg-knee-soft text-knee-ink" },
  { icon: Landmark, title: "Associations & mairie", text: "Voir où l'eau s'accumule pour agir et prioriser les interventions.", tone: "bg-success-soft text-success" },
];

export default function UseCases() {
  return (
    <section className="mx-auto max-w-310 px-6 pb-16 max-md:px-4.5 max-md:pb-10">
      <SectionHeader eyebrow="À qui ça sert" title="Une info utile pour tout le monde" />
      <div className="grid grid-cols-4 gap-3.5 max-md:grid-cols-2">
        {AUDIENCES.map(({ icon: Icon, title, text, tone }) => (
          <article
            key={title}
            className="flex flex-col rounded-3xl border border-border bg-white p-5.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,35,28,.1)] max-md:p-4.5"
          >
            <span className={cn("mb-4 grid size-11 place-items-center rounded-2xl", tone)}>
              <Icon size={20} aria-hidden />
            </span>
            <h3 className="text-[14.5px] font-bold tracking-[-.01em]">{title}</h3>
            <p className="mt-1.5 text-[12.5px] leading-[1.6] text-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
