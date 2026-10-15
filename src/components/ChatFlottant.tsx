import { useState, useRef, useEffect, type FormEvent, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Mic,
  MicOff,
  Flag,
} from "lucide-react";
import { ASSISTANT_SYSTEM_PROMPT } from "../config/assistant";
import { buildKnowledgeContext } from "../config/knowledge";
import { ASSISTANT_STRINGS, WOLOF_INSTRUCTION, type AssistantLang } from "../config/assistantStrings";
import { PAGE_LABELS, quickLinksFor, suggestionsFor } from "../lib/assistant";

type Message = {
  role: "user" | "assistant";
  content: string;
  feedback?: "up" | "down";
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const REPO_URL = import.meta.env.VITE_REPO_URL || "https://github.com/ksspape5-jpg/noxmap";
const STORAGE_KEY = "pn-assistant-history";
const LANG_KEY = "pn-assistant-lang";
const LOG_KEY = "pn-assistant-log";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<code key={key++}>{token.slice(1, -1)}</code>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function MessageContent({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  let listItems: ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;
  let key = 0;

  const flushList = () => {
    if (listItems.length && listType) {
      blocks.push(
        listType === "ul" ? (
          <ul key={`list-${key++}`}>{listItems}</ul>
        ) : (
          <ol key={`list-${key++}`}>{listItems}</ol>
        ),
      );
    }
    listItems = [];
    listType = null;
  };

  content.split("\n").forEach((raw) => {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    const heading = line.match(/^#{1,6}\s+(.*)$/);

    if (bullet) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listItems.push(<li key={`li-${key++}`}>{renderInline(bullet[1])}</li>);
    } else if (ordered) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listItems.push(<li key={`li-${key++}`}>{renderInline(ordered[1])}</li>);
    } else if (heading) {
      flushList();
      blocks.push(
        <p key={`h-${key++}`} className="chat-heading">
          {renderInline(heading[1])}
        </p>,
      );
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      blocks.push(<p key={`p-${key++}`}>{renderInline(line)}</p>);
    }
  });
  flushList();

  return <>{blocks}</>;
}

function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Message =>
        item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string",
    );
  } catch {
    return [];
  }
}

function loadLang(): AssistantLang {
  try {
    return localStorage.getItem(LANG_KEY) === "wo" ? "wo" : "fr";
  } catch {
    return "fr";
  }
}

function logQuestion(question: string) {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    const log = raw ? JSON.parse(raw) : [];
    if (Array.isArray(log)) {
      log.push({ q: question.slice(0, 280), at: Date.now() });
      localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(-50)));
    }
  } catch {
    // stockage indisponible : on ignore
  }
}

