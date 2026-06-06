import { cn } from "@/lib/utils";

interface Segment {
  label: string;
  weight: number;
  tone?: "system" | "history" | "doc" | "prompt" | "answer";
}

interface ContextWindowBarProps {
  segments: Segment[];
  totalLabel?: string;
  className?: string;
}

const toneStyles: Record<NonNullable<Segment["tone"]>, string> = {
  system: "bg-zinc-700 text-zinc-100",
  history: "bg-indigo-700/70 text-indigo-50",
  doc: "bg-emerald-700/70 text-emerald-50",
  prompt: "bg-amber-600/70 text-amber-50",
  answer: "bg-rose-700/60 text-rose-50",
};

export function ContextWindowBar({
  segments,
  totalLabel = "Context window",
  className,
}: ContextWindowBarProps) {
  const total = segments.reduce((sum, s) => sum + s.weight, 0);

  return (
    <div
      className={cn(
        "my-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4",
        className,
      )}
    >
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium uppercase tracking-wide text-zinc-400">
          {totalLabel}
        </span>
        <span className="text-zinc-500">100%</span>
      </div>
      <div className="flex h-10 w-full overflow-hidden rounded-lg border border-zinc-700">
        {segments.map((seg, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-center px-2 text-xs font-medium",
              toneStyles[seg.tone ?? "system"],
            )}
            style={{ width: `${(seg.weight / total) * 100}%` }}
            title={`${seg.label} — ${Math.round((seg.weight / total) * 100)}%`}
          >
            <span className="truncate">{seg.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-400">
        {segments.map((seg, i) => (
          <span key={i} className="inline-flex items-center gap-1.5">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-sm",
                toneStyles[seg.tone ?? "system"],
              )}
            />
            {seg.label}
          </span>
        ))}
      </div>
    </div>
  );
}
