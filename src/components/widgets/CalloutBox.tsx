import { ReactNode } from "react";
import { Info, AlertTriangle, Lightbulb, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "info" | "warning" | "tip" | "quote";

interface CalloutBoxProps {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}

const variantStyles: Record<
  Variant,
  { container: string; icon: ReactNode; label: string }
> = {
  info: {
    container: "border-indigo-900/50 bg-indigo-950/20 text-indigo-100",
    icon: <Info className="h-5 w-5 text-indigo-400" />,
    label: "Info",
  },
  warning: {
    container: "border-amber-900/50 bg-amber-950/20 text-amber-100",
    icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
    label: "Perhatian",
  },
  tip: {
    container: "border-emerald-900/50 bg-emerald-950/20 text-emerald-100",
    icon: <Lightbulb className="h-5 w-5 text-emerald-400" />,
    label: "Tip",
  },
  quote: {
    container: "border-zinc-700 bg-zinc-900/40 text-zinc-100",
    icon: <Quote className="h-5 w-5 text-zinc-400" />,
    label: "Kutipan",
  },
};

export function CalloutBox({
  variant = "info",
  title,
  children,
}: CalloutBoxProps) {
  const style = variantStyles[variant];
  return (
    <div className={cn("rounded-xl border p-4", style.container)}>
      <div className="mb-2 flex items-center gap-2">
        {style.icon}
        <span className="text-sm font-semibold">{title ?? style.label}</span>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
