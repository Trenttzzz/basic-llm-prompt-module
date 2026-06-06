import { cn } from "@/lib/utils";

interface EmbeddingPoint {
  label: string;
  x: number;
  y: number;
  group?: "a" | "b" | "c";
}

interface EmbeddingPlotProps {
  points: EmbeddingPoint[];
  caption?: string;
  className?: string;
}

const groupColors: Record<NonNullable<EmbeddingPoint["group"]>, string> = {
  a: "fill-indigo-400 stroke-indigo-300",
  b: "fill-emerald-400 stroke-emerald-300",
  c: "fill-rose-400 stroke-rose-300",
};

const groupTextColors: Record<NonNullable<EmbeddingPoint["group"]>, string> = {
  a: "fill-indigo-200",
  b: "fill-emerald-200",
  c: "fill-rose-200",
};

export function EmbeddingPlot({
  points,
  caption,
  className,
}: EmbeddingPlotProps) {
  const width = 480;
  const height = 280;
  const pad = 30;

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const sx = (x: number) =>
    pad + ((x - minX) / (maxX - minX || 1)) * (width - 2 * pad);
  const sy = (y: number) =>
    height - pad - ((y - minY) / (maxY - minY || 1)) * (height - 2 * pad);

  return (
    <figure
      className={cn(
        "my-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Embedding plot 2D"
      >
        <line
          x1={pad}
          y1={height - pad}
          x2={width - pad}
          y2={height - pad}
          className="stroke-zinc-700"
          strokeDasharray="3 3"
        />
        <line
          x1={pad}
          y1={pad}
          x2={pad}
          y2={height - pad}
          className="stroke-zinc-700"
          strokeDasharray="3 3"
        />
        {points.map((p, i) => {
          const g = p.group ?? "a";
          return (
            <g key={i}>
              <circle
                cx={sx(p.x)}
                cy={sy(p.y)}
                r={6}
                strokeWidth={1.5}
                className={groupColors[g]}
              />
              <text
                x={sx(p.x) + 10}
                y={sy(p.y) + 4}
                fontSize={12}
                className={cn(
                  "font-medium",
                  groupTextColors[g],
                )}
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
