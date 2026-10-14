type PageTitleProps = { eyebrow?: string; title: string; description?: string };

export default function PageTitle({ eyebrow, title, description }: PageTitleProps) {
  return (
    <div className="page-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
