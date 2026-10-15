import { MessageCircle } from "lucide-react";
import type { AssistantStrings } from "../config/assistantStrings";

const SUGGESTION_CLASS =
  "rounded-lg border border-border bg-white px-2.5 py-1.5 text-[10px] text-ink transition-all duration-150 ease-[ease] hover:border-primary hover:bg-primary-soft hover:text-primary-dark";

type ChatEmptyStateProps = {
  t: AssistantStrings;
  suggestions: string[];
  onSuggestion: (suggestion: string) => void;
};

export default function ChatEmptyState({ t, suggestions, onSuggestion }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-5 text-center text-muted">
      <div className="mb-1 flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">
        <MessageCircle size={24} />
      </div>
      <div className="text-[13px] font-bold text-ink">{t.emptyTitle}</div>
      <div className="text-[10px]">{t.emptySubtitle}</div>
      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
        {suggestions.map((s) => (
          <button key={s} className={SUGGESTION_CLASS} onClick={() => onSuggestion(s)}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
