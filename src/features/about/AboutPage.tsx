import Roadmap from "@/shared/roadmap";
import { ContentPage, PageTitle } from "@/shared/ui";
import AboutGrid from "./components/AboutGrid";
import AiPrinciples from "./components/AiPrinciples";
import OpenSourceCard from "./components/OpenSourceCard";
import WolofNote from "./components/WolofNote";

export default function AboutPage() {
  return (
    <ContentPage>
      <PageTitle
        className="mb-8"
        eyebrow="À propos du projet"
        title="Une carte construite avec les habitants, pour les habitants."
        description="Points Noirs Dakar est une démonstration open source née au Hacktoberfest 2026 Dakar."
      />
      <AboutGrid />
      <WolofNote />
      <AiPrinciples />
      <OpenSourceCard />
      <Roadmap className="mt-15 mb-0 max-md:-mx-0.75 max-md:mt-8.75 max-md:mb-0" />
    </ContentPage>
  );
}
