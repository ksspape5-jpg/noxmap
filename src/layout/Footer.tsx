import { Code2 } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer>
      <div><Logo /><b>Un outil citoyen, construit au grand jour.</b></div>
      <p>Projet open source pour mieux comprendre et partager les risques d'inondation.</p>
      <a href="https://github.com" target="_blank" rel="noreferrer"><Code2 size={16} /> Voir sur GitHub</a>
      <span>Hacktoberfest 2026 Dakar — Galsen DEV</span>
    </footer>
  );
}
