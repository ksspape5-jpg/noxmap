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
import type { ReportStep } from "./types";

const SUBMIT_DELAY_MS = 800;

// Carte blanche à deux colonnes (formulaire + panneau latéral) ; une seule colonne sur mobile.
const SHELL_CLASSES = cn(
  "grid w-full max-w-245 grid-cols-[minmax(0,1fr)_330px] overflow-hidden rounded-[20px] border border-border bg-white",
  "shadow-[0_15px_40px_rgba(33,51,46,.07)]",
  "max-md:block max-md:overflow-visible max-md:border-0 max-md:shadow-none",
);

export default function ReportPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<ReportStep>(1);
  const [locationSet, setLocationSet] = useState(false);
  const [level, setLevel] = useState<Level | null>(null);
  const [photo, setPhoto] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const chooseLocation = () => {
    setLocationSet(true);
    setError("");
  };
  const chooseLevel = (item: Level) => {
    setLevel(item);
    setError("");
  };
  const next = () => {
    if (!locationSet) return setError("Choisissez un lieu sur la carte ou utilisez votre position.");
    setError("");
    setStep(2);
  };
  const submit = () => {
    if (!level || !consent) return setError("Choisissez un niveau et confirmez la règle de confidentialité.");
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setStep(3);
    }, SUBMIT_DELAY_MS);
  };
  const restart = () => {
    setStep(1);
    setLevel(null);
    setLocationSet(false);
  };

  if (step === 3) {
    return (
      <ReportConfirmation
        level={level}
        onViewMap={() => navigate("/carte", { state: { newReport: true } })}
        onRestart={restart}
      />
    );
  }

  return (
    <FormPage>
      <section className={SHELL_CLASSES}>
        <div className="p-8 max-md:px-1 max-md:py-2">
          <ProgressHeader step={step} onBack={() => (step === 2 ? setStep(1) : navigate(-1))} />
          {step === 1 ? (
            <LocationStep locationSet={locationSet} error={error} onLocate={chooseLocation} onContinue={next} />
          ) : (
            <LevelStep
              level={level}
              onLevelChange={chooseLevel}
              photo={photo}
              onPhotoChange={setPhoto}
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
