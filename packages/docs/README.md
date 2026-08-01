# @genshi/docs

Public documentation source for Genshi Design System.

## Phase 2 index

| Section | Location |
|---------|----------|
| Architecture | [ARCHITECTURE.md](../../ARCHITECTURE.md) |
| ADRs | [docs/adr/index.md](../../docs/adr/index.md) |
| Tokens | [tokens/README.md](../../tokens/README.md) |
| Storybook | `npm run storybook` |

## Storybook map

```text
Foundations/Overview     Platform introduction
Foundations/Governance   Frozen architecture (Phase 2)
Tokens/Layers            Core, Intent, Component
Components/*             gsh-* catalog
Integrations/React/*     @genshi/react wrappers
```

Published Storybook: https://genshi-design-system.vercel.app (`storybook-static/` via Vercel; see `vercel.json`). GitHub Pages deploy on `main` remains available via `.github/workflows/ci.yml`.
