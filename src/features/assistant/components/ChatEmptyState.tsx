import { MessageCircle } from "lucide-react";

const SUGGESTIONS = [
  "Comment signaler une inondation ?",
  "Qu'est-ce qu'un point noir ?",
  "Comment lire les niveaux d'eau ?",
  "À quoi sert le classement ?",
  "Comment utiliser la carte ?",
];

const SUGGESTION_CLASS =
  "rounded-lg border border-border bg-white px-2.5 py-1.5 text-[10px] text-ink transition-all duration-150 ease-[ease] hover:border-primary hover:bg-primary-soft hover:text-primary-dark";

export default function ChatEmptyState({ onSuggestion }: { onSuggestion: (suggestion: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-5 text-center text-muted">
      <div className="mb-1 flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">
        <MessageCircle size={24} />
      </div>
      <div className="text-[13px] font-bold text-ink">Comment puis-je vous aider ?</div>
      <div className="text-[10px]">Je vous guide dans l'utilisation de l'application</div>
      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button key={s} className={SUGGESTION_CLASS} onClick={() => onSuggestion(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
