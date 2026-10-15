import { useState } from "react";
import { ArrowRight, Check, Compass, LocateFixed, MapPin, Navigation, RefreshCw } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { MapCanvas } from "@/shared/map";
import { Button } from "@/shared/ui";
import { getCurrentBrowserLocation, reverseGeocode } from "../lib/geolocation";
import type { ReportLocation } from "../types";
import FormError from "./FormError";
import StepTitle from "./StepTitle";

type LocationStepProps = {
  location: ReportLocation | null;
  error: string;
  onLocationChange: (location: ReportLocation) => void;
  onContinue: () => void;
};

export default function LocationStep({ location, error, onLocationChange, onContinue }: LocationStepProps) {
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleUseBrowserLocation = async () => {
    setLocating(true);
    setGeoError(null);

    try {
      const loc = await getCurrentBrowserLocation();
      onLocationChange(loc);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Impossible d'accéder à la géolocalisation.";
      setGeoError(message);
    } finally {
      setLocating(false);
    }
  };

  const handleMapClick = async (lat: number, lng: number) => {
    setGeoError(null);
    const { placeName, subtext } = await reverseGeocode(lat, lng);
    onLocationChange({
      lat,
      lng,
      placeName,
      subtext: `${subtext} · Point sélectionné sur la carte`,
      isRealGps: false,
    });
  };

  return (
    <>
      <StepTitle
        icon={<MapPin size={22} />}
        title="Où est-ce inondé ?"
        description="Utilisez le GPS de votre appareil ou touchez la carte pour placer le point au plus près."
      />

      {/* Map card with interactive marker & click */}
      <div
        className={cn(
          "group relative overflow-hidden rounded-2xl border-2 transition-all duration-300",
          "h-[290px] max-md:h-[250px]",
          location
            ? "border-primary shadow-[0_0_0_3px_rgba(0,112,74,.12)]"
            : "border-border hover:border-primary/40 hover:shadow-[0_4px_16px_rgba(0,0,0,.06)]",
        )}
      >
        <MapCanvas
          compact
          center={location ? [location.lat, location.lng] : undefined}
          zoom={location ? 15 : 12}
          markerPosition={location ? [location.lat, location.lng] : null}
          accuracy={location?.isRealGps ? location.accuracy : undefined}
          onMapClick={handleMapClick}
        />

        {/* Floating guidance helper */}
        <div className="pointer-events-none absolute top-3 left-3 z-400 rounded-lg bg-black/65 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-xs">
          Touchez la carte pour déplacer le point
        </div>

        {/* Floating pill when location is selected */}
        {location && (
          <span
            className={cn(
              "pointer-events-none absolute bottom-3 left-1/2 z-400 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap",
              "rounded-xl bg-white/95 px-3.5 py-2 text-[11px] font-bold text-success shadow-lg backdrop-blur-xs",
              "animate-[fadeSlideUp_0.3s_ease-out]",
            )}
          >
            <Check size={14} className="stroke-[3]" /> {location.placeName}
          </span>
        )}
      </div>

      {/* Confirmed location summary card */}
      {location && (
        <div className="mt-3.5 flex items-center justify-between rounded-xl border border-primary/20 bg-primary-soft/30 p-3 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-white">
              {location.isRealGps ? <Compass size={16} /> : <MapPin size={16} />}
            </span>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-ink flex items-center gap-1.5">
                {location.placeName}
                <span className="rounded-md bg-primary/15 px-1.5 py-0.2 text-[9.5px] font-semibold text-primary">
                  {location.isRealGps ? "GPS détecté" : "Carte"}
                </span>
              </span>
              <span className="text-[10px] text-muted">{location.subtext}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleUseBrowserLocation}
            disabled={locating}
            className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
            title="Actualiser la position GPS"
          >
            <RefreshCw size={12} className={cn(locating && "animate-spin")} />
            <span>Actualiser</span>
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="relative my-4 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-semibold text-muted">ou</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Real Geolocation button */}
      <button
        type="button"
        disabled={locating}
        className={cn(
          "group flex w-full items-center gap-3 rounded-2xl border-2 border-dashed p-4 text-left transition-all duration-200",
          locating
            ? "border-primary bg-primary-soft/40 cursor-wait"
            : location?.isRealGps
              ? "border-primary/40 bg-primary-soft/20 hover:border-primary"
              : "border-border-strong bg-canvas/60 hover:border-primary/40 hover:bg-primary-soft/30 active:scale-[0.99]",
        )}
        onClick={handleUseBrowserLocation}
      >
        <span
          className={cn(
            "grid size-11 flex-none place-items-center rounded-xl transition-colors",
            locating
              ? "bg-primary text-white"
              : "bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white",
          )}
        >
          {locating ? (
            <span className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <Navigation size={20} />
          )}
        </span>
        <span className="flex flex-col">
          <b className="text-[13px] text-ink group-hover:text-primary">
            {locating
              ? "Recherche du signal GPS…"
              : location?.isRealGps
                ? "Position GPS confirmée (Toucher pour réactualiser)"
                : "Utiliser ma position actuelle"}
          </b>
          <small className="mt-0.5 text-[11px] text-muted">
            {locating
              ? "Localisation précise via le navigateur…"
              : "Localisation automatique par le GPS de votre appareil"}
          </small>
        </span>
        <LocateFixed
          size={18}
          className={cn(
            "ml-auto text-muted transition-colors group-hover:text-primary",
            locating && "animate-pulse text-primary",
          )}
        />
      </button>

      {/* Geolocation-specific error if permission denied or unavailable */}
      {geoError && (
        <div className="mt-3 rounded-xl border border-danger/20 bg-danger-soft/40 p-3 text-[11.5px] text-danger animate-[fadeIn_0.2s_ease-out]">
          {geoError}
        </div>
      )}

      {/* General validation error */}
      <FormError message={error} />

      {/* Continue button */}
      <Button className="mt-5 w-full" onClick={onContinue}>
        Continuer <ArrowRight size={18} />
      </Button>
    </>
  );
}
