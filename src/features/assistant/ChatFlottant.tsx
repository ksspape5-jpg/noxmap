import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import ChatEmptyState from "./components/ChatEmptyState";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import MessageTools from "./components/MessageTools";
import { ASSISTANT_STRINGS, type AssistantLang } from "./config/assistantStrings";
import { useChat } from "./hooks/useChat";
import { useSpeech } from "./hooks/useSpeech";
import { PAGE_LABELS, suggestionsFor } from "./lib/navigation";
import { loadLang, saveLang } from "./lib/storage";
import { buildSystemPrompt } from "./lib/systemPrompt";

const REPO_URL = import.meta.env.VITE_REPO_URL || "https://github.com/ksspape5-jpg/noxmap";

export default function ChatFlottant() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<AssistantLang>(loadLang);
  const [copied, setCopied] = useState(false);

  const t = ASSISTANT_STRINGS[lang];
  const { pathname } = location;
  const pageLabel = PAGE_LABELS[pathname] ?? "Application";

  const chat = useChat((query) => buildSystemPrompt({ query, pathname, pageLabel, lang }));
  const speech = useSpeech(lang, (transcript) => setInput((prev) => (prev ? `${prev} ${transcript}` : transcript)));

  useEffect(() => saveLang(lang), [lang]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const send = (content: string) => {
    setInput("");
    chat.sendMessage(content);
  };

  const reset = () => {
    chat.reset();
    setInput("");
  };

  // Ouvre une issue GitHub pré-remplie avec la question et la réponse ; à défaut, copie le texte.
  const reportError = async (index: number) => {
    const answer = chat.messages[index]?.content ?? "";
    const question = [...chat.messages.slice(0, index)].reverse().find((item) => item.role === "user")?.content ?? "";
    const body = `Page : ${pageLabel} (${pathname})\n\nQuestion : ${question}\n\nRéponse : ${answer}\n\nDécrivez le problème : `;
    if (REPO_URL) {
      const params = `title=${encodeURIComponent("Erreur de l'assistant")}&body=${encodeURIComponent(body)}`;
      window.open(`${REPO_URL.replace(/\/$/, "")}/issues/new?${params}`, "_blank", "noreferrer");
      return;
    }
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      chat.setError("Copie impossible.");
    }
  };

  const goTo = (to: string) => {
    navigate(to);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        className={cn(
          "fixed right-5 bottom-22.5 z-1200 flex size-13 items-center justify-center rounded-full border-none",
          "bg-primary text-white shadow-brand-lg transition-[translate,background-color] duration-200 ease-[ease]",
          "hover:-translate-y-0.5 hover:bg-primary-dark max-md:right-3 max-md:bottom-19.5 print:hidden",
        )}
        onClick={() => setOpen(true)}
        aria-label={t.open}
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
        "max-md:right-2.5 max-md:bottom-19.5 max-md:left-2.5 max-md:max-h-[60vh] max-md:w-auto print:hidden",
      )}
    >
      <ChatHeader
        t={t}
        lang={lang}
        pageLabel={pageLabel}
        canReset={chat.messages.length > 0}
        onToggleLang={() => setLang((prev) => (prev === "fr" ? "wo" : "fr"))}
        onReset={reset}
        onClose={() => setOpen(false)}
      />
      <ChatMessages
        messages={chat.messages}
        loading={chat.loading}
        error={chat.error}
        note={copied ? t.copied : null}
        t={t}
        emptyState={<ChatEmptyState t={t} suggestions={suggestionsFor(pathname)} onSuggestion={send} />}
        renderTools={(message, index) => (
          <MessageTools
            message={message}
            t={t}
            onFeedback={(value) => chat.setFeedback(index, value)}
            onSpeak={speech.canSpeak ? () => speech.speak(message.content) : undefined}
            onReport={() => reportError(index)}
            onNavigate={goTo}
          />
        )}
      />
      <ChatInput
        t={t}
        value={input}
        disabled={chat.loading}
        onChange={setInput}
        onSend={send}
        mic={speech.canListen ? { listening: speech.listening, onToggle: speech.toggleMic } : undefined}
      />
      <p className="m-0 bg-white px-2.5 pb-2.25 text-center text-[9px] leading-[1.4] text-muted">
        {t.disclaimer}
        {t.reviewNote ? ` · ${t.reviewNote}` : ""}
      </p>
    </div>
  );
}
