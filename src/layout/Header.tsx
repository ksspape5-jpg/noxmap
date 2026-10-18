import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Plus, X } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { IconButton } from "@/shared/ui";
import Logo from "./Logo";
import { navItems } from "./navItems";

const desktopLinkClass = (featured: boolean | undefined, isActive: boolean) =>
  cn(
    "flex min-h-10.5 items-center gap-1.5 rounded-[11px] px-3.5 text-[13px] font-semibold text-muted hover:bg-primary-soft hover:text-primary-dark",
    isActive && "bg-primary-soft text-primary-dark",
    featured && "ml-2 bg-primary text-white hover:bg-primary-dark hover:text-white",
    featured && isActive && "bg-primary-dark",
  );

export default function Header() {
  const [open, setOpen] = useState(false);
  const isMap = useLocation().pathname === "/carte";
  return (
    <header
      className={cn(
        "sticky top-0 z-1000 flex h-18 items-center justify-between border-b border-border bg-white/96 px-page backdrop-blur-md",
        "max-md:h-15.5 max-md:px-4 print:hidden",
        // Sur la carte, l'en-tête passe par-dessus la carte (et disparaît sur mobile).
        isMap && "fixed inset-x-0 max-md:hidden",
      )}
    >
      <NavLink to="/" className="flex items-center gap-2.5 text-[15px] font-bold max-md:text-[13px]" aria-label="Accueil NdoxMap">
        <Logo />
        <span>Ndox<b className="text-primary">Map</b></span>
      </NavLink>
      <nav className="flex items-center gap-1.5 max-md:hidden">
        {navItems.map(({ to, label, featured }) => (
          <NavLink key={to} to={to} className={({ isActive }) => desktopLinkClass(featured, isActive)}>
            {featured && <Plus size={17} />} {label}
          </NavLink>
        ))}
      </nav>
      <IconButton className="hidden max-md:grid" aria-label="Ouvrir le menu" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </IconButton>
      {open && (
        <nav className="absolute inset-x-0 top-15.25 hidden flex-col border-b border-border bg-white px-4 py-3 shadow-[0_10px_20px_rgba(0,0,0,.08)] max-md:flex">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="border-b border-border p-3.25 text-[13px] font-bold last:border-0"
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
