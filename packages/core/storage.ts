import type { UserProgress, CustomItem, SrsState } from './types'

const KEYS = {
  progress: 'user_progress',
  customItems: 'custom_items',
  srsState: 'srs_state',
} as const

export function getProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(KEYS.progress)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { currentLesson: 1 }
}

export function setProgress(p: UserProgress): void {
  localStorage.setItem(KEYS.progress, JSON.stringify(p))
}

export function getCustomItems(): CustomItem[] {
  try {
    const raw = localStorage.getItem(KEYS.customItems)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

export function addCustomItem(item: Omit<CustomItem, 'id'>): CustomItem {
  const newItem: CustomItem = { ...item, id: `custom-${Date.now()}` }
  const items = getCustomItems()
  localStorage.setItem(KEYS.customItems, JSON.stringify([...items, newItem]))
  return newItem
}

export function deleteCustomItem(id: string): void {
  const items = getCustomItems().filter((item) => item.id !== id)
  localStorage.setItem(KEYS.customItems, JSON.stringify(items))
}

export function getSrsState(): SrsState {
  try {
    const raw = localStorage.getItem(KEYS.srsState)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {}
}

export function initSrsState(): void {
  if (!localStorage.getItem(KEYS.srsState)) {
    localStorage.setItem(KEYS.srsState, JSON.stringify({}))
  }
}
