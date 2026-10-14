import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Navigation principale">
      {navItems.map(({ to, label, icon: Icon, featured }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `${featured ? "nav-main" : ""} ${isActive ? "active" : ""}`}>
          <span><Icon size={featured ? 24 : 20} /></span>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
