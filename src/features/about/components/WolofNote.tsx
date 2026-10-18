import { Eyebrow } from "@/shared/ui";

export default function WolofNote() {
  return (
    <section className="my-7 rounded-[20px] bg-primary-soft p-9.5 text-center max-md:px-4.5 max-md:py-7">
      <Eyebrow>Bienvenue</Eyebrow>
      <h2 className="text-balance text-[28px] font-bold leading-[1.15] tracking-[-.035em] max-md:text-[23px]">Dalal ak jàmm — soyez les bienvenus.</h2>
      <p className="mx-auto mt-2.5 max-w-162.5 text-pretty text-[11.5px] leading-[1.7] text-muted">
        Quelques contenus pourront être proposés en wolof. Toute traduction sera validée par un locuteur natif avant mise en ligne.
      </p>
    </section>
  );
}
