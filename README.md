# Genshi Design System

Production implementation of **Genshi** — a layered design system platform with Lit canonical components, framework adapters, and a Core → Intent → Component token architecture.

## Repository role

This repository is the **public OSS** home for Genshi packages, releases, documentation, and Storybook.

The [Genshi 原子](https://github.com/jon4ohio/genshi) repository preserves the **Research & Validation** lineage — architecture exploration, SeamKit adaptation experiments, and validation evidence that informed this implementation.

## Architecture

```text
Core Tokens        (.primitive — immutable design primitives)
      ↓
Intent Tokens      (color/value — system language)
      ↓
Component Tokens   (component/web — component styling contract)
      ↓
Themes             (@genshi/themes — brand/mode resolution)
      ↓
Core Components    (@genshi/core — gsh-* Lit elements)
      ↓
Adapters           (@genshi/react, vue, angular)
```

**Contributor rule:** Components consume **Component Tokens** only. Never reference Intent or Core tokens directly from components.

## Packages

| Package | Description |
|---------|-------------|
| `@genshi/tokens` | Token build pipeline and generated outputs |
| `@genshi/foundation` | Theme-agnostic accessibility, focus, keyboard, utilities |
| `@genshi/themes` | Theme resolution (SeamKit default) |
| `@genshi/core` | Canonical Lit web components (`gsh-*`) |
| `@genshi/react` | Thin `@lit/react` wrappers |
| `@genshi/vue` | Stub (Phase 3) |
| `@genshi/angular` | Stub (Phase 3) |

## Quick start

```bash
npm install
npm run build
npm run storybook
```

## Token vocabulary

| Layer | Genshi name | SeamKit source |
|-------|-------------|----------------|
| Primitives | **Core** | `.primitive/` |
| System language | **Intent** | `color/` |
| Component contract | **Component** | `component/` |

**Not Genshi layer names:**
- **Semantic** — vendor-only term; see [ADAPTATION.md](ADAPTATION.md) for vendor → Genshi mapping
- **Decision** — reserved for ADR/governance vocabulary, not tokens

See [ADR-0002](docs/adr/ADR-0002-Layered-Token-Architecture.md) and [ARCHITECTURE.md](ARCHITECTURE.md).

## Documentation

- [Architecture](ARCHITECTURE.md) — frozen package and token boundaries
- [ADRs](docs/adr/) — architecture decisions (0001–0008)
- [Token layers](tokens/README.md) — Core, Intent, Component mapping
- [SeamKit adaptation](ADAPTATION.md)

## License

MIT — see [LICENSE](LICENSE).
