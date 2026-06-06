import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlides, getSessionLabel } from "@/lib/slides";

export const metadata: Metadata = {
  title: "Overview — Basic LLM",
};

export default function OverviewPage() {
  const slides = getAllSlides();

  const grouped = slides.reduce<Record<number, typeof slides>>((acc, s) => {
    (acc[s.session] ??= []).push(s);
    return acc;
  }, {});

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Overview Slide</h1>
          <p className="mt-1 text-sm text-zinc-400">
            {slides.length} slide · klik untuk membuka
          </p>
        </div>
        <Link
          href="/"
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm hover:bg-zinc-800"
        >
          ← Kembali ke Cover
        </Link>
      </header>

      {slides.length === 0 ? (
        <p className="text-zinc-400">
          Belum ada slide. Tambahkan file <code>.mdx</code> di{" "}
          <code>src/content/slides/</code>.
        </p>
      ) : (
        Object.entries(grouped).map(([session, items]) => (
          <section key={session} className="mb-10">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              {getSessionLabel(Number(session))}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((slide) => (
                <Link
                  key={slide.slug}
                  href={`/slides/${slide.slug}`}
                  className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition-colors hover:border-indigo-500 hover:bg-zinc-900"
                >
                  <div className="mb-1 text-xs font-mono text-zinc-500">
                    {slide.id}
                  </div>
                  <div className="font-medium text-zinc-100 group-hover:text-indigo-300">
                    {slide.title}
                  </div>
                  {slide.duration && (
                    <div className="mt-2 text-xs text-zinc-500">
                      ⏱ {slide.duration}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
