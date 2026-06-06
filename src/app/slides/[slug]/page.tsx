import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlides, getAdjacentSlides, getSlideBySlug } from "@/lib/slides";
import { SlideContainer } from "@/components/slide/SlideContainer";
import { SlideShell } from "@/components/slide/SlideShell";

export function generateStaticParams() {
  return getAllSlides().map((s) => ({ slug: s.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slide = getSlideBySlug(slug);
  return {
    title: slide ? `${slide.title} — Basic LLM` : "Slide",
  };
}

export default async function SlidePage({ params }: PageProps) {
  const { slug } = await params;
  const slide = getSlideBySlug(slug);
  if (!slide) notFound();

  const slides = getAllSlides();
  const { prev, next, currentIndex, total } = getAdjacentSlides(slug);

  const { default: SlideContent } = await import(
    `@/content/slides/${slug}.mdx`
  );

  return (
    <SlideShell
      slides={slides}
      current={slide}
      prev={prev}
      next={next}
      currentIndex={currentIndex}
      total={total}
    >
      <SlideContainer layout={slide.layout} key={slug}>
        <SlideContent />
      </SlideContainer>
    </SlideShell>
  );
}
