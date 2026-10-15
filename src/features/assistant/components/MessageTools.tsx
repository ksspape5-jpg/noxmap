import type { ReactNode } from "react";
import { Flag, ThumbsDown, ThumbsUp, Volume2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { AssistantStrings } from "../config/assistantStrings";
import { quickLinksFor } from "../lib/navigation";
import type { ChatMessage } from "../types";

const TOOL =
  "inline-flex size-6.5 items-center justify-center rounded-lg border border-border bg-white text-muted hover:bg-primary-soft hover:text-primary-dark";
const TOOL_ACTIVE = "border-primary bg-primary text-white hover:bg-primary hover:text-white";

type MessageToolsProps = {
  message: ChatMessage;
  t: AssistantStrings;
  onFeedback: (value: "up" | "down") => void;
  onSpeak?: () => void;
  onReport: () => void;
  onNavigate: (to: string) => void;
};

function Tool({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button className={cn(TOOL, active && TOOL_ACTIVE)} onClick={onClick} aria-label={label} title={label}>
      {children}
    </button>
  );
}

// Actions sous une réponse : avis, écoute, signalement d'erreur et raccourcis vers les pages citées.
export default function MessageTools({ message, t, onFeedback, onSpeak, onReport, onNavigate }: MessageToolsProps) {
  return (
    <div className="mt-1.25 flex flex-wrap items-center gap-1.25 px-0.5">
      <Tool label={t.useful} active={message.feedback === "up"} onClick={() => onFeedback("up")}>
        <ThumbsUp size={13} />
      </Tool>
      <Tool label={t.notUseful} active={message.feedback === "down"} onClick={() => onFeedback("down")}>
        <ThumbsDown size={13} />
      </Tool>
      {onSpeak && (
        <Tool label={t.listen} onClick={onSpeak}>
          <Volume2 size={13} />
        </Tool>
      )}
      <Tool label={t.report} onClick={onReport}>
        <Flag size={13} />
      </Tool>
      {quickLinksFor(message.content).map((link) => (
        <button
          key={link.to}
          className="min-h-6.5 rounded-full border border-primary bg-primary-soft px-2.25 text-[10px] font-bold text-primary-dark hover:bg-primary hover:text-white"
          onClick={() => onNavigate(link.to)}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}
