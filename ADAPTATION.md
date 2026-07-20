# SeamKit → Genshi Adaptation

Genshi adapts [SeamKit](https://seamkit.com) (Figma UI + Tokens) as its Phase 1 reference design language. Adaptation happens **once** during recreation—not at runtime.

## Pipeline

```text
tokens/vendor/seamkit/   (read-only vendor export)
        ↓
scripts/recreate-genshi-tokens.mjs
        ↓
tokens/source/genshi/    (canonical Genshi DTCG)
        ↓
packages/tokens/build.mjs → --gsh-* CSS
```

## Vendor → Genshi mappings

| SeamKit (vendor) | Genshi (public) |
|------------------|-----------------|
| `sfe` root | `gsh` root |
| `color.non-semantic.*` | `color.decorative.*` |
| `avater` (typo) | `avatar` |
| `primitive.json` | `core.json` |

Do **not** edit `tokens/vendor/seamkit/` — regenerate canonical source with:

```bash
node scripts/recreate-genshi-tokens.mjs
```

## Architectural layer mapping (documentation)

| Vendor export | Genshi layer |
|---------------|--------------|
| `primitive.json` | Core |
| `color.json` | Intent (token domains) |
| `sizing.json`, `typography.json` | Intent-adjacent domains |
| `component.json` | Component |

## Token domain taxonomy

Public paths use **token domains**, not layer names:

```text
gsh.color.text.…
gsh.color.fill.…
gsh.color.decorative.…
```

Never `gsh.color.intent.…` in public API.

## Figma sources

- **Tokens:** `IafiBqd0CR4UyN6WgnnLiR`
- **UI:** `1mpwO1oRCJG6tOrXIZpr5w`

When exporting from Figma via Tokens Studio, import Genshi JSON from `tokens/source/genshi/` (five files + `$metadata.json`).

## Principles

1. Preserve visual intent
2. Vendor vocabulary stays in `tokens/vendor/` only
3. Own the implementation (`gsh` namespace, decorative domain)

See [tokens/README.md](tokens/README.md) and [ADR-0009](docs/adr/ADR-0009-Architecture-Taxonomy-Adaptation.md).
