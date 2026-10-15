import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function MapController({ center, zoom = 14 }: { center?: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom, { duration: 0.8 });
  }, [center, zoom, map]);
  return null;
}

