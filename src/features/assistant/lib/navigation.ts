export const PAGE_LABELS: Record<string, string> = {
  "/": "Accueil",
  "/carte": "Carte des points actifs",
  "/signaler": "Signaler une inondation",
  "/classement": "Classement des quartiers",
  "/a-propos": "À propos",
};

export const QUICK_LINKS = [
  { keywords: ["signal", "inond", "ici c'est"], to: "/signaler", label: "Signaler" },
  { keywords: ["carte", "point actif", "itinéraire", "trajet"], to: "/carte", label: "Voir la carte" },
  { keywords: ["classement", "quartier", "touché", "touchés"], to: "/classement", label: "Classement" },
  { keywords: ["projet", "open source", "à propos", "hacktober"], to: "/a-propos", label: "À propos" },
];

export function quickLinksFor(content: string) {
  const lower = content.toLowerCase();
  return QUICK_LINKS.filter((link) => link.keywords.some((keyword) => lower.includes(keyword))).slice(0, 3);
}

const SUGGESTIONS_BY_PAGE: Record<string, string[]> = {
  "/": [
    "Comment signaler une inondation ?",
    "Qu'est-ce qu'un point noir ?",
    "Comment lire la carte ?",
  ],
  "/carte": [
    "Comment lire les niveaux d'eau sur la carte ?",
    "Que veut dire un point confirmé ?",
    "Comment voir un itinéraire alternatif ?",
  ],
  "/signaler": [
    "Comment placer le point sur la carte ?",
    "Quel niveau choisir pour cette hauteur d'eau ?",
    "Ma photo est-elle obligatoire ?",
  ],
  "/classement": [
    "Comment est calculé le classement ?",
    "Que signifie « zone récurrente » ?",
    "Comment exporter les données ?",
  ],
  "/a-propos": [
    "Qui construit le projet ?",
    "Comment contribuer ?",
    "Les données sont-elles fiables ?",
  ],
};

const DEFAULT_SUGGESTIONS = [
  "Comment signaler une inondation ?",
  "Qu'est-ce qu'un point noir ?",
  "Comment lire les niveaux d'eau ?",
  "À quoi sert le classement ?",
];

export function suggestionsFor(pathname: string): string[] {
  return SUGGESTIONS_BY_PAGE[pathname] ?? DEFAULT_SUGGESTIONS;
}
