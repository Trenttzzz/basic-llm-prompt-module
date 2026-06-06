import { ReactNode } from "react";
import { Check, X, Sparkles, Dot } from "lucide-react";
import { cn } from "@/lib/utils";

type Marker = "check" | "cross" | "spark" | "dot";

interface BulletListProps {
  items: ReactNode[];
  marker?: Marker;
  className?: string;
}

const markerMap: Record<Marker, { icon: ReactNode; color: string }> = {
  check: { icon: <Check className="h-5 w-5" />, color: "text-emerald-400" },
  cross: { icon: <X className="h-5 w-5" />, color: "text-rose-400" },
  spark: { icon: <Sparkles className="h-5 w-5" />, color: "text-amber-400" },
  dot: { icon: <Dot className="h-5 w-5" />, color: "text-zinc-500" },
};

export function BulletList({
  items,
  marker = "dot",
  className,
}: BulletListProps) {
  const m = markerMap[marker];
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-lg text-zinc-200">
          <span className={cn("mt-0.5 flex-shrink-0", m.color)}>{m.icon}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
