import { Plus } from "lucide-react";
import { Eyebrow } from "@/shared/ui";

const QUESTIONS = [
  { q: "C'est gratuit ?", a: "Oui, entièrement gratuit, sans publicité et sans but lucratif." },
  { q: "Faut-il créer un compte ?", a: "Non. Vous pouvez signaler sans inscription, de façon anonyme." },
  { q: "D'où viennent les informations ?", a: "Des signalements des habitants. Les chiffres affichés ici relèvent encore d'une démonstration." },
  { q: "Les signalements sont-ils fiables ?", a: "Chaque point peut être confirmé par d'autres habitants. L'IA aide à lire les photos, mais ne décide jamais seule d'une urgence." },
  { q: "Est-ce que ça remplace les secours ?", a: "Non. C'est une aide citoyenne. En cas de danger, contactez les services officiels." },
  { q: "Ça marche sur mon téléphone ?", a: "Oui, le site est pensé pour le mobile, même avec une connexion lente." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-border bg-white px-5.5 py-5 transition-colors duration-200 open:border-primary/30 open:bg-primary-soft/40 max-md:px-4.5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14.5px] font-bold tracking-[-.01em] [&::-webkit-details-marker]:hidden">
        {q}
        <Plus size={20} aria-hidden className="flex-none text-primary transition-transform duration-200 group-open:rotate-45" />
      </summary>
      <p className="mt-3 text-[13.5px] leading-[1.65] text-muted">{a}</p>
    </details>
  );
}

export default function Faq() {
  return (
    <section className="mx-auto max-w-310 px-6 pb-16 max-md:px-4.5 max-md:pb-10">
      <div className="mb-8 max-w-150 max-md:mb-6">
        <Eyebrow className="text-[12px] tracking-[.1em]">Questions fréquentes</Eyebrow>
        <h2 className="text-balance text-[32px] font-bold leading-[1.12] tracking-[-.04em] max-md:text-[26px]">
          Vous vous demandez…
        </h2>
        <p className="mt-4 text-pretty text-[14.5px] leading-[1.7] text-muted">
          Les réponses aux questions les plus courantes avant de vous lancer.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid content-start gap-3">
          {QUESTIONS.slice(0, 3).map((item) => <FaqItem key={item.q} {...item} />)}
        </div>
        <div className="grid content-start gap-3">
          {QUESTIONS.slice(3).map((item) => <FaqItem key={item.q} {...item} />)}
        </div>
      </div>
    </section>
  );
}
