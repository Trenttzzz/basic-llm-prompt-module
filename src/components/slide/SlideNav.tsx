"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { SlideMeta } from "@/types/slide";
import { cn } from "@/lib/utils";

interface SlideNavProps {
  prev: SlideMeta | null;
  next: SlideMeta | null;
  currentIndex: number;
  total: number;
}

export function SlideNav({ prev, next, currentIndex, total }: SlideNavProps) {
  const baseBtn =
    "inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm font-medium text-zinc-100 backdrop-blur transition-colors hover:bg-zinc-800";
  const disabledBtn = "pointer-events-none opacity-30";

  return (
    <div
      className="group fixed bottom-0 left-1/2 z-50 flex -translate-x-1/2 justify-center px-8 pb-4 pt-16"
      aria-label="Navigasi slide"
    >
      <div className="flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
        {prev ? (
          <Link
            href={`/slides/${prev.slug}`}
            className={baseBtn}
            aria-label="Slide sebelumnya"
            prefetch={true}
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span className={cn(baseBtn, disabledBtn)}>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}

        <Link
          href="/overview"
          className={baseBtn}
          aria-label="Lihat semua slide"
          title="Overview (O)"
          prefetch={true}
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="tabular-nums">
            {currentIndex + 1} / {total}
          </span>
        </Link>

        {next ? (
          <Link
            href={`/slides/${next.slug}`}
            className={baseBtn}
            aria-label="Slide berikutnya"
            prefetch={true}
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className={cn(baseBtn, disabledBtn)}>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  );
}
