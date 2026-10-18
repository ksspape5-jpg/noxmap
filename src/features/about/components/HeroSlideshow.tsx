import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/cn";

const SLIDES = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Rue_inond%C3%A9e_%C3%A0_Hann_Maristes.jpg/1280px-Rue_inond%C3%A9e_%C3%A0_Hann_Maristes.jpg",
    alt: "Rue inondée à Hann Maristes, à Dakar, pendant l'hivernage.",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/DakarFlood2005.jpg/1280px-DakarFlood2005.jpg",
    alt: "Inondation à Dakar en 2005 : une rue recouverte par les eaux.",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Children_in_a_flooded_street_in_Senegal_%281588%29.jpg/1280px-Children_in_a_flooded_street_in_Senegal_%281588%29.jpg",
    alt: "Enfants traversant une rue inondée au Sénégal.",
  },
];

const INTERVAL_MS = 5000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;

  useEffect(() => {
    if (count < 2) return;
    const media = typeof window.matchMedia === "function" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    if (media?.matches) return;
    const id = window.setInterval(() => setIndex((current) => (current + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <figure className="m-0">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-border bg-subtle shadow-[0_18px_50px_rgba(16,35,28,.12)]">
        {SLIDES.map(({ src, alt }, i) => {
          const active = i === index;
          return (
            <div
              key={src}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-out",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              <img
                src={src}
                alt={alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className={cn(
                  "size-full object-cover transition-transform duration-[6000ms] ease-out",
                  active ? "scale-110" : "scale-100",
                )}
              />
            </div>
          );
        })}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent"
        />

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2" aria-label="Choisir une photo">
          {SLIDES.map(({ src, alt }, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index}
              aria-label={`Afficher la photo ${i + 1} sur ${count} : ${alt}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                i === index ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-[11px] leading-normal text-muted">
        Photos d'illustration : Zythème (CC0), MyriamLouviot (CC BY 3.0) et domaine public —{" "}
        <a
          href="https://commons.wikimedia.org/wiki/Category:Floods_in_Senegal"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-primary"
        >
          Wikimedia Commons
        </a>
        .
      </figcaption>
    </figure>
  );
}
