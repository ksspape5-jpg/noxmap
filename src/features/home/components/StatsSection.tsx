import { Clock, MapPin, ThumbsUp, TrendingUp, Waves } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { DemoBadge } from "@/shared/ui";
import SectionHeader from "./SectionHeader";

const STATS = [
  { value: "72", label: "signalements actifs", note: "+16 depuis ce matin", trend: true, icon: Waves, tone: "bg-primary-soft text-primary" },
  { value: "5", label: "quartiers touchés", note: "sur la zone de démo", icon: MapPin, tone: "bg-ankle-soft text-ankle-ink" },
  { value: "8 min", label: "dernier point noir", note: "à Keur Massar", icon: Clock, tone: "bg-knee-soft text-knee-ink" },
  { value: "18", label: "points confirmés", note: "par plusieurs habitants", icon: ThumbsUp, tone: "bg-success-soft text-success" },
];

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-310 px-6 pb-16 max-md:px-4.5 max-md:pb-10">
      <SectionHeader eyebrow="La situation aujourd'hui" title="Les rues suivies en direct">
        <DemoBadge />
      </SectionHeader>
      <div className="grid grid-cols-4 gap-3.5 max-md:grid-cols-2">
        {STATS.map(({ value, label, note, trend, icon: Icon, tone }) => (
          <article
            key={label}
            className="group rounded-3xl border border-border bg-white p-5.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,35,28,.1)] max-md:p-4.5"
          >
            <div className="flex items-center justify-between">
              <span className={cn("grid size-10 place-items-center rounded-xl", tone)}>
                <Icon size={19} aria-hidden />
              </span>
              {trend && (
                <span className="flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.75 text-[10px] font-bold text-success">
                  <TrendingUp size={12} aria-hidden />
                  Hausse
                </span>
              )}
            </div>
            <strong className="mt-4 block text-[30px] font-extrabold leading-none tracking-[-.04em] max-md:text-2xl">{value}</strong>
            <span className="mt-1.5 block text-xs text-muted">{label}</span>
            <small className="mt-2.5 block border-t border-border pt-2.5 text-[10px] text-muted">{note}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
