import fetch from "node-fetch";
import { GEMINI_API_KEY, GEMINI_MODEL } from "../config.js";

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const SYSTEM_PROMPT_PREFIX = "Tu es l'assistant";

export class GeminiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Le prompt système arrive dans `systemPrompt` ; les anciens clients l'envoyaient comme premier message "user".
function splitSystemPrompt(body) {
  const systemPrompt = typeof body.systemPrompt === "string" ? body.systemPrompt : "";
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const [first, ...rest] = messages;
  if (!systemPrompt && first?.role === "user" && typeof first.content === "string" && first.content.startsWith(SYSTEM_PROMPT_PREFIX)) {
    return { systemPrompt: first.content, chatMessages: rest };
  }
  return { systemPrompt, chatMessages: messages };
}

function buildPayload(body) {
  const { systemPrompt, chatMessages } = splitSystemPrompt(body);
  const contents = chatMessages
    .filter((m) => typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));

  const payload = { contents };
  if (systemPrompt) payload.systemInstruction = { parts: [{ text: systemPrompt }] };
  return payload;
}

function postPayload(action, payload, signal) {
  return fetch(`${GEMINI_BASE}/${GEMINI_MODEL}:${action}key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
}

function callGemini(action, body, signal) {
  return postPayload(action, buildPayload(body), signal);
}

export async function generateReply(body) {
  const response = await callGemini("generateContent?", body);
  const data = await response.json();
  if (!response.ok) {
    throw new GeminiError(data.error?.message || "Erreur Gemini", response.status);
  }
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

const VERIFY_SYSTEM_PROMPT = `Tu es un analyste expert en inondations urbaines à Dakar et dans sa banlieue (Sénégal).

Ta mission : confirmer si une zone signalée est réellement inondée ou non, en croisant les photos de terrain et les données de signalement qui te sont fournies.

Principes non négociables :
- Tu ne décides jamais seul d'une urgence : tu fournis une aide à la décision, la communauté ou un responsable confirme.
- Tu n'inventes aucune information. Si les éléments sont insuffisants ou contradictoires, tu réponds "donnée insuffisante" (insufficient: true).
- Tu indiques toujours un indice de confiance de 0 à 100.
- Les niveaux d'eau sont : "ankle" (cheville), "knee" (genou), "waist" (taille, point noir).

Réponds STRICTEMENT en JSON, sans texte autour, avec exactement ces champs :
{
  "flooded": boolean,          // la zone est-elle inondée ?
  "level": "ankle" | "knee" | "waist" | null,
  "confidence": number,        // 0 à 100
  "insufficient": boolean,     // true si les données ne permettent pas de conclure
  "reason": string             // 1 à 2 phrases en français, sans jargon
}`;

function parseJsonResponse(text) {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  return JSON.parse(cleaned);
}

// Analyse multimodale (texte + photos) : renvoie un verdict structuré sur l'inondation d'une zone.
export async function verifyFlood({ prompt, images = [] }) {
  const parts = [{ text: prompt }];
  for (const image of images) {
    parts.push({ inlineData: { mimeType: image.mimeType, data: image.data } });
  }

  const payload = {
    contents: [{ role: "user", parts }],
    systemInstruction: { parts: [{ text: VERIFY_SYSTEM_PROMPT }] },
    generationConfig: { responseMimeType: "application/json", temperature: 0.2 },
  };

  const response = await postPayload("generateContent?", payload);
  const data = await response.json();
  if (!response.ok) {
    throw new GeminiError(data.error?.message || "Erreur Gemini", response.status);
  }

  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  try {
    return parseJsonResponse(text);
  } catch {
    throw new GeminiError("Réponse d'analyse illisible", 502);
  }
}

// Renvoie les morceaux de texte au fil de l'eau, à partir du flux SSE de Gemini.
export async function* streamReply(body, signal) {
  const response = await callGemini("streamGenerateContent?alt=sse&", body, signal);
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new GeminiError(data.error?.message || "Erreur Gemini", response.status);
  }

  let buffer = "";
  for await (const chunk of response.body) {
    buffer += chunk.toString("utf8");
    let index;
    while ((index = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, index).trim();
      buffer = buffer.slice(index + 1);
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const parsed = JSON.parse(payload);
        const text = parsed.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
        if (text) yield text;
      } catch {
        // morceau mal formé : on l'ignore
      }
    }
  }
}
