import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  title?: string;
  tone?: "neutral" | "primary" | "accent";
  children: ReactNode;
  className?: string;
}

const toneStyles: Record<NonNullable<PanelProps["tone"]>, string> = {
  neutral: "border-zinc-800 bg-zinc-900/60",
  primary: "border-indigo-900/60 bg-indigo-950/30",
  accent: "border-amber-900/60 bg-amber-950/20",
};

export function Panel({
  title,
  tone = "neutral",
  children,
  className,
}: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-sm",
        toneStyles[tone],
        className,
      )}
    >
      {title && (
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
          {title}
        </div>
      )}
      <div className="space-y-3 text-zinc-100">{children}</div>
    </div>
  );
}
