import Roadmap from "@/shared/roadmap";
import { PageTitle } from "@/shared/ui";
import AboutGrid from "./components/AboutGrid";
import OpenSourceCard from "./components/OpenSourceCard";
import WolofNote from "./components/WolofNote";
import "./about.css";

export default function AboutPage() {
  return (
    <main className="content-page about-page">
      <div className="content-container">
        <PageTitle
          eyebrow="À propos du projet"
          title="Une carte construite avec les habitants, pour les habitants."
          description="Points Noirs Dakar est une démonstration open source née au Hacktoberfest 2026 Dakar."
        />
        <AboutGrid />
        <WolofNote />
        <OpenSourceCard />
        <Roadmap />
      </div>
    </main>
  );
}
