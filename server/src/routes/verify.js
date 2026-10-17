import { Router } from "express";
import fetch from "node-fetch";
import { GEMINI_API_KEY } from "../config.js";
import { GeminiError, verifyFlood } from "../services/gemini.js";

const router = Router();

const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 8_000;
const PERIOD_LABELS = { hour: "dernière heure", day: "aujourd'hui", week: "7 derniers jours" };

// Récupère une photo distante et la renvoie en base64 prêt pour Gemini. Renvoie null si inutilisable.
async function fetchPhoto(url) {
  if (typeof url !== "string" || !/^https?:\/\//i.test(url)) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;

    const mimeType = (response.headers.get("content-type") || "").split(";")[0].trim();
    if (!mimeType.startsWith("image/")) return null;

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length === 0 || buffer.length > MAX_PHOTO_BYTES) return null;

    return { mimeType, data: buffer.toString("base64") };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function buildPrompt(body, photoCount) {
  const summary = body.summary && typeof body.summary === "object" ? body.summary : {};
  const levels = summary.levels && typeof summary.levels === "object" ? summary.levels : {};
  const period = PERIOD_LABELS[body.period] || "période inconnue";

  return [
    `Quartier : ${body.district} (Dakar / banlieue)`,
    `Période analysée : ${period}`,
    `Signalements sur la période : ${Number(summary.reports) || 0}`,
    `Répartition des niveaux (24 h) : cheville ${Number(levels.ankle) || 0}, genou ${Number(levels.knee) || 0}, taille ${Number(levels.waist) || 0}`,
    `Point noir connu : ${summary.black ? "oui" : "non"}`,
    `Zone récurrente : ${summary.recurring ? "oui" : "non"}`,
    `Tendance : ${typeof summary.trend === "string" ? summary.trend : "inconnue"}`,
    `Saison précédente : ${Number(summary.previous) || 0} signalements`,
    `Photos de terrain jointes : ${photoCount}`,
    "",
    "Croise les photos et les données, puis confirme si la zone est inondée ou non.",
  ].join("\n");
}

// Analyse une zone signalée (photos + données) et renvoie un verdict structuré.
router.post("/", async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Clé API non configurée côté serveur" });
  }

  const district = typeof req.body?.district === "string" ? req.body.district.trim() : "";
  if (!district) {
    return res.status(400).json({ error: "Quartier requis" });
  }

  const photos = Array.isArray(req.body?.photos) ? req.body.photos.slice(0, MAX_PHOTOS) : [];
  const images = (await Promise.all(photos.map(fetchPhoto))).filter(Boolean);

  try {
    const verdict = await verifyFlood({ prompt: buildPrompt(req.body, images.length), images });
    res.json(verdict);
  } catch (error) {
    if (error instanceof GeminiError) {
      return res.status(error.status).json({ error: error.message });
    }
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
