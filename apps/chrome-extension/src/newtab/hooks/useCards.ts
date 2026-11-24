import { useState, useEffect } from 'react'
import type { VocabItem, GrammarItem } from '../../../../../packages/core/types'
import { sampleVocab, sampleGrammar, samplePreview, mergeCustomVocab, mergeCustomGrammar } from '../../../../../packages/core/sampler'
import { getProgress, getCustomItems, initSrsState } from '../../../../../packages/core/storage'

interface CardsState {
  vocabCards: VocabItem[]
  grammarCards: GrammarItem[]
  previewCards: VocabItem[]
  currentLesson: number
  loading: boolean
  error: string | null
}

export function useCards(): CardsState {
  const [state, setState] = useState<CardsState>({
    vocabCards: [],
    grammarCards: [],
    previewCards: [],
    currentLesson: 1,
    loading: true,
    error: null,
  })

  useEffect(() => {
    initSrsState()

    async function load() {
      try {
        const [vocabRes, grammarRes] = await Promise.all([
          fetch(chrome.runtime.getURL('vocabulary.json')),
          fetch(chrome.runtime.getURL('grammar.json')),
        ])

        if (!vocabRes.ok || !grammarRes.ok) throw new Error('Failed to load data')

        const allVocab: VocabItem[] = await vocabRes.json()
        const grammarData: { examples: GrammarItem[] } = await grammarRes.json()
        const allGrammar = grammarData.examples

        const { currentLesson } = getProgress()
        const customItems = getCustomItems()

        const vocabPool = mergeCustomVocab(allVocab, customItems)
        const grammarPool = mergeCustomGrammar(allGrammar, customItems)

        setState({
          vocabCards: sampleVocab(vocabPool, currentLesson, 5),
          grammarCards: sampleGrammar(grammarPool, currentLesson, 3),
          previewCards: samplePreview(allVocab, currentLesson, 2),
          currentLesson,
          loading: false,
          error: null,
        })
      } catch (err) {
        setState((s) => ({
          ...s,
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error',
        }))
      }
    }

    load()
  }, [])

  return state
}
