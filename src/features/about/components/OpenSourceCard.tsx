import { Code2 } from "lucide-react";

export default function OpenSourceCard() {
  return (
    <section className="grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-[18px] bg-night p-7 text-white max-md:grid-cols-[auto_1fr]">
      <Code2 size={30} className="text-accent" />
      <div>
        <h2 className="text-lg">Ouvert par principe</h2>
        <p className="mt-1.25 text-[11px] leading-[1.6] text-night-muted">
          Le code est publié sous licence MIT. Une équipe de 4 contribue à cette démo avec le soutien de Galsen DEV et MLH.
        </p>
      </div>
      <a
        href="https://github.com/ksspape5-jpg/noxmap"
        className="flex min-h-11 items-center gap-1.75 rounded-[10px] border border-white/20 px-3.5 text-[11px] font-bold max-md:col-span-full max-md:justify-center"
      >
        <Code2 size={17} /> Explorer le projet
      </a>
    </section>
  );
}
