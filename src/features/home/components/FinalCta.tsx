import { Map as MapIcon, Plus, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui";

export default function FinalCta() {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-298 px-6 pb-16 max-md:px-4.5 max-md:pb-10">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-primary px-10 py-14 text-white shadow-brand-lg max-md:rounded-3xl max-md:px-6 max-md:py-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-16 -top-24 size-80 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-28 -left-10 size-72 rounded-full bg-accent/20 blur-3xl" />
          <Waves className="absolute -bottom-8 right-8 size-56 text-white/5" />
        </div>
        <div className="relative flex items-center justify-between gap-10 max-md:flex-col max-md:items-stretch max-md:gap-7">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-white/70">À vous de jouer</p>
            <h2 className="mt-2.5 text-balance text-[34px] font-extrabold leading-[1.1] tracking-[-.04em] max-md:text-[26px]">
              Vous voyez une rue inondée ?
            </h2>
            <p className="mt-3.5 max-w-130 text-pretty text-[14.5px] leading-[1.65] text-white/80">
              Signalez-la en moins d'une minute. Votre point aide tout le quartier à éviter les zones dangereuses.
            </p>
            <p className="mt-4 text-[11px] font-semibold text-white/60">Sans compte · Anonyme · Quelques secondes</p>
          </div>
          <div className="flex flex-none gap-3 max-md:w-full max-md:flex-col">
            <Button variant="secondary" className="group active:scale-[.98]" onClick={() => navigate("/signaler")}>
              <Plus size={19} aria-hidden className="transition-transform duration-200 group-hover:rotate-90" /> Ici c'est inondé
            </Button>
            <Button
              className="group border-white/40 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[.98]"
              onClick={() => navigate("/carte")}
            >
              <MapIcon size={19} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" /> Voir la carte
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
