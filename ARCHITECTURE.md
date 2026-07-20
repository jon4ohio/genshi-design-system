# Genshi Architecture

Frozen architecture boundaries for contributors. Ratified in [docs/adr/](docs/adr/) ADR-0001 through ADR-0008.

## Two-repository model

| Repository | Role |
|------------|------|
| [Genshi 原子](https://github.com/jon4ohio/genshi) | Research & Validation lineage |
| **genshi-design-system** (this repo) | Production OSS |

## Token layers

```text
Core       (.primitive/)   → immutable primitives
Intent     (color/)        → design intent / system language
Component  (component/)     → component styling contract
```

**Middle layer name: Intent** — not "Semantic" (SeamKit vendor paths only), not "Decision" (ADR vocabulary only).

See [ADR-0002](docs/adr/ADR-0002-Layered-Token-Architecture.md) and [mappings/layers.json](mappings/layers.json).

**Contributor rule:** Components consume **Component Tokens** only.

## Package graph

```text
@genshi/tokens
       ↓
Foundation ∥ Themes
       ↓
   @genshi/core  (Lit, gsh-*)
       ↓
   @genshi/react
```

| Package | Owns | Must not |
|---------|------|----------|
| `@genshi/tokens` | Build pipeline, `--gsh-*` CSS | Import components |
| `@genshi/foundation` | Focus, keyboard, a11y utilities | Depend on themes/core; visual tokens |
| `@genshi/themes` | Component token resolution per brand | Component logic |
| `@genshi/core` | Canonical `gsh-*` elements | Reference Intent/Core tokens in component CSS |
| `@genshi/react` | `@lit/react` wrappers | Component logic or styling |

Enforced by `npm run validate`.

## Public API tiers

| Tier | Examples | Stability |
|------|----------|-----------|
| 1 Stable | `gsh-button`, `@genshi/react`, `--gsh-*` | Semver |
| 2 Experimental | Undocumented props | May break minor |
| 3 Internal | `build.mjs`, Lit decorators | No guarantee |

## Storybook contract

```text
Foundations/     Platform overview, architecture, governance
Tokens/          Core, Intent, Component layers
Components/      gsh-* catalog
Integrations/    Framework adapters (React)
```

## Phase 2 exemplary components

Phase 1: Text, Box, Stack, Button, Input, Badge, Icon.

Phase 2 additions (locked set before catalog expansion): **Select**, **Checkbox**, **Dialog**, **Table**.

## Validation

```bash
npm run validate          # terminology + package boundaries
npm run build && npm test
npm run build-storybook
```

## ADR index

| ADR | Title |
|-----|-------|
| 0001 | Why Genshi Exists |
| 0002 | Layered Token Architecture (Intent) |
| 0003 | Platform Architecture |
| 0004 | Lit Canonical Implementation |
| 0005 | Theme Architecture |
| 0006 | Foundation Principles |
| 0007 | Framework Adapter Strategy |
| 0008 | Repository Separation |
