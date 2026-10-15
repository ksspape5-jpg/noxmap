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

function callGemini(action, body, signal) {
  return fetch(`${GEMINI_BASE}/${GEMINI_MODEL}:${action}key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildPayload(body)),
    signal,
  });
}

export async function generateReply(body) {
  const response = await callGemini("generateContent?", body);
  const data = await response.json();
  if (!response.ok) {
    throw new GeminiError(data.error?.message || "Erreur Gemini", response.status);
  }
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
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
