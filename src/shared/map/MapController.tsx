import { useMap } from "react-leaflet";

export default function MapController({ center }: { center?: [number, number] }) {
  const map = useMap();
  if (center) map.flyTo(center, 14, { duration: 0.8 });
  return null;
}
