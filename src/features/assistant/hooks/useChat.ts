import { useEffect, useState } from "react";
import { requestReply, streamReply } from "../api/chatApi";
import { loadHistory, logQuestion, saveHistory } from "../lib/storage";
import type { ChatMessage } from "../types";

// `buildPrompt` reçoit la question et renvoie le prompt système à envoyer avec l'historique.
export function useChat(buildPrompt: (query: string) => string) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => saveHistory(messages), [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    setError(null);
    const question = content.trim();
    const history: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(history);
    setLoading(true);
    logQuestion(question);

    const systemPrompt = buildPrompt(question);
    try {
      await streamReply(systemPrompt, history, (text) =>
        setMessages([...history, { role: "assistant", content: text }]),
      );
    } catch {
      // Flux indisponible : on retente sans streaming.
      try {
        const text = await requestReply(systemPrompt, history);
        setMessages([...history, { role: "assistant", content: text }]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur réseau");
        setMessages(history);
      }
    } finally {
      setLoading(false);
    }
  };

  const setFeedback = (index: number, value: "up" | "down") => {
    setMessages((prev) =>
      prev.map((item, i) => (i === index ? { ...item, feedback: item.feedback === value ? undefined : value } : item)),
    );
  };

  const reset = () => {
    setMessages([]);
    setError(null);
  };

  return { messages, loading, error, setError, sendMessage, setFeedback, reset };
}
