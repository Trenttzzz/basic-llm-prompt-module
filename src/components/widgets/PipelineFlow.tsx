import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineStep {
  label: string;
  hint?: string;
  tone?: "neutral" | "primary" | "accent";
}

interface PipelineFlowProps {
  steps: PipelineStep[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const toneStyles: Record<NonNullable<PipelineStep["tone"]>, string> = {
  neutral: "border-zinc-700 bg-zinc-900/80 text-zinc-100",
  primary: "border-indigo-700/70 bg-indigo-950/40 text-indigo-100",
  accent: "border-amber-700/70 bg-amber-950/30 text-amber-100",
};

export function PipelineFlow({
  steps,
  orientation = "horizontal",
  className,
}: PipelineFlowProps) {
  const horizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "my-4 flex items-stretch gap-2 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4",
        horizontal
          ? "flex-row flex-wrap"
          : "flex-col",
        className,
      )}
    >
      {steps.map((step, i) => (
        <Fragment key={i}>
          <div
            className={cn(
              "flex min-w-[120px] flex-1 flex-col items-center justify-center rounded-xl border px-3 py-3 text-center",
              toneStyles[step.tone ?? "neutral"],
            )}
          >
            <span className="text-sm font-mono font-medium leading-tight">
              {step.label}
            </span>
            {step.hint && (
              <span className="mt-1 text-xs text-zinc-400">{step.hint}</span>
            )}
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "flex items-center justify-center text-zinc-600",
                horizontal ? "px-1" : "py-1 rotate-90",
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
