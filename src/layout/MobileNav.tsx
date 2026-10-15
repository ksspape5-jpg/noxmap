import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/cn";
import { navItems } from "./navItems";

// Barre de navigation fixée en bas de l'écran, visible uniquement sur mobile.
export default function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-1100 hidden h-18 grid-cols-5 border-t border-border bg-white/97 px-1.75 pt-1.75 pb-[max(7px,env(safe-area-inset-bottom))] backdrop-blur-md max-md:grid print:hidden"
      aria-label="Navigation principale"
    >
      {navItems.map(({ to, label, icon: Icon, featured }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 text-[8px] font-bold text-muted",
              (isActive || featured) && "text-primary",
            )
          }
        >
          <span
            className={cn(
              "grid h-6.25 place-items-center",
              featured && "-mt-7.5 box-content size-11.5 rounded-[15px] border-5 border-white bg-primary text-white shadow-brand-lg",
            )}
          >
            <Icon size={featured ? 24 : 20} />
          </span>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
