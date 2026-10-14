import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/shared/ui";

const TEXT = "mt-2 text-[11px] leading-[1.65] text-white/75";

export default function RankingSummary({ onExplore }: { onExplore: () => void }) {
  return (
    <aside className="sticky top-22.5 rounded-[18px] bg-primary-dark p-6.25 text-white max-md:static">
      <div>
        <span className="mb-6.25 grid size-11.5 place-items-center rounded-[13px] bg-white/12">
          <BarChart3 />
        </span>
        <h2 className="text-[25px]">72 signalements</h2>
        <p className={TEXT}>recensés sur 5 quartiers dans cette démonstration.</p>
      </div>
      <hr className="my-5.75 border-0 border-t border-white/14" />
      <p className={TEXT}>
        <b className="mb-1 block text-white">À retenir</b>
        Keur Massar concentre un tiers des points actifs et les niveaux les plus élevés.
      </p>
      <Button className="mt-5.5 w-full bg-white text-primary-dark hover:bg-white" onClick={onExplore}>
        Explorer la carte <ArrowRight size={17} />
      </Button>
    </aside>
  );
}
