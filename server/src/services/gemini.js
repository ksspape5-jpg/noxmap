import fetch from "node-fetch";
import { GEMINI_API_KEY, GEMINI_MODEL } from "../config.js";

const SYSTEM_PROMPT_PREFIX = "Tu es l'assistant";

export class GeminiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Le client envoie le prompt système comme premier message "user" : on le sépare de l'historique.
function splitSystemPrompt(messages) {
  const [first, ...rest] = messages;
  if (first && first.role === "user" && first.content.startsWith(SYSTEM_PROMPT_PREFIX)) {
    return { systemPrompt: first.content, chatMessages: rest };
  }
  return { systemPrompt: "", chatMessages: messages };
}

function buildContents(messages) {
  const { systemPrompt, chatMessages } = splitSystemPrompt(messages);
  const history = chatMessages
    .map((m) => (m.role === "assistant" ? "Assistant" : "Utilisateur") + ": " + m.content)
    .join("\n");
  return [{ role: "user", parts: [{ text: systemPrompt + "\n\nContexte:\n" + history }] }];
}

export async function generateReply(messages) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: buildContents(messages) }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new GeminiError(data.error?.message || "Erreur Gemini", response.status);
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
