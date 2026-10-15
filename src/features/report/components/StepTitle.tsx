import { MapPin } from "lucide-react";

// Titre d'une étape du formulaire avec icône contextuelle.
type StepTitleProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export default function StepTitle({ title, description, icon }: StepTitleProps) {
  return (
    <div className="mb-7 max-md:mb-5">
      {icon && (
        <span className="mb-3 inline-grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
          {icon}
        </span>
      )}
      <h1 className="text-[28px] leading-[1.15] tracking-tight max-md:text-[24px]">{title}</h1>
      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted">{description}</p>
    </div>
  );
}
