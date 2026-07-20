# ADR-0004: Lit Canonical Implementation

## Status
**Status:** Accepted
**Date:** 2026-07-20
**Decision Maker(s):** Genshi maintainers
**Supersedes:** None

## Context

Genshi needs one canonical component implementation shared across framework adapters. Lit provides standards-based web components with small runtime and Storybook integration.

**In scope:** `@genshi/core`, `gsh-*` custom elements, token consumption rules.

**Out of scope:** Exposing Lit APIs as public Tier 1 contract.

## Decision Drivers

- Framework-agnostic canonical DOM
- `@lit/react` enables zero-logic React wrappers
- Storybook `@storybook/web-components-vite` as primary docs renderer

## Options Considered

### Option A: Lit `@genshi/core` (canonical)
- **Description:** All component logic in Lit; adapters wrap elements.
- **Pros:** True cross-framework core; matches platform architecture
- **Cons:** Lit is implementation detail teams may not know
- **Effort:** Medium
- **Notes:** Chosen; package name `@genshi/core` retained

### Option B: React-first with wc wrapper
- **Description:** React as source of truth; export custom elements later.
- **Pros:** Familiar to React teams
- **Cons:** Duplicates logic for Vue/Angular; contradicts platform model
- **Effort:** Low initially, high long-term
- **Notes:** Rejected (research repo approach superseded)

## Decision

**We will use Lit in `@genshi/core` as the sole canonical component implementation.** Public API is `gsh-*` custom elements and typed exports. Lit decorators and lifecycle are Tier 3 internal.

Components consume **Component Tokens** only via CSS custom properties (see ADR-0002).

## Consequences

### Positive
- One implementation for all adapters
- Storybook renders native elements

### Negative / Trade-offs
- Shadow DOM styling constraints for consumers

### Operational Impact
- Import `@genshi/core/define` once at app root
- **Migration / rollback:** New ADR required to change canonical runtime

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Teams bypass core and fork components | Low | High | Adapter-only policy in CONTRIBUTING | Maintainers | Adapter PR without core |

## Review Schedule

- **Next review:** 2027-07-20
- **Review owner:** Genshi maintainers

## Related ADRs

- ADR-0002 — Layered Token Architecture
- ADR-0007 — Framework Adapter Strategy

## References

- [packages/core/](../../packages/core/)
- [Lit documentation](https://lit.dev)
