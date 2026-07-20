# Genshi Token Architecture

## Layered model

```text
Core       (.primitive/)     → immutable primitives (blue.500, space.4)
Intent     (color/)          → design intent (action.primary, text.default)
Component  (component/)      → component contract (button.primary.background)
```

## Source layout

```text
tokens/
├── source/
│   ├── seamkit/     # SeamKit export baseline
│   └── overrides/   # Genshi-specific overrides
├── generated/
│   ├── css/         # tokens.css, aliases.css
│   ├── ts/          # tokens.ts
│   └── tailwind/    # preset.js
└── _merged.json     # build intermediate (gitignored)
```

## Layer glossary

| Genshi layer | SeamKit folder | Question |
|--------------|----------------|----------|
| **Core** | `.primitive/` | What primitives exist? |
| **Intent** | `color/` | What is the design intent? |
| **Component** | `component/` | How does a component use intent? |

**Rejected as Genshi layer labels:**
- **Semantic** — SeamKit vendor naming only (`non-semantic` in source JSON)
- **Decision** — ADR/governance term only

Machine-readable classification: [mappings/layers.json](../mappings/layers.json).

## Build

```bash
npm run build:tokens
```

Emits `--sfe-*` (SeamKit compat) and `--gsh-*` (canonical) CSS custom properties.

## Contributor rule

> Components consume **Component Tokens** only. Component Tokens resolve to Intent Tokens. Intent Tokens resolve to Core Tokens.

## Mappings

- `mappings/aliases.json` — `--sfe-*` → `--gsh-*`
- `mappings/tokens.json` — layer classification
- `mappings/components.json` — component token references
