import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { getAllSlides } from "@/lib/slides";

export default function Home() {
  const slides = getAllSlides();
  const first = slides[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-indigo-400">
          Club AI · HMIT
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-6xl">
          Basic LLM & Prompt Engineering
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-zinc-400">
          Kamu gak perlu jadi programmer untuk pakai AI dengan baik.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {first ? (
            <Link
              href={`/slides/${first.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
            >
              Mulai Presentasi
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm text-zinc-400">
              Belum ada slide
            </span>
          )}
          <Link
            href="/overview"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-800"
          >
            <LayoutGrid className="h-4 w-4" />
            Lihat Overview
          </Link>
        </div>

        <p className="mt-12 text-xs text-zinc-500">
          {slides.length} slide · gunakan{" "}
          <kbd className="rounded border border-zinc-700 px-1.5 py-0.5">[</kbd>{" "}
          <kbd className="rounded border border-zinc-700 px-1.5 py-0.5">]</kbd>{" "}
          atau <kbd className="rounded border border-zinc-700 px-1.5 py-0.5">←</kbd>{" "}
          <kbd className="rounded border border-zinc-700 px-1.5 py-0.5">→</kbd> untuk navigasi
        </p>
      </div>
    </main>
  );
}
