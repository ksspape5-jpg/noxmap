export type KnowledgeEntry = {
  id: string;
  keywords: string[];
  text: string;
};

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "signaler",
    keywords: ["signaler", "signalement", "inondation", "inondé", "ici c'est", "publier", "photo"],
    text: "Pour signaler : aller sur « Signaler » (ou « Ici c'est inondé »), placer le point sur la carte ou utiliser votre position, choisir le niveau d'eau (cheville, genou, taille/point noir), la photo est facultative, confirmer la règle de confidentialité puis publier.",
  },
  {
    id: "niveaux",
    keywords: ["niveau", "cheville", "genou", "taille", "point noir", "hauteur", "eau"],
    text: "Les niveaux d'eau : cheville (practicable avec prudence), genou (passage à pied dangereux), taille (zone dangereuse = « point noir », à éviter). Un point noir signale une zone critique.",
  },
  {
    id: "carte",
    keywords: ["carte", "point actif", "itinéraire", "trajet", "position", "éviter"],
    text: "La carte affiche les points actifs avec leur niveau, l'heure et les confirmations. Touchez un point pour voir sa fiche. Utilisez « Ma position » pour vous situer et un lien depuis le classement pour centrer la carte sur un quartier.",
  },
  {
    id: "classement",
    keywords: ["classement", "quartier", "touché", "priorité", "classé", "gravité"],
    text: "Le classement montre les quartiers les plus touchés. On peut filtrer par période (dernière heure, aujourd'hui, 7 jours) et par indicateur (volume, gravité, ou niveau cheville/genou/taille). Chaque quartier a une fiche détail et un lien vers la carte. Export CSV/GeoJSON/PDF disponible.",
  },
  {
    id: "confidentialite",
    keywords: ["confidentialité", "vie privée", "donnée", "visage", "plaque", "anonyme", "compte"],
    text: "Vie privée : aucun compte, aucun nom, téléphone ou adresse personnelle demandé. Les visages et plaques sont floutés. Seule une position approximative est publiée.",
  },
  {
    id: "ia",
    keywords: ["ia", "intelligence", "photo", "vocale", "vocal", "wolof", "prédire", "faux", "confiance", "prototype", "priorité"],
    text: "Ce que fait l'IA : 1) lire les photos (confirmer l'inondation, estimer la hauteur, indice de confiance), 2) écarter les faux signalements (doublons, photos anciennes, incohérences), 3) comprendre les messages vocaux (français et wolof), 4) regrouper et valider les signalements proches, 5) prédire les quartiers à risque, 6) flouter les visages et plaques, 7) trouver le lieu depuis un texte ou un vocal, 8) répondre sur WhatsApp depuis les données de la carte, 9) rédiger des rapports pour la mairie, 10) modérer les contenus (photos inappropriées, spam, abus). Pour le premier prototype, l'équipe se concentre sur lire les photos, flouter visages et plaques, et détecter les doublons.",
  },
  {
    id: "principes",
    keywords: ["décide", "urgence", "invente", "confiance", "donnée insuffisante", "principe", "seule"],
    text: "Principes de l'IA : elle ne décide jamais seule d'une urgence (elle propose, la communauté ou un responsable confirme), elle n'invente pas d'information et répond « donnée insuffisante » quand elle ne sait pas, elle indique toujours un niveau de confiance et ne prétend jamais avoir effectué une action réelle.",
  },
  {
    id: "floutage",
    keywords: ["flou", "flouter", "visage", "plaque", "immatriculation", "vie privée", "anonyme", "photo"],
    text: "Vie privée sur les photos : l'IA floute automatiquement les visages et les plaques d'immatriculation avant publication (détection d'objets). Aucun visage ni plaque ne doit rester visible.",
  },
  {
    id: "geocodage",
    keywords: ["lieu", "position", "adresse", "texte", "vocal", "marché", "retrouver", "localiser"],
    text: "Trouver le lieu : quand une personne n'a pas partagé sa position, l'IA peut déduire le lieu à partir d'un texte ou d'un vocal, par exemple « devant le marché de Thiaroye ». La position reste approximative et jamais une adresse de maison.",
  },
  {
    id: "whatsapp",
    keywords: ["whatsapp", "praticable", "route", "message", "répondre", "question"],
    text: "Répondre sur WhatsApp : l'IA répond aux questions du type « est-ce que la route de Pikine est praticable ? » uniquement à partir des données de la carte. Si l'information manque, elle répond « donnée insuffisante ».",
  },
  {
    id: "rapports",
    keywords: ["mairie", "rapport", "hebdomadaire", "résumé", "autorité", "synthèse"],
    text: "Rapports pour la mairie : l'IA peut rédiger un résumé hebdomadaire des quartiers touchés et des zones qui reviennent, pour aider les autorités à prioriser.",
  },
  {
    id: "moderation",
    keywords: ["modérer", "modération", "spam", "abusif", "inapproprié", "contenu", "signalement abusif"],
    text: "Modération : l'IA repère les photos inappropriées, le spam et les messages abusifs afin de protéger la communauté.",
  },
  {
    id: "projet",
    keywords: ["projet", "open source", "hacktoberfest", "galsen", "à propos", "licence", "contribuer"],
    text: "NdoxMap est un projet citoyen open source né au Hacktoberfest 2026 Dakar (Galsen DEV), couvrant Keur Massar, Pikine, Thiaroye, Guédiawaye et Rufisque. Les données actuelles sont de démonstration.",
  },
  {
    id: "limites",
    keywords: ["secours", "urgence", "alerte officielle", "remplace", "limite", "fiabilité"],
    text: "Limites : l'outil aide à réagir mais ne remplace ni les alertes officielles ni les secours. Les informations sont citoyennes et peuvent être incomplètes.",
  },
];

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function retrieve(query: string, limit = 3): KnowledgeEntry[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  return KNOWLEDGE_BASE.map((entry) => {
    const haystack = `${entry.id} ${entry.keywords.join(" ")} ${entry.text}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0);
    return { entry, score };
  })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.entry);
}

export function buildKnowledgeContext(query: string, limit = 3): string {
  const hits = retrieve(query, limit);
  if (!hits.length) return "";
  return `Base de connaissances (extraits pertinents à réutiliser) :\n${hits
    .map((entry) => `- ${entry.text}`)
    .join("\n")}`;
}
