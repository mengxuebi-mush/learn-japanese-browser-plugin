# Japanese Review Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> A Chrome new-tab extension (plus iOS lock-screen widget) that turns idle moments into Japanese review. Zero LLM API cost — practice buttons deep-link to Claude chat.

A lightweight spaced-review tool for learners of *Minna no Nihongo* (《大家的日本语》). It turns two high-frequency moments — opening a new browser tab and glancing at the iPhone lock screen — into tiny, frictionless Japanese review sessions.

**The clever bit:** zero LLM API calls. Every "practice this with AI" button is a deep link to a Claude chat with a pre-filled prompt. The tool handles exposure and launch; Claude handles the conversation.

---

## Why

Most review tools (Anki, Duolingo, etc.) require a decision to start studying. This one doesn't. You already open new tabs dozens of times a day. You already glance at your lock screen. The review is already there — you just read it.

Design constraints that fell out of this:
- **No quiz modes** (fill-in-the-blank, multiple choice, matching) — they drill wrong answers as effectively as right ones, and Claude chat does free-form practice better anyway
- **No backend, no database** — all state lives in `localStorage`; the data layer is static JSON
- **No LLM API costs** — prompts are URL-encoded and handed off via `https://claude.ai/new?q=...`
- **Whitespace > density** — especially on mobile, one card with big type beats four cards you'll skip

## How it works

```
┌──────────────────────┐     ┌──────────────────────┐
│  Chrome new tab      │     │  iOS lock screen     │
│  3–4 cards           │     │  1 card, big type    │
│  [practice w/ Claude]│     │  [tap → Claude]      │
└──────────┬───────────┘     └──────────┬───────────┘
           │                            │
           └──────────┬─────────────────┘
                      ▼
        https://claude.ai/new?q=<encoded prompt>
                      │
                      ▼
           Claude chat, free-form practice
```

Both surfaces pull from the same two JSON files (`vocabulary.json`, `grammar.json`) parsed from an Anki `.apkg` of Minna no Nihongo lessons.

## Status

| Phase | What | Status |
|-------|------|--------|
| 1 | Parse Anki `.apkg` → `vocabulary.json` + `grammar.json` | Done |
| 2 | Chrome new-tab extension (React + Vite + Tailwind + MV3) | In progress |
| 3 | iOS lock-screen widget via Scriptable | Planned |
| 4 | Swap random sampling for simplified SM-2 spaced repetition | Planned |

Each phase ships independently.

## Repo layout

```
japaneseTool/
├── vocabulary.json            # Parsed from Anki, ~X,XXX items
├── grammar.json               # Parsed from Anki, grammar points + examples
├── apps/
│   └── chrome-extension/      # Phase 2: MV3 new-tab override
└── packages/
    └── core/                  # Shared: sampler, storage, types
```

## Install (developer mode)

Not published to the Chrome Web Store yet — load it unpacked:

1. Clone and build:
   ```bash
   git clone git@github.com:mengxuebi-mush/learn-japanese-browser-plugin.git
   cd learn-japanese-browser-plugin/apps/chrome-extension
   npm install
   npm run build
   ```
   Requires Node 18+.

2. In Chrome, open `chrome://extensions`
3. Toggle **Developer mode** (top-right)
4. Click **Load unpacked** and select the `apps/chrome-extension/dist` folder
5. Open a new tab — the review cards replace Chrome's default new-tab page

To update after pulling changes: `npm run build` again, then hit the refresh icon on the extension card at `chrome://extensions`.

## Prompt templates

Example — vocabulary card:

```
我正在学日语,请用「{japanese}」({chinese})给我出一个情景对话练习,我来回应,你帮我纠错。
```

Example — grammar card:

```
我正在学「{grammarPoint}」语法,给我一个生活场景,我用这个语法造句,你批改并给出更地道的表达。
```

## Tech

React 19 · TypeScript · Vite · Tailwind v4 · Chrome MV3 · Scriptable (iOS) · hosted static JSON on Vercel

---

## Content attribution

The vocabulary and grammar example sentences in `vocabulary.json` and `grammar.json` are derived from the *Minna no Nihongo* (《大家的日本语》) textbook series, published by **3A Network** (株式会社スリーエーネットワーク). This includes textbook characters (e.g. Mike Miller, Mr. Santos) and example sentences that appear in the book.

This project is a personal study tool, not a replacement for the textbook — you still need the real book to actually learn. The data is included here so the tool runs out of the box for other learners who already own a copy.

**If you represent 3A Network and would like the textbook-derived content removed, please open an issue on this repo and I'll take it down promptly.** No pushback — the goal here is a learning aid, not redistribution.

The source `.apkg` files themselves are excluded from this repo (see `.gitignore`).

## License

The **code** in this repository is MIT-licensed (see [LICENSE](./LICENSE)) — fork, learn from it, build on it. The license covers only the code I wrote; it does not grant rights to the Minna no Nihongo textbook content described above, which remains the property of its publisher.

---

Built as a personal tool while working through Minna no Nihongo.
