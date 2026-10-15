import { useRef, useState } from "react";
import type { AssistantLang } from "../config/assistantStrings";

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

type SpeechWindow = {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

const speechLang = (lang: AssistantLang) => (lang === "wo" ? "wo-SN" : "fr-FR");

function getRecognition() {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as SpeechWindow;
  return w.SpeechRecognition || w.webkitSpeechRecognition;
}

// Lecture des réponses à voix haute et dictée des questions, selon ce que le navigateur supporte.
export function useSpeech(lang: AssistantLang, onTranscript: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
  const canListen = Boolean(getRecognition());

  const speak = (text: string) => {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*`>|]/g, " ").replace(/\s+/g, " ").trim());
    utterance.lang = speechLang(lang);
    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const Recognition = getRecognition();
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.lang = speechLang(lang);
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      onTranscript(Array.from({ length: event.results.length }, (_, i) => event.results[i][0].transcript).join(" "));
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return { canSpeak, canListen, listening, speak, toggleMic };
}
