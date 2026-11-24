import { useState } from 'react'

interface Props {
  prompt: string
}

export function PracticeButton({ prompt }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <button
      onClick={handleClick}
      aria-label={copied ? '已复制' : '复制练习 prompt'}
      title={copied ? '已复制，粘贴给你的 agent 即可' : '复制练习 prompt'}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-stone-500 transition hover:bg-stone-700/70 hover:text-stone-200 active:scale-90"
    >
      {copied ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
          <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
        </svg>
      )}
    </button>
  )
}
