import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { ASSISTANT_SYSTEM_PROMPT } from "../config/assistant";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const SUGGESTIONS = [
  "Comment signaler une inondation ?",
  "Qu'est-ce qu'un point noir ?",
  "Comment lire les niveaux d'eau ?",
  "À quoi sert le classement ?",
  "Comment utiliser la carte ?",
];

export default function ChatFlottant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    setError(null);
    const userMessage: Message = { role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", content: ASSISTANT_SYSTEM_PROMPT },
            ...newMessages,
          ],
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erreur API");
      }

      const data = await res.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.text || "Désolé, je n'ai pas pu générer de réponse.",
      };
      setMessages([...newMessages, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {!open && (
        <button
          className="chat-fab"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir l'assistant"
        >
          <Sparkles size={22} />
        </button>
      )}
      {open && (
        <div className="chat-popup">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="chat-title">Assistant Points Noirs Dakar</div>
                <div className="chat-subtitle">Guide intelligent</div>
              </div>
            </div>
            <button
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Fermer l'assistant"
            >
              <X size={18} />
            </button>
          </div>
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <div className="chat-empty-icon">
                  <MessageCircle size={24} />
                </div>
                <div className="chat-empty-title">Comment puis-je vous aider ?</div>
                <div className="chat-empty-subtitle">Je vous guide dans l'utilisation de l'application</div>
                <div className="chat-suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} className="chat-suggestion" onClick={() => handleSuggestion(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <div key={i} className={`chat-message ${m.role}`}>
                    <div className="chat-bubble">{m.content}</div>
                  </div>
                ))}
                {loading && (
                  <div className="chat-message assistant">
                    <div className="chat-bubble loading">
                      <Loader2 className="spin" size={16} />
                      <span>Réflexion en cours...</span>
                    </div>
                  </div>
                )}
                {error && <div className="chat-error">{error}</div>}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input-area" onSubmit={handleSubmit}>
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              disabled={loading}
            />
            <button className="chat-send" type="submit" disabled={loading || !input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
