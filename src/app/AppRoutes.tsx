import { Route, Routes } from "react-router-dom";
import AboutPage from "@/features/about";
import HomePage from "@/features/home";
import MapPage from "@/features/map";
import RankingPage from "@/features/ranking";
import ReportPage from "@/features/report";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/carte" element={<MapPage />} />
      <Route path="/signaler" element={<ReportPage />} />
      <Route path="/classement" element={<RankingPage />} />
      <Route path="/a-propos" element={<AboutPage />} />
    </Routes>
  );
}
