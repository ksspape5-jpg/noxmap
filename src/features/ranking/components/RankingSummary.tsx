import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/shared/ui";
import type { RankRow } from "../rankingData";

const TEXT = "mt-2 text-[11px] leading-[1.65] text-white/75";

type RankingSummaryProps = { rows: RankRow[]; total: number; unit: string; onExplore: () => void };

export default function RankingSummary({ rows, total, unit, onExplore }: RankingSummaryProps) {
  const top = rows[0];
  const share = top && total > 0 ? Math.round((top.value / total) * 100) : 0;
  return (
    <aside className="sticky top-22.5 rounded-[18px] bg-primary-dark p-6.25 text-white max-md:static print:hidden">
      <div>
        <span className="mb-6.25 grid size-11.5 place-items-center rounded-[13px] bg-white/12">
          <BarChart3 />
        </span>
        <h2 className="text-[25px]">
          {total} {unit}
        </h2>
        <p className={TEXT}>recensés sur {rows.length} quartiers dans cette démonstration.</p>
      </div>
      <hr className="my-5.75 border-0 border-t border-white/14" />
      <p className={TEXT}>
        <b className="mb-1 block text-white">À retenir</b>
        {top
          ? `${top.name} concentre ${share} % du total et les niveaux les plus élevés.`
          : "Aucun quartier ne correspond à ce filtre."}
      </p>
      <p className="mt-2.5 text-[10px] text-white/60">Touchez un quartier pour voir son détail et l'ouvrir sur la carte.</p>
      <Button className="mt-5.5 w-full bg-white text-primary-dark hover:bg-white" onClick={onExplore}>
        Explorer la carte <ArrowRight size={17} />
      </Button>
    </aside>
  );
}
