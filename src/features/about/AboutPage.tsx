import { AlertTriangle } from "lucide-react";
import Roadmap from "@/shared/roadmap";
import { ContentPage, PageTitle } from "@/shared/ui";
import AboutGrid from "./components/AboutGrid";
import AiPrinciples from "./components/AiPrinciples";
import OpenSourceCard from "./components/OpenSourceCard";
import PrivacyCard from "./components/PrivacyCard";
import ProjectStatus from "./components/ProjectStatus";
import TeamCredits from "./components/TeamCredits";
import WolofNote from "./components/WolofNote";

export default function AboutPage() {
  return (
    <ContentPage>
      <PageTitle
        className="mb-6"
        eyebrow="À propos du projet"
        title="Une carte construite avec les habitants, pour les habitants."
        description="À chaque saison des pluies, des rues de Dakar et de sa banlieue deviennent impraticables et l'information fiable en temps réel manque. Points Noirs Dakar est une démonstration open source née au Hacktoberfest 2026 Dakar (Galsen DEV × MLH), où chacun peut signaler et consulter les points noirs d'inondation."
      />
      <p className="mb-4 flex items-start gap-2.5 rounded-xl border border-ankle-soft bg-ankle-soft/50 px-4 py-3 text-[12.5px] leading-[1.6] text-ankle-ink max-md:px-3.5">
        <AlertTriangle size={17} aria-hidden className="mt-0.5 flex-none" />
        <span>
          <b className="font-bold">Cet outil aide à réagir ; il ne remplace ni les secours ni les alertes officielles.</b>
        </span>
      </p>
      <AboutGrid />
      <AiPrinciples />
      <OpenSourceCard />
      <ProjectStatus />
      <PrivacyCard />
      <WolofNote />
      <TeamCredits />
      <Roadmap className="mt-15 mb-0 max-md:-mx-0.75 max-md:mt-8.75 max-md:mb-0" />
    </ContentPage>
  );
}
