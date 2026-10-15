import { Sparkles, X } from "lucide-react";
import { IconButton } from "@/shared/ui";

export default function ChatHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between bg-primary px-3.5 py-3 text-white">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-full bg-white/20">
          <Sparkles size={18} />
        </div>
        <div>
          <div className="text-[13px] font-bold">Assistant Points Noirs Dakar</div>
          <div className="text-[10px] opacity-90">Guide intelligent</div>
        </div>
      </div>
      <IconButton className="size-8 bg-white/20 text-white" onClick={onClose} aria-label="Fermer l'assistant">
        <X size={18} />
      </IconButton>
    </div>
  );
}
