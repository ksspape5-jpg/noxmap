import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

// Bouton rond contenant uniquement une icône : pensez à `aria-label`.
export default function IconButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("inline-grid size-11 place-items-center rounded-full border-0 bg-transparent text-inherit", className)}
      {...props}
    />
  );
}
