import { deleteCustomItem } from '../../../../../packages/core/storage'
import type { CustomItem } from '../../../../../packages/core/types'

interface Props {
  items: CustomItem[]
  onDelete: (id: string) => void
}

export function CustomItemList({ items, onDelete }: Props) {
  if (items.length === 0) {
    return <p className="text-xs text-stone-500">暂无自定义内容</p>
  }

  function handleDelete(id: string) {
    deleteCustomItem(id)
    onDelete(id)
  }

  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between rounded-md bg-stone-700 px-3 py-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="shrink-0 rounded bg-stone-600 px-1 py-0.5 text-[10px] text-stone-300">
              {item.type === 'vocab' ? '词' : '法'}
            </span>
            <span className="text-sm text-white truncate">{item.japanese}</span>
            <span className="text-xs text-stone-400 truncate">{item.chinese}</span>
          </div>
          <button
            onClick={() => handleDelete(item.id)}
            className="ml-2 shrink-0 text-stone-500 transition hover:text-red-400"
            aria-label="删除"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
