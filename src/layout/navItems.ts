import { BarChart3, Home, Info, Map as MapIcon, Plus, type LucideIcon } from "lucide-react";

export type NavItem = { to: string; label: string; icon: LucideIcon; featured?: boolean };

export const navItems: NavItem[] = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/carte", label: "Carte", icon: MapIcon },
  { to: "/signaler", label: "Signaler", icon: Plus, featured: true },
  { to: "/classement", label: "Classement", icon: BarChart3 },
  { to: "/a-propos", label: "À propos", icon: Info },
];
