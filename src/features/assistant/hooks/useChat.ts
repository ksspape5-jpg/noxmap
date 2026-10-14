import { useState } from "react";
import { sendChatMessages } from "../api/chatApi";
import type { ChatMessage } from "../types";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    setError(null);
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: content.trim() }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const text = await sendChatMessages(newMessages);
      setMessages([...newMessages, { role: "assistant", content: text }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
}
