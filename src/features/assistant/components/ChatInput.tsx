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
    <form className="flex gap-1.5 border-t border-border bg-white p-2.5" onSubmit={handleSubmit}>
      <input
        className="flex-1 rounded-[10px] border border-border px-2.5 py-2 text-xs outline-none focus:border-primary"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Posez votre question..."
        disabled={disabled}
      />
      <button
        className="flex size-9 items-center justify-center rounded-[10px] border-none bg-primary text-white disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={disabled || !input.trim()}
      >
        <Send size={18} />
      </button>
    </form>
  );
}
