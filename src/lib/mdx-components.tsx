import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { PromptCompare } from "@/components/widgets/PromptCompare";
import { CalloutBox } from "@/components/widgets/CalloutBox";
import { CopyTemplateButton } from "@/components/widgets/CopyTemplateButton";
import { Panel } from "@/components/widgets/Panel";
import { BulletList } from "@/components/widgets/BulletList";
import { PipelineFlow } from "@/components/widgets/PipelineFlow";
import { TokenBreakdown } from "@/components/widgets/TokenBreakdown";
import { ContextWindowBar } from "@/components/widgets/ContextWindowBar";
import { EmbeddingPlot } from "@/components/widgets/EmbeddingPlot";
import { AttentionDemo } from "@/components/widgets/AttentionDemo";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Widget custom
    Image,
    PromptCompare,
    CalloutBox,
    CopyTemplateButton,
    Panel,
    BulletList,
    PipelineFlow,
    TokenBreakdown,
    ContextWindowBar,
    EmbeddingPlot,
    AttentionDemo,

    // Styling default elements agar markdown plain langsung rapi
    h1: ({ children }) => (
      <h1 className="mb-6 text-balance text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-6 text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-5 text-xl font-semibold text-zinc-100">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-pretty text-lg leading-relaxed text-zinc-300">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="my-4 space-y-2 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-lg text-zinc-200">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 list-inside list-decimal space-y-2 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-lg text-zinc-200 marker:text-indigo-400">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3 before:mt-2.5 before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-indigo-400">
        <span className="flex-1">{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-50">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-amber-300">{children}</em>
    ),
    code: ({ children }) => (
      <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-base text-amber-300">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm leading-relaxed text-zinc-200">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-indigo-500 bg-zinc-900/40 py-3 pl-5 pr-3 text-lg italic text-zinc-300">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-6 border-zinc-800" />,
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-indigo-400 underline underline-offset-4 hover:text-indigo-300"
      >
        {children}
      </a>
    ),

    ...components,
  };
}
