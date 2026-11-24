import { useCards } from './hooks/useCards'
import { VocabCard } from './components/VocabCard'
import { GrammarCard } from './components/GrammarCard'

export function NewTabApp() {
  const { vocabCards, grammarCards, previewCards, currentLesson, loading, error } = useCards()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-900">
        <span className="text-stone-500 text-sm">加载中…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-900">
        <span className="text-red-400 text-sm">数据加载失败：{error}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-900 px-6 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xs font-medium tracking-widest text-stone-500 uppercase">
          大家的日本语
        </h1>
        <span className="text-xs text-stone-500">第 {currentLesson} 课</span>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-[10px] font-semibold tracking-widest text-stone-600 uppercase">
          词汇
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {vocabCards.map((item) => (
            <VocabCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-[10px] font-semibold tracking-widest text-stone-600 uppercase">
          语法
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {grammarCards.map((item) => (
            <GrammarCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {previewCards.length > 0 && (
        <section>
          <h2 className="mb-3 text-[10px] font-semibold tracking-widest text-stone-600 uppercase">
            第 {currentLesson + 1} 课预习
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {previewCards.map((item) => (
              <VocabCard key={item.id} item={item} preview />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
