import { describe, it, expect } from "vitest";
import {
  buildRankingCsv,
  buildRankingGeoJson,
  periodFromFilter,
  rankMetricLabel,
  rankRows,
  rankValue,
  seasonDelta,
  type RankEntry,
} from "./ranking";

const sample: RankEntry = {
  name: "Test",
  counts: { hour: 2, day: 10, week: 20 },
  levels: { ankle: 5, knee: 3, waist: 2 },
  history: [1, 2, 3],
  previous: 8,
  trend: "stable",
  black: true,
  recurring: true,
  lat: 14.7,
  lng: -17.3,
};

describe("periodFromFilter", () => {
  it("maps the UI filters to periods", () => {
    expect(periodFromFilter("Dernière heure")).toBe("hour");
    expect(periodFromFilter("7 jours")).toBe("week");
    expect(periodFromFilter("Aujourd'hui")).toBe("day");
    expect(periodFromFilter("inconnu")).toBe("day");
  });
});

describe("rankValue", () => {
  it("returns the raw volume for the selected period", () => {
    expect(rankValue(sample, "volume", "week")).toBe(20);
  });

  it("scales a level proportionally to the period", () => {
    expect(rankValue(sample, "knee", "day")).toBe(3);
    expect(rankValue(sample, "knee", "week")).toBe(6);
  });

  it("computes a weighted severity index", () => {
    expect(rankValue(sample, "severity", "day")).toBe(17);
    expect(rankValue(sample, "severity", "hour")).toBe(3);
  });
});

describe("rankRows", () => {
  it("sorts descending by value", () => {
    const rows = rankRows("volume", "day", false);
    const values = rows.map((row) => row.value);
    expect(values).toEqual([...values].sort((a, b) => b - a));
  });

  it("filters recurring quartiers when requested", () => {
    const rows = rankRows("volume", "day", true);
    expect(rows.every((row) => row.recurring)).toBe(true);
  });
});

describe("rankMetricLabel", () => {
  it("labels each metric", () => {
    expect(rankMetricLabel("volume")).toBe("signalements");
    expect(rankMetricLabel("waist")).toBe("points taille");
  });
});

describe("seasonDelta", () => {
  it("computes the percentage change against the previous season", () => {
    expect(seasonDelta(sample)).toBe(25);
    expect(seasonDelta({ ...sample, previous: 0 })).toBe(0);
  });
});

describe("exports", () => {
  const rows = rankRows("volume", "day", false);

  it("builds a CSV with a header and one line per quartier", () => {
    const csv = buildRankingCsv(rows);
    const lines = csv.split("\n");
    expect(lines[0]).toContain("Quartier");
    expect(lines).toHaveLength(rows.length + 1);
    expect(csv).toContain("Keur Massar");
  });

  it("builds a valid GeoJSON FeatureCollection", () => {
    const geojson = JSON.parse(buildRankingGeoJson(rows));
    expect(geojson.type).toBe("FeatureCollection");
    expect(geojson.features).toHaveLength(rows.length);
    expect(geojson.features[0].geometry.coordinates).toHaveLength(2);
  });
});
