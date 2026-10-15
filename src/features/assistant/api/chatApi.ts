import { ASSISTANT_SYSTEM_PROMPT } from "../config/assistantPrompt";
import type { ChatMessage } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export async function sendChatMessages(messages: ChatMessage[]): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: ASSISTANT_SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Erreur API");
  }

  const data = await res.json();
  return data.text || "Désolé, je n'ai pas pu générer de réponse.";
}
