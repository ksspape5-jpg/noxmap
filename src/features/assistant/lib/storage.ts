import type { AssistantLang } from "../config/assistantStrings";
import type { ChatMessage } from "../types";

const HISTORY_KEY = "pn-assistant-history";
const LANG_KEY = "pn-assistant-lang";
const LOG_KEY = "pn-assistant-log";

// Le stockage local peut être indisponible (navigation privée…) : toutes les erreurs sont ignorées.

export function loadHistory(): ChatMessage[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ChatMessage =>
        item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string",
    );
  } catch {
    return [];
  }
}

export function saveHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
  } catch {
    // ignoré
  }
}

export function loadLang(): AssistantLang {
  try {
    return localStorage.getItem(LANG_KEY) === "wo" ? "wo" : "fr";
  } catch {
    return "fr";
  }
}

export function saveLang(lang: AssistantLang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // ignoré
  }
}

// Garde les 50 dernières questions posées, pour enrichir la base de connaissances.
export function logQuestion(question: string) {
  try {
    const log = JSON.parse(localStorage.getItem(LOG_KEY) ?? "[]");
    if (!Array.isArray(log)) return;
    log.push({ q: question.slice(0, 280), at: Date.now() });
    localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(-50)));
  } catch {
    // ignoré
  }
}
