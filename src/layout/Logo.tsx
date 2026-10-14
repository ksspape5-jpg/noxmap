import { MapPin, Waves } from "lucide-react";

export default function Logo() {
  return (
    <span className="logo-mark" aria-label="Points Noirs Dakar">
      <MapPin size={25} strokeWidth={2.5} />
      <Waves size={12} strokeWidth={3} />
    </span>
  );
}
