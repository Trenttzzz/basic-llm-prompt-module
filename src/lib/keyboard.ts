import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SlideMeta } from "@/types/slide";

export function useKeyboardNavigation(
  slides: SlideMeta[],
  currentSlug: string,
) {
  const router = useRouter();

  // Stable refs supaya effect tidak teardown/reattach tiap render
  const slidesRef = useRef(slides);
  const slugRef = useRef(currentSlug);
  const routerRef = useRef(router);

  useEffect(() => {
    slidesRef.current = slides;
    slugRef.current = currentSlug;
    routerRef.current = router;
  }, [slides, currentSlug, router]);

  useEffect(() => {
    const navigate = (direction: "next" | "prev" | "overview" | "home") => {
      const r = routerRef.current;
      if (direction === "overview") {
        r.push("/overview");
        return;
      }
      if (direction === "home") {
        r.push("/");
        return;
      }

      const list = slidesRef.current;
      const slug = slugRef.current;
      const idx = list.findIndex((s) => s.slug === slug);
      if (idx === -1) return;

      const newIdx =
        direction === "next"
          ? Math.min(idx + 1, list.length - 1)
          : Math.max(idx - 1, 0);

      if (newIdx !== idx) {
        r.push(`/slides/${list[newIdx].slug}`);
      }
    };

    const isEditable = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };

    const handler = (e: KeyboardEvent) => {
      // Skip kalau user lagi ngetik di field
      if (isEditable(e.target)) return;
      // Skip kalau ada modifier (Cmd+ArrowRight = next tab, dst)
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case "]":
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          navigate("next");
          break;
        case "[":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          navigate("prev");
          break;
        case "o":
        case "O":
          e.preventDefault();
          navigate("overview");
          break;
        case "Escape":
          e.preventDefault();
          navigate("home");
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []); // attach sekali, pakai refs untuk state terbaru
}
