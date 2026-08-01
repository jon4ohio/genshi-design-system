# Partner evaluation brief — Genshi 0.3.0-next

**Status:** Open for design partners / early adopters  
**Cut:** [v0.3.0-next.0](https://github.com/jon4ohio/genshi-design-system/releases/tag/v0.3.0-next.0)  
**Date opened:** 2026-08-01

## What to evaluate

Prove Genshi works as a **system** (not individual layers):

1. Figma (SeamKit UI) → Genshi tokens → Lit `gsh-*` → Storybook → example app
2. Optionally (separate claim): external `ds-runtime` resolve/explain of `gsh-*` entities

## How to consume

- **Monorepo / git tag:** clone at `v0.3.0-next.0` or `main`
- **Local Storybook:** `npm ci && npm run build && npm run storybook`
- **Example app:** `npm run build -w employee-directory` / `npm run dev`
- **npm `@next`:** blocked until `@genshi` scope ownership is secured (foreign packages occupy `@genshi/core` / `@genshi/react` on the public registry). Prefer git/workspace until then.

## Catalog under evaluation (frozen)

Button, Badge, Input, Checkbox, Select, Dialog, Table — plus foundation primitives (Text, Box, Stack, Icon).

## Breaking changes to note

`gsh-button` / `gsh-badge`: `variant` is visual treatment; color moved to `intent`. See `@genshi/core` changelog `0.3.0-next.0`.

## Accepted limitations

Button warning/focus-ring tokens; Input disabled via opacity; Select chevron (icons stub); Table rich cell types deferred.

## Feedback ask

Please record: what broke, what was ambiguous, what you needed beyond the seven. Feedback feeds the go/no-go for **0.3 Stable** (not catalog unlock).

## Explicit non-goals during this evaluation

Catalog expansion, Vue/Angular adapters, requiring `ds-runtime` inside the Genshi package graph.
