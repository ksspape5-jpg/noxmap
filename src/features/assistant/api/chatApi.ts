import type { ChatMessage } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

function post(path: string, systemPrompt: string, messages: ChatMessage[]) {
  return fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt, messages: messages.map(({ role, content }) => ({ role, content })) }),
  });
}

export async function requestReply(systemPrompt: string, messages: ChatMessage[]): Promise<string> {
  const res = await post("/api/chat", systemPrompt, messages);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Erreur API");
  }
  const data = await res.json();
  return data.text || "Désolé, je n'ai pas pu générer de réponse.";
}

// Lit le flux SSE du serveur et appelle `onText` avec le texte cumulé à chaque morceau reçu.
export async function streamReply(
  systemPrompt: string,
  messages: ChatMessage[],
  onText: (text: string) => void,
): Promise<void> {
  const res = await post("/api/chat/stream", systemPrompt, messages);
  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Flux indisponible");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let streamError: string | null = null;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let index;
    while ((index = buffer.indexOf("\n\n")) >= 0) {
      const block = buffer.slice(0, index);
      buffer = buffer.slice(index + 2);
      for (const line of block.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        let parsed: { text?: string; error?: string };
        try {
          parsed = JSON.parse(payload);
        } catch {
          continue;
        }
        if (parsed.error) streamError = parsed.error;
        if (parsed.text) {
          text += parsed.text;
          onText(text);
        }
      }
    }
  }

  if (streamError) throw new Error(streamError);
  if (!text) throw new Error("Réponse vide");
}
