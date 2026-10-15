import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Level } from "@/shared/flood";
import { cn } from "@/shared/lib/cn";
import FormPage from "./components/FormPage";
import LevelStep from "./components/LevelStep";
import LocationStep from "./components/LocationStep";
import ProgressHeader from "./components/ProgressHeader";
import ReportAssurance from "./components/ReportAssurance";
import ReportConfirmation from "./components/ReportConfirmation";
import type { ReportLocation, ReportPhoto, ReportStep } from "./types";

const SUBMIT_DELAY_MS = 800;

// Carte blanche à deux colonnes (formulaire + panneau latéral) ; une seule colonne sur mobile.
const SHELL_CLASSES = cn(
  "relative z-1 grid w-full max-w-[960px] grid-cols-[minmax(0,1fr)_340px] overflow-hidden rounded-3xl border border-border/60 bg-white",
  "shadow-[0_20px_60px_rgba(33,51,46,.07),0_1px_3px_rgba(33,51,46,.04)]",
  "max-md:block max-md:max-w-full max-md:overflow-visible max-md:rounded-none max-md:border-0 max-md:shadow-none",
);

export default function ReportPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<ReportStep>(1);
  const [location, setLocation] = useState<ReportLocation | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [photos, setPhotos] = useState<ReportPhoto[]>([]);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const chooseLevel = (item: Level) => {
    setLevel(item);
    setError("");
  };

  const next = () => {
    if (!location) {
      return setError("Veuillez utiliser votre position GPS ou toucher la carte pour indiquer le lieu.");
    }
    setError("");
    setStep(2);
  };

  const submit = () => {
    if (!level || !consent) {
      return setError("Choisissez un niveau d'eau et confirmez la règle de confidentialité.");
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setStep(3);
    }, SUBMIT_DELAY_MS);
  };

  const restart = () => {
    // Revoke object URLs to avoid memory leaks
    photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    setStep(1);
    setLocation(null);
    setLevel(null);
    setPhotos([]);
    setConsent(false);
    setError("");
  };

  if (step === 3) {
    return (
      <ReportConfirmation
        level={level}
        location={location}
        photos={photos}
        onViewMap={() =>
          navigate("/carte", {
            state: {
              newReport: true,
              newReportCoords: location ? [location.lat, location.lng] : undefined,
            },
          })
        }
        onRestart={restart}
      />
    );
  }

  return (
    <FormPage>
      <section className={SHELL_CLASSES}>
        <div className="p-9 max-md:px-4 max-md:py-3">
          <ProgressHeader step={step} onBack={() => (step === 2 ? setStep(1) : navigate(-1))} />
          {step === 1 ? (
            <LocationStep
              location={location}
              error={error}
              onLocationChange={(loc) => {
                setLocation(loc);
                setError("");
              }}
              onContinue={next}
            />
          ) : (
            <LevelStep
              level={level}
              onLevelChange={chooseLevel}
              photos={photos}
              onPhotosChange={setPhotos}
              consent={consent}
              onConsentChange={setConsent}
              error={error}
              sending={sending}
              onSubmit={submit}
            />
          )}
        </div>
        <ReportAssurance step={step} />
      </section>
    </FormPage>
  );
}
