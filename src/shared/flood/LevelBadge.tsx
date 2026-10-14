import { Waves } from "lucide-react";
import { levelMeta } from "./levels";
import type { Level } from "./types";

export default function LevelBadge({ level }: { level: Level }) {
  const meta = levelMeta[level];
  return (
    <span className={`level-badge level-${level}`}>
      <Waves size={14} />
      {meta.short}
      {level === "waist" && <b>Point noir</b>}
    </span>
  );
}
