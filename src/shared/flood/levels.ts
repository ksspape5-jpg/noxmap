import type { Level, LevelMeta } from "./types";

// `color` sert aux marqueurs Leaflet (hexadécimal obligatoire) : garder synchronisé avec --color-ankle/knee/waist de index.css.
export const levelMeta: Record<Level, LevelMeta> = {
  ankle: {
    label: "Niveau cheville",
    short: "Cheville",
    color: "#F2C230",
    radius: 8,
    help: "La rue reste praticable avec prudence.",
  },
  knee: {
    label: "Niveau genou",
    short: "Genou",
    color: "#E8590C",
    radius: 11,
    help: "Le passage à pied devient dangereux.",
  },
  waist: {
    label: "Point noir — niveau taille",
    short: "Taille",
    color: "#2B0A0F",
    radius: 15,
    help: "Zone dangereuse. Évitez tout passage.",
  },
};

export const LEVELS = Object.keys(levelMeta) as Level[];

// Couleur de fond Tailwind de chaque niveau (classes écrites en entier pour que Tailwind les détecte).
export const LEVEL_BG: Record<Level, string> = {
  ankle: "bg-ankle",
  knee: "bg-knee",
  waist: "bg-waist",
};