export default function ChatFlottant() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState<AssistantLang>(loadLang);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const t = ASSISTANT_STRINGS[lang];
  const pageLabel = PAGE_LABELS[location.pathname] ?? "Application";
  const suggestions = suggestionsFor(location.pathname);
  const speechSynthesisSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const speechRecognitionSupported =
    typeof window !== "undefined" &&
    Boolean(
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition,
    );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // stockage indisponible : on ignore
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      // stockage indisponible : on ignore
    }
  }, [lang]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const buildSystemPrompt = (query: string) => {
    const parts = [
      ASSISTANT_SYSTEM_PROMPT,
      `Contexte de navigation : l'utilisateur consulte actuellement la page « ${pageLabel} » (${location.pathname}). Tiens-en compte lorsque c'est utile.`,
    ];
    const knowledge = buildKnowledgeContext(query);
    if (knowledge) parts.push(knowledge);
    if (lang === "wo") parts.push(WOLOF_INSTRUCTION);
    return parts.join("\n\n");
  };

  const requestReply = async (history: Message[], query: string): Promise<string> => {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt: buildSystemPrompt(query), messages: history }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Erreur API");
    }
    const data = await res.json();
    return data.text || "Désolé, je n'ai pas pu générer de réponse.";
  };

  const streamReply = async (history: Message[], query: string) => {
    const res = await fetch(`${API_BASE_URL}/api/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt: buildSystemPrompt(query), messages: history }),
    });
    if (!res.ok || !res.body) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Flux indisponible");
    }

    setMessages([...history, { role: "assistant", content: "" }]);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let assistantText = "";
    let streamError: string | null = null;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let index;
      while ((index = buffer.indexOf("\n\n")) >= 0) {
        const block = buffer.slice(0, index);
        buffer = buffer.slice(index + 2);
        for (const line of block.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          let parsed: { text?: string; error?: string };
          try {
            parsed = JSON.parse(payload);
          } catch {
            continue;
          }
          if (parsed.error) streamError = parsed.error;
          if (parsed.text) {
            assistantText += parsed.text;
            setMessages([...history, { role: "assistant", content: assistantText }]);
          }
        }
      }
    }

    if (streamError) throw new Error(streamError);
    if (!assistantText) throw new Error("Réponse vide");
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;
    setError(null);
    const userMessage: Message = { role: "user", content: content.trim() };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setLoading(true);
    logQuestion(userMessage.content);

    try {
      await streamReply(history, userMessage.content);
    } catch {
      try {
        const text = await requestReply(history, userMessage.content);
        setMessages([...history, { role: "assistant", content: text }]);
      } catch (fallbackError) {
        setError(fallbackError instanceof Error ? fallbackError.message : "Erreur réseau");
        setMessages(history);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const setFeedback = (index: number, value: "up" | "down") => {
    setMessages((prev) =>
      prev.map((item, i) => (i === index ? { ...item, feedback: item.feedback === value ? undefined : value } : item)),
    );
  };

  const newConversation = () => {
    setMessages([]);
    setError(null);
    setInput("");
  };

  const speak = (text: string) => {
    if (!speechSynthesisSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*`>|]/g, " ").replace(/\s+/g, " ").trim());
    utterance.lang = lang === "wo" ? "wo-SN" : "fr-FR";
    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Ctor = (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike });
    const Recognition = Ctor.SpeechRecognition || Ctor.webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = lang === "wo" ? "wo-SN" : "fr-FR";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, i) => event.results[i][0].transcript).join(" ");
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const reportError = async (index: number) => {
    const answer = messages[index]?.content ?? "";
    const previousQuestion = [...messages.slice(0, index)].reverse().find((item) => item.role === "user")?.content ?? "";
    const body = `Page : ${pageLabel} (${location.pathname})\n\nQuestion : ${previousQuestion}\n\nRéponse : ${answer}\n\nDécrivez le problème : `;
    if (REPO_URL) {
      window.open(
        `${REPO_URL.replace(/\/$/, "")}/issues/new?title=${encodeURIComponent("Erreur de l'assistant")}&body=${encodeURIComponent(body)}`,
        "_blank",
        "noreferrer",
      );
      return;
    }
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Copie impossible.");
    }
  };

  const goTo = (to: string) => {
    navigate(to);
    setOpen(false);
  };

  return (
    <>
      {!open && (
        <button
          className="chat-fab"
          onClick={() => setOpen(true)}
          aria-label={t.open}
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
                <div className="chat-subtitle">{t.subtitle} · {pageLabel}</div>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                className="chat-lang"
                onClick={() => setLang((prev) => (prev === "fr" ? "wo" : "fr"))}
                aria-label={lang === "fr" ? "Passer en wolof" : "Passer en français"}
                title={lang === "fr" ? "Wolof" : "Français"}
              >
                {lang === "fr" ? "WO" : "FR"}
              </button>
              {messages.length > 0 && (
                <button className="chat-icon-btn" onClick={newConversation} aria-label={t.newChat} title={t.newChat}>
                  <RotateCcw size={16} />
                </button>
              )}
              <button
                className="chat-icon-btn"
                onClick={() => setOpen(false)}
                aria-label={t.close}
              >
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="chat-messages" role="log" aria-live="polite" aria-label="Conversation avec l'assistant">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <div className="chat-empty-icon">
                  <MessageCircle size={24} />
                </div>
                <div className="chat-empty-title">{t.emptyTitle}</div>
                <div className="chat-empty-subtitle">{t.emptySubtitle}</div>
                <div className="chat-suggestions">
                  {suggestions.map((s) => (
                    <button key={s} className="chat-suggestion" onClick={() => sendMessage(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <div key={i} className={`chat-message ${m.role}`}>
                    <div className="chat-bubble">
                      {m.role === "assistant" ? <MessageContent content={m.content} /> : m.content}
                    </div>
                    {m.role === "assistant" && m.content && (
                      <div className="chat-message-tools">
                        <button
                          className={`chat-tool ${m.feedback === "up" ? "active" : ""}`}
                          onClick={() => setFeedback(i, "up")}
                          aria-label={t.useful}
                        >
                          <ThumbsUp size={13} />
                        </button>
                        <button
                          className={`chat-tool ${m.feedback === "down" ? "active" : ""}`}
                          onClick={() => setFeedback(i, "down")}
                          aria-label={t.notUseful}
                        >
                          <ThumbsDown size={13} />
                        </button>
                        {speechSynthesisSupported && (
                          <button className="chat-tool" onClick={() => speak(m.content)} aria-label={t.listen}>
                            <Volume2 size={13} />
                          </button>
                        )}
                        <button className="chat-tool" onClick={() => reportError(i)} aria-label={t.report} title={t.report}>
                          <Flag size={13} />
                        </button>
                        {quickLinksFor(m.content).map((link) => (
                          <button key={link.to} className="chat-quick-link" onClick={() => goTo(link.to)}>
                            {link.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="chat-message assistant">
                    <div className="chat-bubble loading">
                      <Loader2 className="spin" size={16} />
                      <span>{t.loading}</span>
                    </div>
                  </div>
                )}
                {error && <div className="chat-error">{error}</div>}
                {copied && <div className="chat-note">{t.copied}</div>}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input-area" onSubmit={handleSubmit}>
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              disabled={loading}
            />
            {speechRecognitionSupported && (
              <button
                type="button"
                className={`chat-mic ${listening ? "active" : ""}`}
                onClick={toggleMic}
                aria-label={listening ? t.micStop : t.micStart}
              >
                {listening ? <MicOff size={17} /> : <Mic size={17} />}
              </button>
            )}
            <button className="chat-send" type="submit" disabled={loading || !input.trim()} aria-label={t.send}>
              <Send size={18} />
            </button>
          </form>
          <p className="chat-disclaimer">
            {t.disclaimer}
            {t.reviewNote ? ` · ${t.reviewNote}` : ""}
          </p>
        </div>
      )}
    </>
  );
}
