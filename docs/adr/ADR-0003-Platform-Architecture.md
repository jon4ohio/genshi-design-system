# ADR-0003: Platform Architecture

## Status
**Status:** Accepted
**Date:** 2026-07-20
**Decision Maker(s):** Genshi maintainers
**Supersedes:** None

## Context

The monorepo must enforce clear package boundaries so tokens, theme-agnostic behavior, presentation, core components, and adapters do not collapse into one bundle.

**In scope:** Package graph, public API tiers, dependency rules.

**Out of scope:** Vue/Angular implementation (Phase 3).

## Decision Drivers

- Parallel Foundation and Themes siblings from tokens
- Core composes Foundation + Themes
- Adapters depend on Core only for component logic
- Enforceable via CI

## Options Considered

### Option A: Frozen package graph with CI validation
- **Description:** Document graph in ARCHITECTURE.md; validate in `scripts/validate-boundaries.mjs`.
- **Pros:** Cheap to enforce; catches drift early
- **Cons:** Custom script vs dependency-cruiser
- **Effort:** Low
- **Notes:** Chosen for Phase 2

### Option B: Single `@genshi/ui` package
- **Description:** One package exports everything.
- **Pros:** Simple install
- **Cons:** Violates separation; blocks tree-shaking and adapter model
- **Effort:** Low
- **Notes:** Rejected

## Decision

**We will use Option A** with this dependency graph:

```text
@genshi/tokens
       ↓
Foundation ∥ Themes
       ↓
   @genshi/core
       ↓
   @genshi/react (+ vue/angular stubs)
```

**Public API tiers:**

| Tier | Surface | Stability |
|------|---------|-----------|
| 1 Stable | `gsh-*` elements, `@genshi/core`, `@genshi/react` exports, `--gsh-*` tokens | Semver |
| 2 Experimental | Undocumented props, preview packages | May break minor |
| 3 Internal | Build scripts, `_merged.json` | No guarantee |

## Consequences

### Positive
- Contributors know where code belongs
- CI blocks invalid dependencies

### Negative / Trade-offs
- More packages to version and publish

### Operational Impact
- `npm run validate` in CI
- **Migration / rollback:** Add packages only via new ADR

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Silent cross-package imports | Med | High | validate-boundaries.mjs in CI | Maintainers | Any new package |

## Review Schedule

- **Next review:** 2027-01-20
- **Review owner:** Genshi maintainers

## Related ADRs

- ADR-0002 — Layered Token Architecture
- ADR-0004 — Lit Canonical Implementation
- ADR-0006 — Foundation Principles
- ADR-0007 — Framework Adapter Strategy

## References

- [ARCHITECTURE.md](../../ARCHITECTURE.md)
- [scripts/validate-boundaries.mjs](../../scripts/validate-boundaries.mjs)
