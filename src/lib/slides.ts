import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SlideMeta } from "@/types/slide";

const slidesDir = path.join(process.cwd(), "src/content/slides");

export function getAllSlides(): SlideMeta[] {
  if (!fs.existsSync(slidesDir)) {
    return [];
  }

  const files = fs.readdirSync(slidesDir).filter((f) => f.endsWith(".mdx"));

  const slides = files.map((file) => {
    const filePath = path.join(slidesDir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(source);
    const slug = file.replace(/\.mdx$/, "");

    return {
      id: data.id || slug,
      slug,
      title: data.title || "Untitled",
      session: data.session ?? 0,
      order: data.order ?? 0,
      layout: data.layout || "default",
      duration: data.duration,
      filePath,
    };
  });

  return slides.sort((a, b) => {
    if (a.session !== b.session) return a.session - b.session;
    return a.order - b.order;
  });
}

export function getSlideBySlug(slug: string): SlideMeta | undefined {
  return getAllSlides().find((s) => s.slug === slug);
}

const sessionLabels: Record<number, string> = {
  0: "Sesi 0 · Pembukaan",
  1: "Sesi 1 · AI dan LLM dalam kehidupan mahasiswa IT",
  2: "Sesi 2 · Cara kerja LLM",
  3: "Sesi 3 · Prompt engineering",
  4: "Sesi 4 · Teknik prompting lanjut",
  5: "Sesi 5 · Praktik, etika, dan pola kerja",
  99: "Penutup",
};

export function getSessionLabel(session: number): string {
  return sessionLabels[session] ?? `Sesi ${session}`;
}

export function getAdjacentSlides(slug: string) {
  const slides = getAllSlides();
  const index = slides.findIndex((s) => s.slug === slug);
  return {
    prev: index > 0 ? slides[index - 1] : null,
    next: index < slides.length - 1 ? slides[index + 1] : null,
    currentIndex: index,
    total: slides.length,
  };
}
