"use client";

import { ReactNode } from "react";
import { SlideMeta } from "@/types/slide";
import { useKeyboardNavigation } from "@/lib/keyboard";
import { SlideNav } from "./SlideNav";
import { ProgressBar } from "./ProgressBar";

interface SlideShellProps {
  slides: SlideMeta[];
  current: SlideMeta;
  prev: SlideMeta | null;
  next: SlideMeta | null;
  currentIndex: number;
  total: number;
  children: ReactNode;
}

export function SlideShell({
  slides,
  current,
  prev,
  next,
  currentIndex,
  total,
  children,
}: SlideShellProps) {
  useKeyboardNavigation(slides, current.slug);

  return (
    <>
      <ProgressBar current={currentIndex} total={total} />
      <main className="flex min-h-screen items-center justify-center p-4 pt-8">
        {children}
      </main>
      <SlideNav
        prev={prev}
        next={next}
        currentIndex={currentIndex}
        total={total}
      />
    </>
  );
}
