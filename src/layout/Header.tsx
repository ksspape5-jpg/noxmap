import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Plus, X } from "lucide-react";
import Logo from "./Logo";
import { navItems } from "./navItems";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <NavLink to="/" className="brand" aria-label="Accueil Points Noirs Dakar">
        <Logo />
        <span>Points Noirs <b>Dakar</b></span>
      </NavLink>
      <nav className="desktop-nav">
        {navItems.map(({ to, label, featured }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `${featured ? "nav-report" : ""} ${isActive ? "active" : ""}`}>
            {featured && <Plus size={17} />} {label}
          </NavLink>
        ))}
      </nav>
      <button className="icon-btn menu-btn" aria-label="Ouvrir le menu" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav className="mobile-menu">
          {navItems.map(({ to, label }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
