export interface VocabItem {
  id: string
  lessonNumber: number
  japanese: string
  reading: string
  pitchAccent: number | null
  partOfSpeech: string
  baseForm: string | null
  loanwordOrigin: string | null
  chinese: string
}

export interface GrammarItem {
  id: string
  lessonNumber: number
  grammarPoint: string
  japanese: string
  chinese: string
}

export interface CustomItem {
  id: string
  type: 'vocab' | 'grammar'
  japanese: string
  reading: string
  chinese: string
  grammarPoint?: string
  lessonNumber: 0
}

export interface UserProgress {
  currentLesson: number
}

export type SrsState = Record<string, { interval: number; dueDate: string; easeFactor: number }>

export interface CardSelection {
  vocabCards: (VocabItem | CustomItem)[]
  grammarCards: (GrammarItem | CustomItem)[]
}
