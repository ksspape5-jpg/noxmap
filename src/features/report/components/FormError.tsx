import { Info } from "lucide-react";

export default function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="mt-3 flex items-center gap-1.75 rounded-[9px] bg-danger-soft px-3 py-2.5 text-[10px] text-danger">
      <Info size={16} />
      {message}
    </p>
  );
}
