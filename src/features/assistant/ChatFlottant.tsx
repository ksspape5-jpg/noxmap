import { useState } from "react";
import { Sparkles } from "lucide-react";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { useChat } from "./hooks/useChat";
import "./ChatFlottant.css";

export default function ChatFlottant() {
  const [open, setOpen] = useState(false);
  const { messages, loading, error, sendMessage } = useChat();

  if (!open) {
    return (
      <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Ouvrir l'assistant">
        <Sparkles size={22} />
      </button>
    );
  }

  return (
    <div className="chat-popup">
      <ChatHeader onClose={() => setOpen(false)} />
      <ChatMessages messages={messages} loading={loading} error={error} onSuggestion={sendMessage} />
      <ChatInput disabled={loading} onSend={sendMessage} />
    </div>
  );
}
