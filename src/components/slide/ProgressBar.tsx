import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0;
  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-50 h-1 bg-zinc-900",
        className,
      )}
      aria-label={`Progress: slide ${current + 1} dari ${total}`}
    >
      <div
        className="h-full bg-indigo-500 transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
