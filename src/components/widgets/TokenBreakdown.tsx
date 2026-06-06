import { cn } from "@/lib/utils";

interface TokenBreakdownProps {
  text: string;
  tokens: string[];
  className?: string;
}

const palette = [
  "bg-indigo-950/60 border-indigo-800 text-indigo-200",
  "bg-emerald-950/60 border-emerald-800 text-emerald-200",
  "bg-amber-950/60 border-amber-800 text-amber-200",
  "bg-rose-950/60 border-rose-800 text-rose-200",
  "bg-cyan-950/60 border-cyan-800 text-cyan-200",
  "bg-fuchsia-950/60 border-fuchsia-800 text-fuchsia-200",
];

export function TokenBreakdown({
  text,
  tokens,
  className,
}: TokenBreakdownProps) {
  return (
    <div
      className={cn(
        "my-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4",
        className,
      )}
    >
      <div className="mb-3 font-mono text-sm text-zinc-400">
        Input: <span className="text-zinc-200">&quot;{text}&quot;</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {tokens.map((token, i) => (
          <span
            key={i}
            className={cn(
              "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-sm",
              palette[i % palette.length],
            )}
          >
            {token}
          </span>
        ))}
        <span className="ml-2 text-xs text-zinc-500">
          → {tokens.length} token
        </span>
      </div>
    </div>
  );
}
