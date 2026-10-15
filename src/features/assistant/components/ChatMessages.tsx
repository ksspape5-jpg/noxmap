import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { ChatMessage } from "../types";
import ChatEmptyState from "./ChatEmptyState";

type ChatMessagesProps = {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  onSuggestion: (suggestion: string) => void;
};

const BUBBLE = "max-w-[85%] rounded-xl px-3 py-2 text-xs leading-normal whitespace-pre-wrap wrap-anywhere";

const BUBBLE_ROLE = {
  user: "rounded-br-sm bg-primary text-white",
  assistant: "rounded-bl-sm bg-canvas text-ink",
};

export default function ChatMessages({ messages, loading, error, onSuggestion }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex max-h-100 flex-1 flex-col gap-2.5 overflow-y-auto p-3.5">
      {messages.length === 0 ? (
        <ChatEmptyState onSuggestion={onSuggestion} />
      ) : (
        <>
          {messages.map((m, i) => (
            <div key={i} className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn(BUBBLE, BUBBLE_ROLE[m.role])}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="flex w-full justify-start">
              <div className={cn(BUBBLE, BUBBLE_ROLE.assistant, "flex items-center gap-2")}>
                <Loader2 className="animate-spin" size={16} />
                <span>Réflexion en cours...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="rounded-lg bg-danger-soft px-2.5 py-2 text-center text-[10px] text-danger">{error}</div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
