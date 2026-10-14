import { cn } from "@/shared/lib/cn";
import Eyebrow from "./Eyebrow";

type PageTitleProps = { eyebrow?: string; title: string; description?: string; className?: string };

export default function PageTitle({ eyebrow, title, description, className }: PageTitleProps) {
  return (
    <div className={cn("page-title", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="max-w-180 text-[clamp(30px,4vw,44px)] leading-[1.08] tracking-[-.04em] max-md:text-[32px]">
        {title}
      </h1>
      {description && <p className="mt-3 max-w-162.5 text-sm leading-[1.7] text-muted">{description}</p>}
    </div>
  );
}
