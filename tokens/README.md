# Genshi Token Architecture

## Layered model (architecture)

```text
Core       (core.json)           → immutable primitives (blue.500, space.4)
Intent     (color, sizing, …)    → design intent / token domains
Component  (component.json)       → component contract (button.primary.background)
```

## Token taxonomy (public API)

The taxonomy is the public organization of tokens within the Intent layer. **Architectural layer names are not path segments.**

```text
gsh.color.text.…
gsh.color.fill.…
gsh.color.border.…
gsh.color.interaction.…
gsh.color.decorative.…   ← expressive, non-stateful color domain
gsh.btn.… / gsh.badge.…
```

**Decorative** is a token domain within Intent (charts, avatars, badges, illustrations, branded accents)—not a fourth layer.

## Source layout

```text
tokens/
├── vendor/seamkit/          # read-only SeamKit lineage (do not edit)
├── source/genshi/             # canonical DTCG — single build input
│   ├── core.json
│   ├── color.json
│   ├── sizing.json
│   ├── typography.json
│   └── component.json
├── source/overrides/          # optional Genshi overrides
├── generated/                 # Style Dictionary output
└── _merged.json               # build intermediate (gitignored)
```

## Pipeline

```text
Vendor (SeamKit) → recreate-genshi-tokens.mjs → source/genshi → build.mjs → --gsh-*
```

```bash
node scripts/recreate-genshi-tokens.mjs   # after vendor export updates
npm run build:tokens
```

Emits canonical `--gsh-*` CSS variables plus convenience aliases from [mappings/aliases.json](../mappings/aliases.json) (canonical → short).

## Layer glossary

| Genshi layer | Source file(s) | Question |
|--------------|----------------|----------|
| **Core** | `core.json` | What primitives exist? |
| **Intent** | `color.json`, `sizing.json`, `typography.json` | What is the design intent? |
| **Component** | `component.json` | How does a component use intent? |

Machine-readable: [mappings/layers.json](../mappings/layers.json), [mappings/taxonomy.json](../mappings/taxonomy.json).

## Contributor rules

> Components consume **Component Tokens** only. Component Tokens resolve to Intent tokens. Intent tokens resolve to Core tokens. Never Component → Core.

> Architectural concepts (`intent`, `core`, `component`) must never appear in public token paths.

## Mappings

- `mappings/aliases.json` — canonical `--gsh-*` → convenience `--gsh-*`
- `mappings/taxonomy.json` — token domains under Intent
- `mappings/layers.json` — architectural layers only
- `mappings/components.json` — component token references
