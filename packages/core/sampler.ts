import type { VocabItem, GrammarItem, CustomItem } from './types'

function partialShuffle<T>(arr: T[], count: number): T[] {
  const result = [...arr]
  const end = Math.min(count, result.length)
  for (let i = 0; i < end; i++) {
    const j = i + Math.floor(Math.random() * (result.length - i))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result.slice(0, end)
}

export function sampleVocab(
  items: VocabItem[],
  currentLesson: number,
  count = 5,
): VocabItem[] {
  const pool = items.filter((item) => item.lessonNumber <= currentLesson)
  return partialShuffle(pool, count)
}

export function samplePreview(
  items: VocabItem[],
  currentLesson: number,
  count = 2,
): VocabItem[] {
  const pool = items.filter((item) => item.lessonNumber === currentLesson + 1)
  return partialShuffle(pool, count)
}

export function sampleGrammar(
  items: GrammarItem[],
  currentLesson: number,
  count = 3,
): GrammarItem[] {
  const pool = items.filter((item) => item.lessonNumber <= currentLesson)
  return partialShuffle(pool, count)
}

export function mergeCustomVocab(
  vocab: VocabItem[],
  custom: CustomItem[],
): VocabItem[] {
  const customVocab = custom
    .filter((c) => c.type === 'vocab')
    .map(
      (c): VocabItem => ({
        id: c.id,
        lessonNumber: 0,
        japanese: c.japanese,
        reading: c.reading,
        pitchAccent: null,
        partOfSpeech: '自定义',
        baseForm: null,
        loanwordOrigin: null,
        chinese: c.chinese,
      }),
    )
  return [...vocab, ...customVocab]
}

export function mergeCustomGrammar(
  grammar: GrammarItem[],
  custom: CustomItem[],
): GrammarItem[] {
  const customGrammar = custom
    .filter((c) => c.type === 'grammar')
    .map(
      (c): GrammarItem => ({
        id: c.id,
        lessonNumber: 0,
        grammarPoint: c.grammarPoint ?? c.japanese,
        japanese: c.japanese,
        chinese: c.chinese,
      }),
    )
  return [...grammar, ...customGrammar]
}
