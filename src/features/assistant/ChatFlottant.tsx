import { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { useChat } from "./hooks/useChat";

export default function ChatFlottant() {
  const [open, setOpen] = useState(false);
  const { messages, loading, error, sendMessage } = useChat();

  if (!open) {
    return (
      <button
        className={cn(
          "fixed right-5 bottom-22.5 z-1200 flex size-13 items-center justify-center rounded-full border-none",
          "bg-primary text-white shadow-brand-lg transition-[translate,background-color] duration-200 ease-[ease]",
          "hover:-translate-y-0.5 hover:bg-primary-dark max-md:right-3 max-md:bottom-19.5",
        )}
        onClick={() => setOpen(true)}
        aria-label="Ouvrir l'assistant"
      >
        <Sparkles size={22} />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "fixed right-5 bottom-22.5 z-1200 flex max-h-[70vh] w-85 flex-col overflow-hidden",
        "rounded-2xl border border-border bg-white shadow-[0_20px_60px_rgba(27,45,40,.25)]",
        // Apparition : glisse de 10px vers le haut en fondu (@starting-style)
        "transition-[opacity,translate] duration-200 ease-[ease] starting:translate-y-2.5 starting:opacity-0",
        "max-md:right-2.5 max-md:bottom-19.5 max-md:left-2.5 max-md:max-h-[60vh] max-md:w-auto",
      )}
    >
      <ChatHeader onClose={() => setOpen(false)} />
      <ChatMessages messages={messages} loading={loading} error={error} onSuggestion={sendMessage} />
      <ChatInput disabled={loading} onSend={sendMessage} />
    </div>
  );
}
