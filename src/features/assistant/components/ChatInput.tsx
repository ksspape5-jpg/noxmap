import type { FormEvent } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { AssistantStrings } from "../config/assistantStrings";

type ChatInputProps = {
  t: AssistantStrings;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSend: (content: string) => void;
  // Absent si le navigateur ne gère pas la dictée.
  mic?: { listening: boolean; onToggle: () => void };
};

const SQUARE = "flex size-9 flex-none items-center justify-center rounded-[10px]";

export default function ChatInput({ t, value, disabled, onChange, onSend, mic }: ChatInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
  };

  return (
    <form className="flex gap-1.5 border-t border-border bg-white p-2.5" onSubmit={handleSubmit}>
      <input
        className="min-w-0 flex-1 rounded-[10px] border border-border px-2.5 py-2 text-xs outline-none focus:border-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.placeholder}
        disabled={disabled}
      />
      {mic && (
        <button
          type="button"
          className={cn(
            SQUARE,
            "border border-border bg-white text-primary",
            mic.listening && "border-danger/40 bg-danger-soft text-danger",
          )}
          onClick={mic.onToggle}
          aria-label={mic.listening ? t.micStop : t.micStart}
        >
          {mic.listening ? <MicOff size={17} /> : <Mic size={17} />}
        </button>
      )}
      <button
        className={cn(SQUARE, "border-none bg-primary text-white disabled:cursor-not-allowed disabled:opacity-50")}
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label={t.send}
      >
        <Send size={18} />
      </button>
    </form>
  );
}
