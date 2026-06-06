import { cn } from "@/lib/utils";

interface AttentionLink {
  from: number;
  to: number;
  weight?: number;
}

interface AttentionDemoProps {
  tokens: string[];
  links: AttentionLink[];
  caption?: string;
  className?: string;
}

export function AttentionDemo({
  tokens,
  links,
  caption,
  className,
}: AttentionDemoProps) {
  const tokenWidth = 90;
  const gap = 8;
  const padX = 16;
  const tokenY = 80;
  const tokenH = 36;
  const width = padX * 2 + tokens.length * tokenWidth + (tokens.length - 1) * gap;
  const height = 140;

  const centerOf = (i: number) =>
    padX + i * (tokenWidth + gap) + tokenWidth / 2;

  return (
    <figure
      className={cn(
        "my-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/40 p-4",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full min-w-[480px]"
        role="img"
        aria-label="Attention demo"
      >
        {links.map((link, i) => {
          const x1 = centerOf(link.from);
          const x2 = centerOf(link.to);
          const midX = (x1 + x2) / 2;
          const arcHeight = Math.min(60, Math.abs(x2 - x1) * 0.3);
          const ctrlY = tokenY - arcHeight;
          const opacity = Math.max(0.35, Math.min(1, link.weight ?? 0.8));
          return (
            <path
              key={i}
              d={`M ${x1} ${tokenY} Q ${midX} ${ctrlY} ${x2} ${tokenY}`}
              fill="none"
              stroke="rgb(129 140 248)"
              strokeWidth={1.6}
              strokeOpacity={opacity}
              markerEnd="url(#arrow)"
            />
          );
        })}
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(129 140 248)" />
          </marker>
        </defs>
        {tokens.map((tok, i) => {
          const x = padX + i * (tokenWidth + gap);
          return (
            <g key={i}>
              <rect
                x={x}
                y={tokenY}
                width={tokenWidth}
                height={tokenH}
                rx={6}
                className="fill-zinc-800 stroke-zinc-700"
                strokeWidth={1}
              />
              <text
                x={x + tokenWidth / 2}
                y={tokenY + tokenH / 2 + 5}
                textAnchor="middle"
                fontSize={13}
                className="fill-zinc-100 font-mono"
              >
                {tok}
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
