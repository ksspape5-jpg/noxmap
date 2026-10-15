import { Eyebrow } from "@/shared/ui";

export default function AiPrinciples() {
  return (
    <section className="my-7 rounded-[20px] bg-primary-soft p-9.5 text-center max-md:px-4.5 max-md:py-7">
      <Eyebrow>Principes</Eyebrow>
      <h2 className="text-[28px] max-md:text-[23px]">Ce que l'IA ne fait pas.</h2>
      <p className="mx-auto mt-2.5 max-w-162.5 text-[11px] leading-[1.7] text-muted">
        Elle ne décide jamais seule d'une urgence, elle n'invente pas d'information — elle répond « donnée insuffisante »
        quand elle ne sait pas — et elle indique toujours un niveau de confiance.
      </p>
    </section>
  );
}
