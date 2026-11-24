# 日语碎片化复习工具 — CLAUDE.md

## 项目一句话描述

为《大家的日本语》学习者打造的轻量碎片化复习工具：Chrome 新标签页扩展 + iOS 锁屏小组件，把复习嵌入已有日常动作，所有 AI 交互通过跳转 Claude chat 实现，零 LLM API 调用。

---

## 数据底座

### 已有文件

| 文件 | 结构 | 状态 |
|------|------|------|
| `vocabulary.json` | `id`, `lessonNumber`, `japanese`, `reading`, `pitchAccent`, `partOfSpeech`, `chinese` | 已完成，含多课 |
| `grammar.json` | `examples[]`，每条含 `id`, `lessonNumber`, `grammarPoint`, `japanese`, `chinese` | 已完成，含多课 |

注意：grammar.json 的顶层是 `{ "examples": [...] }`，vocabulary.json 顶层是数组 `[...]`。

### 运行时数据（localStorage，无后端）

- `srs_state`：每个 item 的复习状态（interval、due date、ease factor）
- `user_progress`：当前学到第几课（`currentLesson: number`）
- `custom_items`：用户手动录入的补充内容，结构同 vocabulary/grammar item，`lessonNumber` 用 0 或 `"custom"` 标记
- `settings`：用户偏好（卡片数量等）

---

## 技术栈

- **框架**：React + Vite + TypeScript + Tailwind CSS
- **托管**：Vercel（静态部署）
- **Chrome 扩展**：Manifest V3，new tab override
- **iOS 小组件**：Scriptable（不做原生 app）
- **LLM 调用**：零，所有 AI 功能通过 URL 跳转实现

### Claude chat 跳转 URL 格式

```
https://claude.ai/new?q=<URL编码的prompt>
```

示例：
```
https://claude.ai/new?q=我正在学「〜ています」语法，给我一个生活场景，我用这个语法造句，你批改并给出更地道的表达。
```

---

## 产品形态

### 1. Chrome 新标签页扩展（主入口）

每次开新标签页刷新显示 3-4 张卡片：
- 1 张语法卡（grammar point + 例句 + 中文）
- 2 张词汇卡（日语 + 读音 + 词性 + 中文）
- 1 张"下一课新词预告"卡（仅展示，不计入 SRS）

每张卡片底部有"让 Claude 陪我练习"按钮，预填对应 prompt 跳转 Claude chat。

管理页面（扩展 popup 或独立 options 页）支持：
- 设置当前学到第几课
- 手动添加老师课堂补充内容（词/语法/易错点）
- 查看/删除自定义内容

### 2. iOS 锁屏小组件（Scriptable）

- 每 15 分钟刷新一次
- 单卡：大字日语词 + 小字读音 + 一行例句
- 留白比信息密度更重要
- 点击跳转 Claude chat 造句练习
- 从同一套 JSON 数据中抽取（Scriptable 读取托管在 Vercel 的静态 JSON）

---

## Implementation Phases

### Phase 1 — 数据底座（已完成）
- [x] 从 Anki .apkg 解析词汇和语法
- [x] 输出 `vocabulary.json` 和 `grammar.json`
- [x] 验证前 5 课数据结构

### Phase 2 — Chrome 新标签页扩展（当前目标）
- [ ] Vite + React + Tailwind 项目初始化（`apps/chrome-extension/`）
- [ ] Manifest V3 配置，override new tab
- [ ] 卡片组件：VocabCard、GrammarCard、PreviewCard
- [ ] 抽取逻辑：纯随机（不含 SRS，Phase 4 升级）
- [ ] Claude chat 跳转按钮，prompt 模板
- [ ] 管理页面：设置当前课次 + 录入自定义内容
- [ ] 部署到 Vercel，扩展打包上传 Chrome Web Store（或本地 load unpacked 测试）

### Phase 3 — Scriptable 锁屏小组件
- [ ] Vercel 上托管 `/api/card` 接口（纯静态 JSON serve，无 LLM）
- [ ] Scriptable 脚本：fetch → 渲染单卡 → 跳转 URL
- [ ] 15 分钟刷新节奏

### Phase 4 — SRS 复习权重（从随机升级）
- [ ] 实现简化版 SM-2 算法（interval、ease factor、due date）
- [ ] 替换 Phase 2/3 的随机抽取逻辑
- [ ] "快忘的内容权重高"的加权采样
- [ ] 用户反馈按钮："记住了 / 还不熟"（仅两档，不做五档复杂评分）

每个 Phase 独立可用，不阻塞后续 Phase。

---

## 约束与原则（不可破坏）

### 禁止事项

1. **不做找茬题、填空题、选择题等做题模式** — 容易让用户记住错误信息，且质量永远比不上 Claude chat 自由对话
2. **不在工具内调用任何 LLM API** — 所有 AI 交互通过跳转 Claude chat 实现，零 API 成本
3. **不做深度学习场景** — 工具只负责曝光和启动器，深度学习由课本承担
4. **不追求一次性数字化全部 50 课** — 学到哪课处理哪课，按需扩展
5. **不引入数据库或后端服务** — 进度和状态全部存 localStorage，数据底座用静态 JSON

### 核心设计原则

- **入口零摩擦**：复习嵌入已有高频动作（开新标签页、亮屏），不需要"主动开始"
- **被动曝光优先**：降低"我要学习了"的决策成本
- **信息密度匹配场景**：电脑端 3-4 张卡，手机端单卡大字，留白 > 信息密度
- **不重复造轮子**：练习交给 Claude chat，工具只做展示 + 智能跳转
- **渐进式**：每个 Phase 独立有价值，不等全部完成才上线

### SRS 简化原则

- 只做两档反馈："记住了 / 还不熟"，不做 Anki 式五档
- 算法用简化 SM-2，不追求精确，够用即可
- 新词预告卡不计入 SRS，只做被动曝光

---

## 目录结构（规划）

```
japaneseTool/
├── CLAUDE.md                  # 本文件
├── vocabulary.json            # 词汇数据底座
├── grammar.json               # 语法数据底座
├── apps/
│   ├── chrome-extension/      # Phase 2：新标签页扩展
│   │   ├── manifest.json
│   │   ├── src/
│   │   └── vite.config.ts
│   └── scriptable/            # Phase 3：iOS 小组件脚本
│       └── widget.js
└── packages/
    └── core/                  # 共享逻辑
        ├── srs.ts             # SRS 算法
        ├── sampler.ts         # 卡片抽取
        └── types.ts           # 共享类型定义
```

---

## Prompt 模板参考

词汇练习：
```
我正在学日语，请用「{japanese}」（{chinese}）给我出一个情景对话练习，我来回应，你帮我纠错。
```

语法练习：
```
我正在学「{grammarPoint}」语法，给我一个生活场景，我用这个语法造句，你批改并给出更地道的表达。
```

自由对话：
```
我刚学完《大家的日本语》第{lesson}课，用这一课学的内容跟我对话5轮，语速慢一点，遇到我的错误随时纠正。
```
