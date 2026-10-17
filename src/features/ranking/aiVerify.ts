import { DEMO_PHOTO_URL, levelMeta, reports, type Level } from "@/shared/flood";
import type { RankEntry, RankPeriod } from "./rankingData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// Verdict de l'IA : combine les photos de terrain et les données du quartier.
export type FloodVerdict = {
  flooded: boolean;
  level: Level | null;
  confidence: number;
  insufficient: boolean;
  reason: string;
};

// Résultat d'analyse : vrai verdict IA ou repli local si l'appel est impossible.
export type VerifyOutcome = {
  verdict: FloodVerdict;
  simulated: boolean;
  cause?: string;
};

export type VerifyRequest = {
  district: string;
  period: RankPeriod;
  summary: {
    reports: number;
    levels: Record<Level, number>;
    black: boolean;
    recurring: boolean;
    trend: string;
    previous: number;
  };
  photos: string[];
};

// Les signalements de démo ne portent qu'une image distante : on la rattache aux quartiers qui en ont une.
export function districtPhotos(name: string): string[] {
  const hasPhoto = reports.some((report) => report.place === name && report.photo);
  return hasPhoto ? [DEMO_PHOTO_URL] : [];
}

export function buildVerifyRequest(entry: RankEntry, period: RankPeriod): VerifyRequest {
  return {
    district: entry.name,
    period,
    summary: {
      reports: entry.counts[period],
      levels: entry.levels,
      black: entry.black,
      recurring: entry.recurring,
      trend: entry.trend,
      previous: entry.previous,
    },
    photos: districtPhotos(entry.name),
  };
}

// Repli hors API : verdict déterministe, calculé uniquement à partir des données du quartier.
export function simulatedVerdict(entry: RankEntry, period: RankPeriod): FloodVerdict {
  const reportsCount = entry.counts[period];
  const hasPhoto = districtPhotos(entry.name).length > 0;

  if (reportsCount === 0 && !hasPhoto) {
    return {
      flooded: false,
      level: null,
      confidence: 35,
      insufficient: true,
      reason: "Donnée insuffisante : aucun signalement sur la période analysée.",
    };
  }

  const level: Level =
    entry.levels.waist > 0 ? "waist" : entry.levels.knee > 0 ? "knee" : "ankle";
  const flooded = entry.levels.waist > 0 || entry.black || reportsCount >= 3;

  let confidence = 50 + Math.min(25, reportsCount * 3) + (hasPhoto ? 10 : 0) + (entry.recurring ? 5 : 0);
  if (!flooded) confidence -= 10;
  confidence = Math.min(95, Math.max(30, confidence));

  const photoPart = hasPhoto ? "et une photo de terrain" : "et aucune photo jointe";
  const reason = flooded
    ? `Inondation cohérente avec ${reportsCount} signalement${reportsCount > 1 ? "s" : ""} ${photoPart} — niveau ${levelMeta[level].short.toLowerCase()}.`
    : `Éléments limités : ${reportsCount} signalement${reportsCount > 1 ? "s" : ""} ${photoPart} — inondation non confirmée.`;

  return { flooded, level: flooded ? level : null, confidence, insufficient: false, reason };
}

// Appelle l'analyse IA réelle ; si elle est impossible, bascule sur le verdict simulé.
export async function verifyDistrict(entry: RankEntry, period: RankPeriod): Promise<VerifyOutcome> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildVerifyRequest(entry, period)),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || `réponse ${response.status}`);
    }

    return { verdict: (await response.json()) as FloodVerdict, simulated: false };
  } catch (err) {
    return {
      verdict: simulatedVerdict(entry, period),
      simulated: true,
      cause: err instanceof Error ? err.message : "appel indisponible",
    };
  }
}
