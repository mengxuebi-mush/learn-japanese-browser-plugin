import { useState } from 'react'
import { getCustomItems } from '../../../../packages/core/storage'
import type { CustomItem } from '../../../../packages/core/types'
import { LessonSetter } from './components/LessonSetter'
import { CustomItemForm } from './components/CustomItemForm'
import { CustomItemList } from './components/CustomItemList'

export function PopupApp() {
  const [items, setItems] = useState<CustomItem[]>(() => getCustomItems())

  function handleAdd(item: CustomItem) {
    setItems((prev) => [...prev, item])
  }

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="w-72 bg-stone-800 p-4 text-white">
      <h1 className="mb-4 text-xs font-bold tracking-widest text-stone-400 uppercase">
        大家的日本语 · 设置
      </h1>
      <LessonSetter />
      <div className="my-3 border-t border-stone-700" />
      <p className="mb-2 text-xs font-semibold text-stone-400 uppercase tracking-wider">
        老师补充内容
      </p>
      <CustomItemForm onAdd={handleAdd} />
      <CustomItemList items={items} onDelete={handleDelete} />
    </div>
  )
}
