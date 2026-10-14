import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type ChatInputProps = { disabled: boolean; onSend: (content: string) => void };

export default function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form className="chat-input-area" onSubmit={handleSubmit}>
      <input
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Posez votre question..."
        disabled={disabled}
      />
      <button className="chat-send" type="submit" disabled={disabled || !input.trim()}>
        <Send size={18} />
      </button>
    </form>
  );
}
