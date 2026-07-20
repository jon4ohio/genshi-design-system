# ADR-0005: Theme Architecture

## Status
**Status:** Accepted
**Date:** 2026-07-20
**Decision Maker(s):** Genshi maintainers
**Supersedes:** None

## Context

Component tokens must resolve differently per brand/mode without leaking theme logic into Foundation or Core source.

**In scope:** `@genshi/themes`, component token resolution, default SeamKit theme.

**Out of scope:** Multi-brand theme switching UI (future).

## Decision Drivers

- Foundation stays theme-agnostic
- Themes parallel sibling to Foundation, both from tokens
- Apps load tokens CSS + theme CSS at root

## Options Considered

### Option A: CSS theme packages resolving component tokens
- **Description:** `@genshi/themes/seamkit-default` imports tokens and maps component aliases.
- **Pros:** Simple; works everywhere
- **Cons:** CSS-only; no runtime theme API yet
- **Effort:** Low
- **Notes:** Chosen for Phase 2

### Option B: Runtime JS theme provider
- **Description:** React/Vue context switches token sets.
- **Pros:** Dynamic theming
- **Cons:** Over-engineered for Phase 2
- **Effort:** High
- **Notes:** Deferred

## Decision

**We will use Option A.** `@genshi/themes` publishes CSS entry points that:

1. Assume `@genshi/tokens/css` is loaded (or document load order)
2. Resolve component-level aliases (including Phase 2 components: select, checkbox, dialog, table)
3. Set root typographic defaults

Core components never import themes directly—apps and Storybook preview load both.

## Consequences

### Positive
- Clear load order contract
- New component tokens added in theme build

### Negative / Trade-offs
- No runtime dark mode toggle until JS provider ADR

### Operational Impact
- `packages/themes/build.mjs` extends component token aliases
- **Migration / rollback:** Add themes as new packages; do not embed in core

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Missing component alias breaks new component | Med | Med | Theme build includes all gsh-* component contracts | Maintainers | New component PR |

## Review Schedule

- **Next review:** 2027-01-20
- **Review owner:** Genshi maintainers

## Related ADRs

- ADR-0002 — Layered Token Architecture
- ADR-0006 — Foundation Principles

## References

- [packages/themes/build.mjs](../../packages/themes/build.mjs)
