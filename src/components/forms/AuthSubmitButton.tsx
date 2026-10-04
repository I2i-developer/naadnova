"use client";

import { useFormStatus } from "react-dom";
import { ArrowRight, LoaderCircle, LockKeyhole } from "lucide-react";

export function AuthSubmitButton({ className, label, pendingLabel, disabled = false }: { className: string; label: string; pendingLabel: string; disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button className={className} type="submit" disabled={pending || disabled} aria-disabled={pending || disabled}>
      {pending ? <LoaderCircle aria-hidden size={16} className="auth-submit-spinner" /> : <LockKeyhole aria-hidden size={16} />}
      <span>{pending ? pendingLabel : label}</span>
      <ArrowRight aria-hidden size={18} />
    </button>
  );
}
