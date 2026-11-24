import type { VocabItem, GrammarItem } from '../../../../packages/core/types'

export function buildVocabPrompt(item: VocabItem): string {
  return `帮助我学习「${item.japanese}」（${item.chinese}）的用法、造句和其他相关单词。`
}

export function buildGrammarPrompt(item: GrammarItem): string {
  return `帮我复习「${item.japanese}」的语法知识。`
}
