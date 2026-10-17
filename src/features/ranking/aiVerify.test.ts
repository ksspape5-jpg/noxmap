import { describe, it, expect, afterEach, vi } from "vitest";
import { DEMO_PHOTO_URL } from "@/shared/flood";
import { buildVerifyRequest, districtPhotos, simulatedVerdict, verifyDistrict, type FloodVerdict } from "./aiVerify";
import { rankData, type RankEntry } from "./rankingData";

const quiet: RankEntry = {
  name: "Quartier calme",
  counts: { hour: 0, day: 0, week: 0 },
  levels: { ankle: 0, knee: 0, waist: 0 },
  history: [0, 0, 0],
  previous: 0,
  trend: "stable",
  black: false,
  recurring: false,
  lat: 14.7,
  lng: -17.3,
};

describe("districtPhotos", () => {
  it("attache une photo aux quartiers dont un signalement en a une", () => {
    expect(districtPhotos("Keur Massar")).toEqual([DEMO_PHOTO_URL]);
    expect(districtPhotos("Guédiawaye")).toEqual([DEMO_PHOTO_URL]);
  });

  it("renvoie une liste vide sans photo", () => {
    expect(districtPhotos("Pikine")).toEqual([]);
    expect(districtPhotos("Quartier inconnu")).toEqual([]);
  });
});

describe("buildVerifyRequest", () => {
  const keurMassar = rankData.find((entry) => entry.name === "Keur Massar")!;

  it("traduit l'entrée du classement en payload d'analyse", () => {
    const request = buildVerifyRequest(keurMassar, "hour");

    expect(request.district).toBe("Keur Massar");
    expect(request.period).toBe("hour");
    expect(request.summary.reports).toBe(6);
    expect(request.summary.levels).toEqual(keurMassar.levels);
    expect(request.summary.black).toBe(true);
    expect(request.summary.previous).toBe(18);
    expect(request.photos).toEqual([DEMO_PHOTO_URL]);
  });

  it("se sert du bon compteur de signalements selon la période", () => {
    expect(buildVerifyRequest(keurMassar, "day").summary.reports).toBe(24);
    expect(buildVerifyRequest(keurMassar, "week").summary.reports).toBe(61);
  });
});

describe("simulatedVerdict", () => {
  it("déclare une donnée insuffisante quand rien n'a été signalé", () => {
    const verdict = simulatedVerdict(quiet, "day");
    expect(verdict.insufficient).toBe(true);
    expect(verdict.flooded).toBe(false);
    expect(verdict.level).toBeNull();
  });

  it("confirme l'inondation pour un point noir (niveau taille)", () => {
    const verdict = simulatedVerdict(rankData[0], "day");
    expect(verdict.flooded).toBe(true);
    expect(verdict.level).toBe("waist");
    expect(verdict.insufficient).toBe(false);
  });

  it("reste déterministe et borné entre 0 et 100", () => {
    for (const entry of rankData) {
      const first = simulatedVerdict(entry, "week");
      const second = simulatedVerdict(entry, "week");
      expect(first).toEqual(second);
      expect(first.confidence).toBeGreaterThanOrEqual(0);
      expect(first.confidence).toBeLessThanOrEqual(100);
      expect(first.reason.length).toBeGreaterThan(10);
    }
  });
});

describe("verifyDistrict", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("utilise le vrai verdict quand l'API répond", async () => {
    const body: FloodVerdict = {
      flooded: false,
      level: null,
      confidence: 78,
      insufficient: false,
      reason: "Aucun indice d'eau sur les photos.",
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(body) }));

    const outcome = await verifyDistrict(rankData[1], "hour");
    expect(outcome.simulated).toBe(false);
    expect(outcome.verdict).toEqual(body);
  });

  it("bascule en mode démo quand l'appel échoue", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: () => Promise.resolve({ error: "clé invalide" }) }));

    const outcome = await verifyDistrict(rankData[0], "day");
    expect(outcome.simulated).toBe(true);
    expect(outcome.cause).toBe("clé invalide");
    expect(outcome.verdict).toEqual(simulatedVerdict(rankData[0], "day"));
  });

  it("bascule en mode démo quand le serveur est injoignable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("réseau coupé")));

    const outcome = await verifyDistrict(rankData[2], "day");
    expect(outcome.simulated).toBe(true);
    expect(outcome.cause).toBe("réseau coupé");
    expect(outcome.verdict.insufficient).toBe(false);
  });
});

describe("FloodVerdict", () => {
  it("décrit un verdict exploitable par l'affichage", () => {
    const verdict: FloodVerdict = {
      flooded: true,
      level: "waist",
      confidence: 87,
      insufficient: false,
      reason: "Eau visible à hauteur de taille.",
    };
    expect(verdict.flooded).toBe(true);
    expect(verdict.level).toBe("waist");
  });
});
