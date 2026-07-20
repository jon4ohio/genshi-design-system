# ADR-0002: Layered Token Architecture

## Status
**Status:** Accepted
**Date:** 2026-07-20
**Decision Maker(s):** Genshi maintainers
**Supersedes:** None

**Clarified by:** [ADR-0009](ADR-0009-Architecture-Taxonomy-Adaptation.md) (Phase 2.1) — token taxonomy, Decorative domain, canonical `tokens/source/genshi/`, and vendor adaptation boundaries.

## Context

Genshi requires a token model that separates immutable primitives from design language and component styling contracts. SeamKit (Phase 1 reference) exports tokens in folders that map naturally to three Genshi layers. Contributors need one vocabulary for the middle layer before public release.

**In scope:** Token layer names, source folder mapping, contributor consumption rules, rejected synonyms.

**Out of scope:** SeamKit source JSON renames, Figma variable renames.

## Decision Drivers

- Single mental model for contributors across JSON, Style Dictionary, Storybook, ADRs, and code
- Avoid collision with ADR/governance "Decision" vocabulary
- Avoid industry "Semantic token" jargon overload and SeamKit `non-semantic` path confusion
- Components must not bypass the component-token contract

## Options Considered

### Option A: Core → Intent → Component
- **Description:** Middle layer named **Intent** — design intent / system language (e.g. `action.primary`, `text.default`).
- **Pros:** Distinct from ADR "Decision"; describes purpose; already used in production repo docs
- **Cons:** Less familiar than "Semantic" to DS practitioners
- **Effort:** Low — documentation lock only
- **Notes:** SeamKit `color/` folder maps to Intent

### Option B: Core → Decision → Component
- **Description:** Middle layer named **Decision** — aligned with Genshi framework decision-centric thesis.
- **Pros:** Resonates with framework canon
- **Cons:** Collides with ADR "Decision Drivers", "Decision Maker"; ambiguous in governance docs
- **Effort:** Medium — rename sweep + ongoing confusion risk
- **Notes:** Rejected for production token layer

### Option C: Core → Semantic → Component
- **Description:** Industry-default naming (Material, Tokens Studio conventions).
- **Pros:** Familiar to external contributors
- **Cons:** SeamKit uses `non-semantic` in token paths; overloads meaning; not Genshi-specific
- **Effort:** Low adoption, high long-term ambiguity
- **Notes:** Rejected as Genshi layer label; SeamKit vendor paths unchanged

## Decision

**We will use Option A: Core → Intent → Component.**

The middle layer is **Intent Tokens**. SeamKit folder mapping:

| SeamKit folder | Genshi layer |
|----------------|--------------|
| `.primitive/` | **Core** |
| `color/` | **Intent** |
| `component/` | **Component** |

**Contributor rule:**

> Components consume **Component Tokens** only. Component Tokens resolve to Intent Tokens. Intent Tokens resolve to Core Tokens. Components must never reference Intent or Core tokens directly.

**Rejected layer names (not used in Genshi docs, Storybook, or ADRs):**
- **Semantic** — reserved for SeamKit vendor paths only (e.g. `non-semantic` colors)
- **Decision** — reserved for ADR and governance vocabulary only

## Consequences

### Positive
- One term everywhere Genshi controls naming
- Clear adaptation boundary at SeamKit import
- Component token contract enforceable in CI

### Negative / Trade-offs
- External contributors may expect "Semantic"; glossary and ADAPTATION.md must explain Intent

### Operational Impact
- `mappings/layers.json` classifies source sets
- Terminology validation in CI
- **Migration / rollback:** N/A — greenfield production repo

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Intent vs Semantic drift in external blog posts | Med | Med | Lock term in ADR-0002; CONTRIBUTING glossary | Maintainers | First public release |

## Review Schedule

- **Next review:** 2027-01-20 or before adding a fourth token layer
- **Review owner:** Genshi maintainers

## Related ADRs

- ADR-0009 — Architecture vs taxonomy vs adaptation (Phase 2.1 governance)
- ADR-0003 — Platform Architecture (package graph)
- ADR-0005 — Theme Architecture (component token resolution)

## References

- [tokens/README.md](../../tokens/README.md)
- [mappings/layers.json](../../mappings/layers.json)
- [ADAPTATION.md](../../ADAPTATION.md)
