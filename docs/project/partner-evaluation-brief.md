# Partner evaluation brief — Genshi 0.3.0-next

**Status:** Open for design partners / early adopters  
**Cut:** [v0.3.0-next.0](https://github.com/jon4ohio/genshi-design-system/releases/tag/v0.3.0-next.0)  
**Date opened:** 2026-08-01

## What to evaluate

Prove Genshi works as a **system** (not individual layers):

1. Figma (SeamKit UI) → Genshi tokens → Lit `gsh-*` → Storybook → example app
2. Optionally (separate claim): external `ds-runtime` `resolve`/`explain` of bare names (e.g. `Button`) against this repo — prefer tool from the packed `ds-runtime-1.0.0.tgz`, not an in-repo dependency.

## How to consume

- **Monorepo / git tag:** clone at `v0.3.0-next.0` or `main`
- **Hosted Storybook:** https://genshi-design-system.vercel.app
- **Local Storybook:** `npm ci && npm run build && npm run storybook`
- **Example app:** `npm run build -w employee-directory` / `npm run dev`
- **npm `@next`:** blocked until `@genshi` scope ownership is secured (foreign packages occupy `@genshi/core` / `@genshi/react` on the public registry). Prefer git/workspace until then.

**Scope note:** This partner path validates API/DX from a **clone**. **Installation-as-a-dependency** (`npm i @genshi/core`) **remains untested** pending npm scope / `NPM_TOKEN` resolution.

## Catalog under evaluation (frozen)

Button, Badge, Input, Checkbox, Select, Dialog, Table — plus foundation primitives (Text, Box, Stack, Icon).

## Breaking changes to note

`gsh-button` / `gsh-badge`: `variant` is visual treatment; color moved to `intent`. See `@genshi/core` changelog `0.3.0-next.0`.

## Accepted limitations

Button warning/focus-ring tokens; Input disabled via opacity; Select chevron (icons stub); Table rich cell types deferred.

## Feedback ask

Please record: what broke, what was ambiguous, what you needed beyond the seven. Feedback feeds the go/no-go for **0.3 Stable** (not catalog unlock).

### Facilitator: live attribution (during the session)

The **session facilitator** tags observations **while observing**, not afterwards. Keep this table open live:

| Observation | Contract | Confidence |
|-------------|----------|------------|
| | Anchor / Genshi / **Unattributed** | High / Medium / Low |

- Assign **Contract** at capture time. Use **Unattributed** when unsure — do not force a fit.
- Do not defer attribution to transcript review except to correct factual mistakes.
- If unattributed rows become material (block deciding Anchor vs Genshi work), schedule a follow-up session designed to isolate that contract.

## Explicit non-goals during this evaluation

Catalog expansion, Vue/Angular adapters, requiring `ds-runtime` inside the Genshi package graph.
