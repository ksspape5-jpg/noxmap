import { MessageCircle } from "lucide-react";

const SUGGESTIONS = [
  "Comment signaler une inondation ?",
  "Qu'est-ce qu'un point noir ?",
  "Comment lire les niveaux d'eau ?",
  "À quoi sert le classement ?",
  "Comment utiliser la carte ?",
];

export default function ChatEmptyState({ onSuggestion }: { onSuggestion: (suggestion: string) => void }) {
  return (
    <div className="chat-empty">
      <div className="chat-empty-icon">
        <MessageCircle size={24} />
      </div>
      <div className="chat-empty-title">Comment puis-je vous aider ?</div>
      <div className="chat-empty-subtitle">Je vous guide dans l'utilisation de l'application</div>
      <div className="chat-suggestions">
        {SUGGESTIONS.map((s) => (
          <button key={s} className="chat-suggestion" onClick={() => onSuggestion(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
