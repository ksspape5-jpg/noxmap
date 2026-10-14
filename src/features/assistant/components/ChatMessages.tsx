import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import type { ChatMessage } from "../types";
import ChatEmptyState from "./ChatEmptyState";

type ChatMessagesProps = {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  onSuggestion: (suggestion: string) => void;
};

export default function ChatMessages({ messages, loading, error, onSuggestion }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-messages">
      {messages.length === 0 ? (
        <ChatEmptyState onSuggestion={onSuggestion} />
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
  );
}
