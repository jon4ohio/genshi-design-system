# ADR-0006: Foundation Principles

## Status
**Status:** Accepted
**Date:** 2026-07-20
**Decision Maker(s):** Genshi maintainers
**Supersedes:** None

## Context

Shared behavior (accessibility, focus, keyboard) must live outside components and themes to avoid duplication and visual coupling.

**In scope:** `@genshi/foundation` responsibilities and exclusion criteria.

**Out of scope:** Visual tokens, components, framework-specific hooks.

## Decision Drivers

- Theme-agnostic, zero visual identity
- Reusable across all `gsh-*` elements
- No dependency on `@genshi/themes` or `@genshi/core`

## Options Considered

### Option A: Dedicated foundation package
- **Description:** `@genshi/foundation` exports focus, keyboard, interaction utilities.
- **Pros:** Enforces high bar; testable in isolation
- **Cons:** Another package to publish
- **Effort:** Low
- **Notes:** Chosen

### Option B: Utilities inside core
- **Description:** Collapse helpers into `@genshi/core`.
- **Pros:** Fewer packages
- **Cons:** Core becomes grab-bag; harder to test behavior without DOM components
- **Effort:** Low
- **Notes:** Rejected

## Decision

**Foundation includes only what is:** not a component, not a token, reusable, no framework dependency, no visual identity, theme-agnostic.

Phase 2 scope: accessibility helpers, keyboard navigation, focus management (including dialog focus trap), roving tabindex.

Foundation **must not** import `@genshi/themes` or reference `--gsh-*` colors except optional fallbacks in focus ring docs.

## Consequences

### Positive
- Dialog and Select can share focus trap logic
- Behavior tested without Storybook

### Negative / Trade-offs
- Contributors must decide foundation vs core for new helpers

### Operational Impact
- New behavior → foundation first, then core consumes
- **Migration / rollback:** Move misplaced utils from core to foundation

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Foundation accretes visual CSS | Med | Med | Code review + no CSS vars policy | Maintainers | Foundation PR with color tokens |

## Review Schedule

- **Next review:** 2027-07-20
- **Review owner:** Genshi maintainers

## Related ADRs

- ADR-0003 — Platform Architecture
- ADR-0004 — Lit Canonical Implementation

## References

- [packages/foundation/](../../packages/foundation/)
