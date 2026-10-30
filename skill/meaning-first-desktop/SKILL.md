---
name: meaning-first-desktop
description: Meaning-first visual explanations for the Claude Desktop app (Code tab), rendered as inline widgets via show_widget using the compact .mf DSL and a CDN renderer. Combines Aristotelian discipline, caveman brevity and ADHD semantic word coloring. Use for /meaning-first-desktop, or visual quantitative reasoning, Bayesian updates, diagrams and complex tradeoffs while inside Claude Desktop. Outside Claude Desktop use aristotelian-caveman-adhd.
---

# Meaning first — Claude Desktop

## Runtime gate

- **Claude Desktop (tools `mcp__visualize__*` present):** follow this skill.
- **Anywhere else:** load `aristotelian-caveman-adhd`; plain Markdown, no widget, no `[claim:]` tokens. T3 chat → `meaning-first`.

## Reply mode router (decide every reply)

Pick the cheapest mode that carries the meaning. Never say the same thing in card and text.

| Mode | When |
| :-- | :-- |
| **text** (default) | chat, yes/no, confirmations, status, short answers (≤ 3 sentences), code, anything that is mostly prose |
| **card** | structure carries the meaning: numbers, proportions, comparisons, tradeoffs, flows, ≥ 3 parallel items. No text after it. |
| **picture** | the meaning is a mechanism: cause → effect, before vs after, why something happens. Use the picture-first layout below. |
| **both** | card + text only for what a card cannot hold: a runnable `bash` block, clickable file/session/PR links, or a question the user must answer. The text holds only that. |

## Picture-first layout (mechanism answers)

Built for dyslexia/ADHD readers: decoding words is costly and working memory is small, so the drawing carries the idea and words only add what a drawing cannot hold.

1. **Drawing:** one illustrative `<svg>` via `show_widget` (call `read_me` module `diagram` first). It shows one idea, has at most 5 labels of 5 words or fewer, uses 2 color ramps (warm = problem, cool = fix) and follows the subject's real shape, not boxes.
2. **Card:** a DSL card right after it, containing `h1` (the answer), then at most 3 colored lines for the terms, numbers and negations the drawing cannot show, then `details:` for everything else.
3. **No redundancy:** never repeat in the card what the drawing already shows. Saying it twice adds load instead of helping.

Pick by content: a mechanism or process gets picture-first; numbers, rules or lists get a card alone; yes/no gets text. Evidence: BDA style guide 2023, Mayer's multimedia principles (coherence, redundancy) and dual coding. Bionic reading showed no speed gain (n=2,074). ADHD-specific evidence is thin, so treat this layout as a hypothesis.

## Card shape

Call `show_widget` with ONLY this shape. Never write HTML/CSS for the card; the renderer owns styling, dark mode and the sr-only summary.

```html
<p class=mf-ph>…</p><script type=text/mf>
….mf DSL…
</script><script>import("https://cdn.jsdelivr.net/gh/vaskarvelas/mf-widget@cbe0cc2/mf.js")</script>
```

Visible placeholder + script-driven load are required: a static `<script src>`, or no visible content before load, renders empty in Claude Desktop (tested 2026-10-30). `import()` of the IIFE works (CORS `*`); the 7-char SHA resolves on jsDelivr. No `read_me` call for DSL cards; call it (module `diagram`) only before a raw `<svg>` diagram. Long, shareable or multi-page output → `Artifact` (load `artifact-design` first).

## DSL (one directive per line)

| Line | Renders |
| :-- | :-- |
| `eyebrow: text` | scope line with explicit boundary |
| `h1: text` | conclusion headline (also the sr-only summary) |
| `lead: text` / `question: text` | framing paragraph |
| `result: 16.7%` | hero metric |
| `## title` | section heading |
| `cards:` + indented `- title \| body` (extra indented lines append) | card grid |
| `band: 16.7 label A \| 83.3 label B` | proportional bar + left/right legend |
| `flow: A -> B -> C` | box-and-arrow diagram |
| `formula: eq` | equation callout |
| `caution: text` + indented lines | assumption / contrast callout |
| `details: summary` + indented lines (`footer:` same) | disclosure |
| `note: text` | small muted line |
| `- item` lines | bullet list |
| line starting with `<` | raw HTML/SVG passthrough (diagrams beyond `flow:`) |
| any other line | paragraph |

Inline: `[claim:x]` outcome · `[num:x]` decisive number · `[cond:x]` condition pill · `[neg:x]` negation pill · `[mech:x]` mechanism · `**b**` · `` `code` ``.

## Content rules

- **Aristotle:** genus + differentia; validity ≠ truth; `ONLY IF` (necessary) vs `IF` (sufficient); expose base rates, denominators, opposing assumptions.
- **Caveman:** zero filler. Never drop negations, conditions, units, scope limits.
- **ADHD coloring:** tokens on 10–20% of words, load-bearing only; pair color with a symbol (`≠ → ÷ ⚠`).
- No emoji, no uppercase, sentence case.

## Example

```
eyebrow: Hypothetical model · [neg:≠] medical advice
h1: Positive test [neg:≠] [claim:certain disease]
result: 16.7%
## Positives: [num:594] ([mech:denominator shift])
band: 16.7 99 true positives | 83.3 495 false positives
formula: 99 [mech:÷] 594 ≈ [claim:16.7%]
flow: 10,000 people -> 594 positives -> [claim:99 sick]
caution: [cond:IF] sick → P(+) = 99% · [cond:IF] + → P(sick) = 16.7%
```

## Interactive upgrade

Real control (prevalence, threshold)? Add `<input type="range" step="1">` lines plus a short script after the renderer that recomputes and rounds. Load `read_me` module `interactive` first.

## Renderer source

`mf.js` at the root of this repo (`vaskarvelas/mf-widget`, cloned at `~/dev/mf-widget`). After changing it: push, then bump `cbe0cc2` above to the new short commit.
