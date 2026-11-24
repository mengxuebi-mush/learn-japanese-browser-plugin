import type { VocabItem } from '../../../../../packages/core/types'
import { buildVocabPrompt } from '../../shared/prompts'
import { PracticeButton } from './PracticeButton'

interface Props {
  item: VocabItem
  preview?: boolean
}

export function VocabCard({ item, preview = false }: Props) {
  return (
    <div className={`flex flex-col rounded-xl p-4 shadow-md ${preview ? 'bg-stone-800/50 ring-1 ring-stone-700' : 'bg-stone-800'}`}>
      <div className="mb-2 flex min-h-6 items-center justify-between gap-2">
        {preview ? (
          <span className="rounded bg-indigo-900/70 px-1.5 py-0.5 text-[9px] font-medium text-indigo-300">
            预习
          </span>
        ) : (
          <span />
        )}
        <PracticeButton prompt={buildVocabPrompt(item)} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{item.japanese}</span>
        {item.pitchAccent !== null && (
          <span className="rounded bg-stone-600 px-1 text-[10px] text-stone-300">
            {item.pitchAccent}
          </span>
        )}
      </div>
      <span className="mt-0.5 text-sm text-stone-400">{item.reading}</span>
      <div className="mt-2 flex items-center gap-2">
        <span className="rounded bg-stone-700 px-1.5 py-0.5 text-[10px] text-stone-300">
          {item.partOfSpeech}
        </span>
        <span className="text-sm text-stone-200">{item.chinese}</span>
      </div>
    </div>
  )
}
