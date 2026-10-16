import { Star } from "lucide-react";
import { DemoBadge } from "@/shared/ui";
import SectionHeader from "./SectionHeader";

const TESTIMONIALS = [
  {
    name: "Awa Ndiaye",
    place: "Pikine",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80",
    quote: "Avant, je partais sans savoir si la route du marché était praticable. Maintenant je vérifie la carte en 30 secondes, ça m'évite de rebrousser chemin.",
  },
  {
    name: "Modou Fall",
    place: "Keur Massar",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80",
    quote: "Comme chauffeur, je préviens mes collègues des points noirs. On gagne du temps et on abîme moins les voitures.",
  },
  {
    name: "Fatou Sarr",
    place: "Thiaroye",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80",
    quote: "J'ai signalé une rue bloquée devant l'école. Le lendemain, des voisins avaient confirmé : l'info devient vraiment fiable.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-310 px-6 pb-16 max-md:px-4.5 max-md:pb-10">
      <SectionHeader eyebrow="Témoignages" title="Ce que disent les habitants">
        <DemoBadge />
      </SectionHeader>
      <div className="grid grid-cols-3 gap-3.5 max-md:grid-cols-1">
        {TESTIMONIALS.map(({ name, place, photo, quote }) => (
          <figure
            key={name}
            className="flex flex-col rounded-3xl border border-border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,35,28,.1)] max-md:p-5"
          >
            <div className="mb-4 flex gap-0.5" role="img" aria-label="Note : 5 étoiles sur 5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={16} aria-hidden className="fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="flex-1 text-[13.5px] leading-[1.7] text-ink/85">“{quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <img
                src={photo}
                alt={`Portrait de ${name}`}
                width={44}
                height={44}
                loading="lazy"
                className="size-11 flex-none rounded-full border border-border object-cover"
              />
              <div>
                <b className="block text-[13px]">{name}</b>
                <span className="text-[11px] text-muted">{place}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
