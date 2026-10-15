import type { Level } from "@/shared/flood";

// Données de démonstration et calculs du classement.
export type RankPeriod = "hour" | "day" | "week";
export type RankMetric = "volume" | "severity" | Level;

export type RankEntry = {
  name: string;
  counts: Record<RankPeriod, number>;
  levels: Record<Level, number>;
  history: number[];
  previous: number;
  trend: string;
  black: boolean;
  recurring: boolean;
  lat: number;
  lng: number;
};

export type RankRow = RankEntry & { value: number };

export const rankData: RankEntry[] = [
  { name: "Keur Massar", counts: { hour: 6, day: 24, week: 61 }, levels: { ankle: 8, knee: 9, waist: 7 }, history: [4, 9, 12, 8, 15, 19, 24], previous: 18, trend: "+8 aujourd'hui", black: true, recurring: true, lat: 14.786, lng: -17.311 },
  { name: "Pikine", counts: { hour: 4, day: 18, week: 44 }, levels: { ankle: 7, knee: 7, waist: 4 }, history: [3, 6, 10, 7, 11, 14, 18], previous: 15, trend: "+4 aujourd'hui", black: true, recurring: true, lat: 14.755, lng: -17.391 },
  { name: "Thiaroye", counts: { hour: 3, day: 13, week: 33 }, levels: { ankle: 6, knee: 5, waist: 2 }, history: [2, 5, 7, 6, 9, 11, 13], previous: 11, trend: "+2 aujourd'hui", black: false, recurring: true, lat: 14.746, lng: -17.36 },
  { name: "Guédiawaye", counts: { hour: 2, day: 9, week: 21 }, levels: { ankle: 5, knee: 3, waist: 1 }, history: [1, 3, 4, 5, 4, 7, 9], previous: 10, trend: "stable", black: false, recurring: false, lat: 14.775, lng: -17.411 },
  { name: "Rufisque", counts: { hour: 1, day: 8, week: 14 }, levels: { ankle: 4, knee: 3, waist: 1 }, history: [1, 2, 3, 4, 3, 6, 8], previous: 5, trend: "+1 aujourd'hui", black: false, recurring: false, lat: 14.72, lng: -17.27 },
];

const SEVERITY_WEIGHTS: Record<Level, number> = { waist: 3, knee: 2, ankle: 1 };

export function periodFromFilter(filter: string): RankPeriod {
  if (filter === "Dernière heure") return "hour";
  if (filter === "7 jours") return "week";
  return "day";
}

export function rankValue(item: RankEntry, metric: RankMetric, period: RankPeriod): number {
  const base = item.counts[period];
  const dayTotal = item.counts.day || 1;
  if (metric === "volume") return base;
  if (metric === "severity") {
    const weighted = item.levels.waist * SEVERITY_WEIGHTS.waist + item.levels.knee * SEVERITY_WEIGHTS.knee + item.levels.ankle * SEVERITY_WEIGHTS.ankle;
    return Math.max(base > 0 ? 1 : 0, Math.round((base * weighted) / dayTotal));
  }
  return Math.round((base * item.levels[metric]) / dayTotal);
}

export function rankMetricLabel(metric: RankMetric): string {
  if (metric === "volume") return "signalements";
  if (metric === "severity") return "points de gravité";
  if (metric === "waist") return "points taille";
  if (metric === "knee") return "points genou";
  return "points cheville";
}

export function rankRows(metric: RankMetric, period: RankPeriod, recurringOnly: boolean): RankRow[] {
  const rows = rankData
    .map((item) => ({ ...item, value: rankValue(item, metric, period) }))
    .sort((a, b) => b.value - a.value);
  return recurringOnly ? rows.filter((item) => item.recurring) : rows;
}

export function seasonDelta(item: RankEntry): number {
  if (!item.previous) return 0;
  return Math.round(((item.counts.day - item.previous) / item.previous) * 100);
}

function csvCell(value: string | number | boolean): string {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export function buildRankingCsv(rows: RankRow[]): string {
  const header = ["Quartier", "Signalements", "Tendance", "Point noir", "Zone recurrente", "Saison precedente"];
  const lines = rows.map((item) => [item.name, item.value, item.trend, item.black ? "oui" : "non", item.recurring ? "oui" : "non", item.previous]);
  return [header, ...lines].map((line) => line.map(csvCell).join(",")).join("\n");
}

export function buildRankingGeoJson(rows: RankRow[]): string {
  const geojson = {
    type: "FeatureCollection",
    features: rows.map((item) => ({
      type: "Feature",
      properties: {
        nom: item.name,
        signalements: item.value,
        tendance: item.trend,
        pointNoir: item.black,
        zoneRecurrente: item.recurring,
        saisonPrecedente: item.previous,
      },
      geometry: { type: "Point", coordinates: [item.lng, item.lat] },
    })),
  };
  return JSON.stringify(geojson, null, 2);
}
