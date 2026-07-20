# ADR-0009: Architecture, Taxonomy, and Adaptation

## Status
**Status:** Accepted
**Date:** 2026-07-20
**Decision Maker(s):** Genshi maintainers
**Supersedes:** None

## Context

Genshi separates three concerns that are easy to conflate: **how tokens resolve** (architecture), **how developers address tokens** (taxonomy), and **how vendor exports become Genshi** (adaptation). Phase 2.1 establishes canonical Genshi DTCG JSON as the single build source.

**In scope:** Governance invariants, source layout, vendor isolation, canonical vs convenience aliases.

**Out of scope:** Renaming SeamKit vendor files; Figma variable renames.

## Decision Drivers

- Single source of truth: `tokens/source/genshi/`
- Architectural layer names must not appear in public token paths
- Vendor vocabulary converted once at recreate, not at runtime
- Contributors need one mental model for domains vs layers

## Options Considered

### Option A: Runtime vendor aliases (status quo)
- **Description:** Keep SeamKit JSON as build input; map `--sfe-*` → `--gsh-*` in CSS.
- **Pros:** Minimal migration
- **Cons:** Two vocabularies in the pipeline; vendor leakage risk
- **Effort:** Low
- **Notes:** Rejected

### Option B: Recreate + canonical Genshi JSON (chosen)
- **Description:** Vendor exports → `recreate-genshi-tokens.mjs` → `tokens/source/genshi/` → Style Dictionary.
- **Pros:** One canonical source; vendor isolated; decorative rename at adaptation boundary
- **Cons:** Requires recreate script maintenance on vendor updates
- **Effort:** Medium
- **Notes:** Accepted

## Decision

**We will use Option B.**

Three orthogonal concerns:

| Concern | Owns |
|---------|------|
| **Architecture** | Core → Intent → Component resolution |
| **Taxonomy** | Public token domains (`color.text`, `color.decorative`, …) |
| **Adaptation** | Vendor → Genshi rename at recreate only |

### Governance invariants

**Invariant A — Namespace purity:** Architectural concepts never appear in public token paths.

- Valid: `gsh.color.text…`, `gsh.color.decorative.fill.raspberry…`
- Invalid: `gsh.color.intent…`

**Invariant B — Resolution chain:** Component → Intent → Core only. Never Component → Core.

**Invariant C — Decorative is a domain:** Expressive, non-stateful color (charts, avatars, badges, illustrations, branded accents)—peer of `text`, `fill`, `border`, `interaction`, `icon`.

**Invariant D — Vendor isolation:** No `sfe`, `non-semantic`, or `--sfe-` in canonical Genshi surfaces (`tokens/source/genshi/`, packages, generated output, Storybook). Allowed only in `tokens/vendor/**` and `ADAPTATION.md`.

### Canonical vs convenience aliases

- **Canonical:** Full path from Style Dictionary (e.g. `--gsh-color-text-default-primary`)
- **Convenience:** Shorter alias derived from canonical (e.g. `--gsh-color-text-primary`)
- Direction: canonical → convenience only (`mappings/aliases.json`)

### Source layout

```text
tokens/vendor/seamkit/     # read-only lineage
tokens/source/genshi/      # canonical DTCG (build input)
```

## Consequences

### Positive
- Build pipeline independent of SeamKit naming
- CI can enforce vendor isolation
- Taxonomy documented separately from layers (`mappings/taxonomy.json`)

### Negative / Trade-offs
- Vendor token updates require re-running recreate script

### Operational Impact
- `node scripts/recreate-genshi-tokens.mjs` before build when vendor exports change
- **Migration / rollback:** Regenerate from vendor; no runtime `--sfe-*` compat sheet

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Recreate script drift from vendor format | Med | Med | Pin vendor copies; CI validates output invariants | Maintainers | Vendor export update |

## Review Schedule

- **Next review:** 2027-01-20 or before adding a fourth architectural layer
- **Review owner:** Genshi maintainers

## Related ADRs

- ADR-0002 — Layered Token Architecture (resolution model)
- ADR-0008 — Repository Separation

## References

- [tokens/README.md](../../tokens/README.md)
- [mappings/taxonomy.json](../../mappings/taxonomy.json)
- [scripts/recreate-genshi-tokens.mjs](../../scripts/recreate-genshi-tokens.mjs)
