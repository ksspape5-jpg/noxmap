import Roadmap from "@/shared/roadmap";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import LevelsGuide from "./components/LevelsGuide";
import StatsSection from "./components/StatsSection";
import TrustStrip from "./components/TrustStrip";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <LevelsGuide />
      <StatsSection />
      <HowItWorks />
      <Roadmap />
    </main>
  );
}
