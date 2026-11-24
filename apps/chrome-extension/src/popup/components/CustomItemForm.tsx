import { useState } from 'react'
import { addCustomItem } from '../../../../../packages/core/storage'
import type { CustomItem } from '../../../../../packages/core/types'

interface Props {
  onAdd: (item: CustomItem) => void
}

interface FormState {
  type: 'vocab' | 'grammar'
  japanese: string
  reading: string
  chinese: string
  grammarPoint: string
}

const empty: FormState = { type: 'vocab', japanese: '', reading: '', chinese: '', grammarPoint: '' }

export function CustomItemForm({ onAdd }: Props) {
  const [form, setForm] = useState<FormState>(empty)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.japanese.trim() || !form.chinese.trim()) return
    const item = addCustomItem({
      type: form.type,
      japanese: form.japanese.trim(),
      reading: form.reading.trim(),
      chinese: form.chinese.trim(),
      grammarPoint: form.type === 'grammar' ? form.grammarPoint.trim() : undefined,
      lessonNumber: 0,
    })
    onAdd(item)
    setForm(empty)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2 rounded-lg bg-stone-700/50 p-3">
      <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider">添加内容</p>

      <div className="flex gap-3">
        {(['vocab', 'grammar'] as const).map((t) => (
          <label key={t} className="flex cursor-pointer items-center gap-1.5 text-xs text-stone-300">
            <input
              type="radio"
              name="type"
              value={t}
              checked={form.type === t}
              onChange={() => setForm((f) => ({ ...f, type: t }))}
              className="accent-amber-500"
            />
            {t === 'vocab' ? '词汇' : '语法'}
          </label>
        ))}
      </div>

      <input
        placeholder="日语"
        value={form.japanese}
        onChange={(e) => setForm((f) => ({ ...f, japanese: e.target.value }))}
        className="w-full rounded bg-stone-700 px-2 py-1 text-sm text-white placeholder:text-stone-500 outline-none focus:ring-1 focus:ring-amber-500"
      />
      <input
        placeholder="读音（ひらがな）"
        value={form.reading}
        onChange={(e) => setForm((f) => ({ ...f, reading: e.target.value }))}
        className="w-full rounded bg-stone-700 px-2 py-1 text-sm text-white placeholder:text-stone-500 outline-none focus:ring-1 focus:ring-amber-500"
      />
      <input
        placeholder="中文意思"
        value={form.chinese}
        onChange={(e) => setForm((f) => ({ ...f, chinese: e.target.value }))}
        className="w-full rounded bg-stone-700 px-2 py-1 text-sm text-white placeholder:text-stone-500 outline-none focus:ring-1 focus:ring-amber-500"
      />
      {form.type === 'grammar' && (
        <input
          placeholder="语法点（如：〜ています）"
          value={form.grammarPoint}
          onChange={(e) => setForm((f) => ({ ...f, grammarPoint: e.target.value }))}
          className="w-full rounded bg-stone-700 px-2 py-1 text-sm text-white placeholder:text-stone-500 outline-none focus:ring-1 focus:ring-amber-500"
        />
      )}
      <button
        type="submit"
        className="w-full rounded bg-amber-700 py-1 text-sm text-white transition hover:bg-amber-600"
      >
        添加
      </button>
    </form>
  )
}
