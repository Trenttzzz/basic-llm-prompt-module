"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyTemplateButtonProps {
  template: string;
  label?: string;
  className?: string;
}

export function CopyTemplateButton({
  template,
  label = "Salin template",
  className,
}: CopyTemplateButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/60 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700/80",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-400" />
          <span>Tersalin!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
