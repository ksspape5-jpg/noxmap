import { Sparkles, X } from "lucide-react";

export default function ChatHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <div className="chat-avatar">
          <Sparkles size={18} />
        </div>
        <div>
          <div className="chat-title">Assistant Points Noirs Dakar</div>
          <div className="chat-subtitle">Guide intelligent</div>
        </div>
      </div>
      <button className="chat-close" onClick={onClose} aria-label="Fermer l'assistant">
        <X size={18} />
      </button>
    </div>
  );
}
