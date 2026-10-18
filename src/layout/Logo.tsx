import { MapPin, Waves } from "lucide-react";

export default function Logo() {
  return (
    <span
      className="relative inline-grid size-9.5 flex-none place-items-center rounded-xl bg-primary text-white max-md:size-8.5 max-md:rounded-[10px]"
      aria-label="NdoxMap"
    >
      <MapPin size={25} strokeWidth={2.5} />
      <Waves size={12} strokeWidth={3} className="absolute bottom-1.75 left-3.25 text-accent" />
    </span>
  );
}
