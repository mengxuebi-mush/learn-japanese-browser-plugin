import { useState } from 'react'
import { getProgress, setProgress } from '../../../../../packages/core/storage'

export function LessonSetter() {
  const [lesson, setLesson] = useState(() => getProgress().currentLesson)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setProgress({ currentLesson: lesson })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-xs font-semibold text-stone-400 uppercase tracking-wider">
        当前课次
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          max={50}
          value={lesson}
          onChange={(e) => setLesson(Math.max(1, Math.min(50, Number(e.target.value))))}
          className="w-20 rounded-md bg-stone-700 px-3 py-1.5 text-sm text-white outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          onClick={handleSave}
          className="rounded-md bg-amber-700 px-3 py-1.5 text-sm text-white transition hover:bg-amber-600"
        >
          {saved ? '已保存 ✓' : '保存'}
        </button>
      </div>
      <p className="mt-1 text-[11px] text-stone-500">只显示第 {lesson} 课及之前的内容</p>
    </div>
  )
}
