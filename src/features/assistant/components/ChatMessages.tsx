import { useEffect, useRef, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { AssistantStrings } from "../config/assistantStrings";
import type { ChatMessage } from "../types";
import MessageContent from "./MessageContent";

type ChatMessagesProps = {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  note: string | null;
  t: AssistantStrings;
  emptyState: ReactNode;
  renderTools: (message: ChatMessage, index: number) => ReactNode;
};

const BUBBLE = "max-w-[85%] rounded-xl px-3 py-2 text-xs leading-normal wrap-anywhere";
const BUBBLE_ROLE = {
  user: "rounded-br-sm bg-primary text-white whitespace-pre-wrap",
  assistant: "rounded-bl-sm bg-canvas text-ink",
};

export default function ChatMessages({ messages, loading, error, note, t, emptyState, renderTools }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Pendant le streaming, la bulle de la réponse remplace l'indicateur de chargement.
  const streaming = loading && messages[messages.length - 1]?.role === "assistant";

  return (
    <div
      className="flex max-h-100 flex-1 flex-col gap-2.5 overflow-y-auto p-3.5"
      role="log"
      aria-live="polite"
      aria-label="Conversation avec l'assistant"
    >
      {messages.length === 0 ? (
        emptyState
      ) : (
        <>
          {messages.map((m, i) => (
            <div key={i} className={cn("flex w-full flex-col", m.role === "user" ? "items-end" : "items-start")}>
              <div className={cn(BUBBLE, BUBBLE_ROLE[m.role])}>
                {m.role === "assistant" ? <MessageContent content={m.content} /> : m.content}
              </div>
              {m.role === "assistant" && m.content && !(streaming && i === messages.length - 1) && renderTools(m, i)}
            </div>
          ))}
          {loading && !streaming && (
            <div className="flex w-full justify-start">
              <div className={cn(BUBBLE, BUBBLE_ROLE.assistant, "flex items-center gap-2")}>
                <Loader2 className="animate-spin" size={16} />
                <span>{t.loading}</span>
              </div>
            </div>
          )}
          {error && (
            <div className="rounded-lg bg-danger-soft px-2.5 py-2 text-center text-[10px] text-danger">{error}</div>
          )}
          {note && (
            <div className="rounded-lg bg-primary-soft px-2.5 py-2 text-center text-[10px] text-primary-dark">{note}</div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
