import { AlertTriangle, Info } from "lucide-react";

export default function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="mt-4 flex items-center gap-2 rounded-xl bg-danger-soft px-4 py-3 text-[11.5px] font-medium text-danger animate-[shake_0.3s_ease-out]">
      <AlertTriangle size={17} className="flex-none" />
      {message}
    </p>
  );
}
