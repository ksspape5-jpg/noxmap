import Roadmap from "@/shared/roadmap";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import StatsSection from "./components/StatsSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <HowItWorks />
      <Roadmap />
    </main>
  );
}
