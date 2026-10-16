import { Clock, HeartHandshake, MapPin, Users } from "lucide-react";

const FEATURES = [
  { icon: MapPin, title: "Dakar & sa banlieue", text: "Pikine, Guédiawaye, Keur Massar, Rufisque…" },
  { icon: Clock, title: "Presque en temps réel", text: "Les habitants signalent au fil de la journée." },
  { icon: Users, title: "100 % citoyen", text: "Chacun peut signaler et confirmer une rue." },
  { icon: HeartHandshake, title: "Gratuit & ouvert", text: "Sans compte, données ouvertes à tous." },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-white">
      <ul className="mx-auto grid max-w-310 grid-cols-4 gap-px bg-border max-md:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-start gap-3.5 bg-white px-6 py-7 max-md:px-4.5 max-md:py-5">
            <span className="grid size-10.5 flex-none place-items-center rounded-xl bg-primary-soft text-primary">
              <Icon size={20} aria-hidden />
            </span>
            <div>
              <b className="block text-[13px] tracking-[-.01em]">{title}</b>
              <span className="mt-1 block text-[11px] leading-[1.5] text-muted">{text}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
