import type { ReportLocation } from "../types";

export async function reverseGeocode(lat: number, lng: number): Promise<{ placeName: string; subtext: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      {
        headers: {
          "Accept-Language": "fr",
        },
      },
    );
    if (!res.ok) throw new Error("Geocoding failed");
    const data = await res.json();
    const addr = data.address || {};
    const quarter =
      addr.suburb ||
      addr.neighbourhood ||
      addr.city_district ||
      addr.quarter ||
      addr.village ||
      addr.road;
    const city = addr.city || addr.town || addr.municipality || addr.county || "Dakar";

    if (quarter) {
      return {
        placeName: `${quarter}, ${city}`,
        subtext: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      };
    }
    if (data.display_name) {
      const parts = data.display_name.split(",").map((s: string) => s.trim());
      return {
        placeName: parts.slice(0, 2).join(", "),
        subtext: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
      };
    }
  } catch (error) {
    console.warn("Reverse geocode error:", error);
  }

  return {
    placeName: `Position GPS (${lat.toFixed(4)}°, ${lng.toFixed(4)}°)`,
    subtext: `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`,
  };
}

export function getCurrentBrowserLocation(): Promise<ReportLocation> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      return reject(new Error("La géolocalisation n'est pas supportée par votre navigateur."));
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy);

        const { placeName, subtext } = await reverseGeocode(lat, lng);

        resolve({
          lat,
          lng,
          accuracy,
          placeName,
          subtext: `${subtext} · Précision: ±${accuracy}m`,
          isRealGps: true,
        });
      },
      (err) => {
        if (err.code === 1) {
          reject(new Error("Accès à la position refusé. Veuillez autoriser la localisation dans les réglages ou pointer sur la carte."));
        } else if (err.code === 2) {
          reject(new Error("Position GPS non disponible. Vous pouvez pointer directement sur la carte."));
        } else if (err.code === 3) {
          reject(new Error("Délai de géolocalisation expiré. Réessayez ou pointez sur la carte."));
        } else {
          reject(new Error("Impossible de récupérer votre position. Pointez sur la carte."));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      },
    );
  });
}
