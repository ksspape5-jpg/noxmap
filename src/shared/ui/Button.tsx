import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

const VARIANTS = {
  primary: "bg-primary text-white shadow-brand hover:bg-primary-dark",
  secondary: "border-border-strong bg-white text-primary-dark",
  ghost: "bg-transparent px-2.5 text-primary",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS;
};

export default function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12.5 items-center justify-center gap-2.25 rounded-xl border border-transparent px-5 text-sm font-bold transition-all duration-200",
        "enabled:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-55",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
