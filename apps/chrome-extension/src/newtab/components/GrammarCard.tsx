import type { GrammarItem } from '../../../../../packages/core/types'
import { buildGrammarPrompt } from '../../shared/prompts'
import { PracticeButton } from './PracticeButton'

interface Props {
  item: GrammarItem
}

export function GrammarCard({ item }: Props) {
  return (
    <div className="flex flex-col rounded-xl bg-stone-800 p-4 shadow-md">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="rounded-md bg-amber-900/60 px-2 py-0.5 text-xs font-medium text-amber-300">
          {item.grammarPoint}
        </span>
        <PracticeButton prompt={buildGrammarPrompt(item)} />
      </div>
      <p className="text-base leading-relaxed text-white">{item.japanese}</p>
      <p className="mt-1 text-sm text-stone-400">{item.chinese}</p>
    </div>
  )
}
