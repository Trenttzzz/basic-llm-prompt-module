import { CopyTemplateButton } from "./CopyTemplateButton";

interface PromptCompareProps {
  bad: string;
  good: string;
  badLabel?: string;
  goodLabel?: string;
}

export function PromptCompare({
  bad,
  good,
  badLabel = "Prompt buruk",
  goodLabel = "Prompt baik",
}: PromptCompareProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-rose-900/50 bg-rose-950/20 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-rose-400">
            ❌ {badLabel}
          </span>
          <CopyTemplateButton template={bad} label="Salin" />
        </div>
        <pre className="whitespace-pre-wrap text-sm text-zinc-200">{bad}</pre>
      </div>
      <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-emerald-400">
            ✅ {goodLabel}
          </span>
          <CopyTemplateButton template={good} label="Salin" />
        </div>
        <pre className="whitespace-pre-wrap text-sm text-zinc-200">{good}</pre>
      </div>
    </div>
  );
}
