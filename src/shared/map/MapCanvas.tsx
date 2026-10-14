import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { levelMeta, reports } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import MapController from "./MapController";

const DAKAR: LatLngExpression = [14.75, -17.32];
const NEW_REPORT_POSITION: LatLngExpression = [14.778, -17.33];

// Les styles de Leaflet ne sont pas dans un layer Tailwind : `!` est nécessaire pour les surcharger.
const MAP_CLASSES = "leaflet-map z-1 size-full bg-primary-soft! [&_.leaflet-control-attribution]:text-[8px]!";

type MapCanvasProps = {
  onSelect?: (id: number) => void;
  selected?: number | null;
  newReport?: boolean;
  compact?: boolean;
  className?: string;
};

export default function MapCanvas({ onSelect, selected, newReport, compact = false, className }: MapCanvasProps) {
  const visibleReports = compact ? reports.slice(0, 3) : reports;
  return (
    <MapContainer center={DAKAR} zoom={11} zoomControl={!compact} scrollWheelZoom className={cn(MAP_CLASSES, className)}>
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {visibleReports.map((report) => {
        const meta = levelMeta[report.level];
        const isSelected = selected === report.id;
        return (
          <CircleMarker
            key={report.id}
            center={[report.lat, report.lng]}
            radius={meta.radius + (isSelected ? 4 : 0)}
            pathOptions={{ fillColor: meta.color, color: "#fff", weight: isSelected ? 5 : 3, fillOpacity: 1 }}
            eventHandlers={{ click: () => onSelect?.(report.id) }}
          >
            {!compact && (
              <Popup>
                <b>{meta.label}</b><br />{report.place} · {report.time}
              </Popup>
            )}
          </CircleMarker>
        );
      })}
      {newReport && (
        <CircleMarker center={NEW_REPORT_POSITION} radius={19} pathOptions={{ fillColor: "#421C22", color: "#fff", weight: 6, fillOpacity: 1 }}>
          <Popup><b>Nouveau point noir</b><br />Votre signalement vient d'être ajouté.</Popup>
        </CircleMarker>
      )}
      <MapController />
    </MapContainer>
  );
}
