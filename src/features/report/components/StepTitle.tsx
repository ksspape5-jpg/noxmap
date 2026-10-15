import { PageTitle } from "@/shared/ui";

// Titre d'une étape du formulaire : plus compact que le PageTitle par défaut.
const STEP_TITLE_CLASSES = "mb-5.5 [&_h1]:text-[30px] max-md:[&_h1]:text-[28px] max-md:[&>p:last-child]:text-xs";

export default function StepTitle({ title, description }: { title: string; description: string }) {
  return <PageTitle eyebrow="Nouveau signalement" title={title} description={description} className={STEP_TITLE_CLASSES} />;
}
