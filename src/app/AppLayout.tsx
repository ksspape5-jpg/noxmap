import { useLocation } from "react-router-dom";
import ChatFlottant from "@/features/assistant";
import WeatherAlert from "@/features/weather-alert";
import { Footer, Header, MobileNav } from "@/layout";
import AppRoutes from "./AppRoutes";

export default function AppLayout() {
  const location = useLocation();
  const isMap = location.pathname === "/carte";
  return (
    <div className={`app-shell ${isMap ? "map-route" : ""}`}>
      <Header />
      {!isMap && <WeatherAlert />}
      <AppRoutes />
      {!isMap && <Footer />}
      <MobileNav />
      <ChatFlottant />
    </div>
  );
}
