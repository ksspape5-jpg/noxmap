import type { Level, LevelMeta } from "./types";

export const levelMeta: Record<Level, LevelMeta> = {
  ankle: {
    label: "Niveau cheville",
    short: "Cheville",
    color: "#D89516",
    radius: 8,
    help: "La rue reste praticable avec prudence.",
  },
  knee: {
    label: "Niveau genou",
    short: "Genou",
    color: "#DB5D27",
    radius: 11,
    help: "Le passage à pied devient dangereux.",
  },
  waist: {
    label: "Point noir — niveau taille",
    short: "Taille",
    color: "#421C22",
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
