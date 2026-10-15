import { Circle, CircleMarker, MapContainer, Popup, TileLayer, useMapEvents } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { levelMeta, reports } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import MapController from "./MapController";

const DAKAR: LatLngExpression = [14.75, -17.32];
const NEW_REPORT_POSITION: LatLngExpression = [14.778, -17.33];

// Les styles de Leaflet ne sont pas dans un layer Tailwind : `!` est nécessaire pour les surcharger.
const MAP_CLASSES = "z-1 size-full bg-primary-soft! [&_.leaflet-control-attribution]:text-[8px]!";

function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick?.(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

type MapCanvasProps = {
  onSelect?: (id: number) => void;
  selected?: number | null;
  newReport?: boolean;
  compact?: boolean;
  center?: [number, number];
  zoom?: number;
  className?: string;
  onMapClick?: (lat: number, lng: number) => void;
  markerPosition?: [number, number] | null;
  accuracy?: number;
};

export default function MapCanvas({
  onSelect,
  selected,
  newReport,
  compact = false,
  center,
  zoom,
  className,
  onMapClick,
  markerPosition,
  accuracy,
}: MapCanvasProps) {
  const visibleReports = compact ? reports.slice(0, 3) : reports;
  return (
    <MapContainer center={center || DAKAR} zoom={zoom || 11} zoomControl={!compact} scrollWheelZoom className={cn(MAP_CLASSES, className)}>
      <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {onMapClick && <MapClickHandler onMapClick={onMapClick} />}
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
      {markerPosition && (
        <>
          {accuracy && accuracy > 0 && accuracy < 3000 && (
            <Circle
              center={markerPosition}
              radius={accuracy}
              pathOptions={{
                fillColor: "#00704A",
                fillOpacity: 0.15,
                color: "#00704A",
                weight: 1.5,
                dashArray: "4 4",
              }}
            />
          )}
          <CircleMarker
            center={markerPosition}
            radius={9}
            pathOptions={{
              fillColor: "#00704A",
              color: "#ffffff",
              weight: 3.5,
              fillOpacity: 1,
            }}
          >
            <Popup>
              <b>Position choisie</b>
              <br />
              {markerPosition[0].toFixed(4)}°, {markerPosition[1].toFixed(4)}°
            </Popup>
          </CircleMarker>
        </>
      )}
      {newReport && (
        <CircleMarker center={NEW_REPORT_POSITION} radius={19} pathOptions={{ fillColor: levelMeta.waist.color, color: "#fff", weight: 6, fillOpacity: 1 }}>
          <Popup><b>Nouveau point noir</b><br />Votre signalement vient d'être ajouté.</Popup>
        </CircleMarker>
      )}
      <MapController center={center} zoom={zoom} />
    </MapContainer>
  );
}

