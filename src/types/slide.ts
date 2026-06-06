export interface SlideMeta {
  id: string;
  slug: string;
  title: string;
  session: number;
  order: number;
  layout: "default" | "title" | "split" | "code";
  duration?: string;
  filePath: string;
}
