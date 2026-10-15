import { RotateCcw, Sparkles, X } from "lucide-react";
import { IconButton } from "@/shared/ui";
import type { AssistantLang, AssistantStrings } from "../config/assistantStrings";

const HEADER_BUTTON = "size-8 bg-white/20 text-white hover:bg-white/32";

type ChatHeaderProps = {
  t: AssistantStrings;
  lang: AssistantLang;
  pageLabel: string;
  canReset: boolean;
  onToggleLang: () => void;
  onReset: () => void;
  onClose: () => void;
};

export default function ChatHeader({ t, lang, pageLabel, canReset, onToggleLang, onReset, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 bg-primary px-3.5 py-3 text-white">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex size-8 flex-none items-center justify-center rounded-full bg-white/20">
          <Sparkles size={18} />
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-bold">Assistant Points Noirs Dakar</div>
          <div className="truncate text-[10px] opacity-90">
            {t.subtitle} · {pageLabel}
          </div>
        </div>
      </div>
      <div className="flex flex-none items-center gap-1.5">
        <button
          className="h-8 min-w-8 rounded-full bg-white/20 px-2 text-[11px] font-extrabold tracking-[.04em] hover:bg-white/32"
          onClick={onToggleLang}
          aria-label={lang === "fr" ? "Passer en wolof" : "Passer en français"}
          title={lang === "fr" ? "Wolof" : "Français"}
        >
          {lang === "fr" ? "WO" : "FR"}
        </button>
        {canReset && (
          <IconButton className={HEADER_BUTTON} onClick={onReset} aria-label={t.newChat} title={t.newChat}>
            <RotateCcw size={16} />
          </IconButton>
        )}
        <IconButton className={HEADER_BUTTON} onClick={onClose} aria-label={t.close}>
          <X size={18} />
        </IconButton>
      </div>
    </div>
  );
}
