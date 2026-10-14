import { Info } from "lucide-react";

export default function FormError({ message }: { message: string }) {
  if (!message) return null;
  return <p className="form-error"><Info size={16} />{message}</p>;
}
