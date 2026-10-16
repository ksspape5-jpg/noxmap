import Roadmap from "@/shared/roadmap";
import FinalCta from "./components/FinalCta";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import LevelsGuide from "./components/LevelsGuide";
import StatsSection from "./components/StatsSection";
import TrustStrip from "./components/TrustStrip";
import UseCases from "./components/UseCases";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <LevelsGuide />
      <HowItWorks />
      <UseCases />
      <StatsSection />
      <Roadmap className="[&_h2]:font-bold" />
      <FinalCta />
    </main>
  );
}
