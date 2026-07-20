# SeamKit → Genshi Adaptation

Genshi adapts [SeamKit](https://seamkit.com) (Figma UI + Tokens) as its Phase 1 reference design language.

## Namespace

| SeamKit | Genshi |
|---------|--------|
| `--sfe-*` | `--gsh-*` (canonical public API) |

Both namespaces are emitted during migration; consumers should use `--gsh-*`.

## Token layer mapping

| SeamKit folder | Genshi layer |
|----------------|--------------|
| `.primitive/` | Core |
| `color/` | Intent |
| `component/` | Component |

## Figma sources

- **Tokens:** `IafiBqd0CR4UyN6WgnnLiR`
- **UI:** `1mpwO1oRCJG6tOrXIZpr5w`

## Figma / Southleft mapping

When exporting from SeamKit Figma via Southleft MCP, map collections to Genshi layers:

| Figma / SeamKit export | Genshi layer |
|------------------------|--------------|
| Primitive collections | Core |
| Color / semantic color collections | **Intent** |
| Component-specific variables | Component |

Do not rename SeamKit Figma variables to "Intent" — the adaptation happens at build and documentation boundaries. Genshi-authored docs always say **Intent**, never "Semantic layer" or "Decision tokens".

## Principles

1. Preserve visual intent
2. Improve developer ergonomics
3. Own the implementation

See [tokens/README.md](tokens/README.md) for pipeline details.
