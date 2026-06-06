import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideContainerProps {
  children: ReactNode;
  layout?: "default" | "title" | "split" | "code";
  className?: string;
}

export function SlideContainer({
  children,
  layout = "default",
  className,
}: SlideContainerProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-sm animate-slide-in",
        "aspect-video max-h-[85vh]",
        "flex flex-col",
        layout === "title" && "items-center justify-center text-center",
        layout === "split" && "grid grid-cols-1 md:grid-cols-2",
        layout === "code" && "font-mono",
        className
      )}
    >
      <div className="flex-1 overflow-auto px-8 py-10 md:px-16 md:py-12">
        {children}
      </div>
    </div>
  );
}
