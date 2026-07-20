# Contributing to Genshi Design System

## Architecture (read first)

1. [ARCHITECTURE.md](../ARCHITECTURE.md) — frozen boundaries
2. [docs/adr/index.md](../docs/adr/index.md) — Accepted ADRs 0001–0009
3. [tokens/README.md](../tokens/README.md) — Core → **Intent** → Component; token domains in public paths

Run `npm run validate` before opening a PR.

## Development setup

```bash
git clone https://github.com/jon4ohio/genshi-design-system.git
cd genshi-design-system
npm install
npm run build
npm run validate
npm test
npm run storybook
```

## Token layer rules

| Layer | Source | Components may reference? |
|-------|--------|---------------------------|
| Core | `tokens/source/genshi/core.json` | **No** |
| Intent | `color.json`, `sizing.json`, `typography.json` | **No** — use token domains (`text`, `fill`, `decorative`, …) in paths, not the word "Intent" |
| Component | `component.json` | **Yes** — via `--gsh-*` component tokens |

**Intent** is the architectural middle layer. **Token domains** are the public API within Intent (`gsh.color.text…`, `gsh.color.decorative…`). Do not use "Semantic layer" or "Decision tokens" in docs, Storybook, or code comments.

## Package boundaries

| Package | Add code here when… |
|---------|---------------------|
| `@genshi/tokens` | Token pipeline, generated outputs |
| `@genshi/foundation` | Theme-agnostic a11y, focus, keyboard utilities |
| `@genshi/themes` | Component token resolution for a brand/mode |
| `@genshi/core` | Lit `gsh-*` element implementation |
| `@genshi/react` | `@lit/react` wrapper only — **no styling or logic** |

**Dependency rule:** `tokens → foundation ∥ themes → core → react`

## Adding a component

1. Add component tokens in `packages/themes/build.mjs`
2. Implement `gsh-*` in `packages/core/src/`
3. Add thin wrapper in `packages/react/src/index.tsx`
4. Register in `mappings/components.json`
5. Add Storybook stories under `Components/` and `Integrations/React/`
6. Do **not** expand catalog beyond ADR-approved exemplary set until post-prerelease review

## Changesets

```bash
npm run changeset
```

## Research lineage

Architecture exploration: [Genshi 原子](https://github.com/jon4ohio/genshi). Do not copy ADR numbering from that repo.
