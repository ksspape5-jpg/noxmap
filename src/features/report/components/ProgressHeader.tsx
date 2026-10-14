import type { ReportStep } from "../types";

type ProgressHeaderProps = { step: ReportStep; onBack: () => void };

export default function ProgressHeader({ step, onBack }: ProgressHeaderProps) {
  return (
    <>
      <div className="progress-head">
        <button className="back-link" onClick={onBack}>← Retour</button>
        <span>Étape {step} sur 2</span>
      </div>
      <div className="progress-track"><i className={step === 2 ? "full" : ""} /></div>
    </>
  );
}
