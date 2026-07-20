# ADR-0007: Framework Adapter Strategy

## Status
**Status:** Accepted
**Date:** 2026-07-20
**Decision Maker(s):** Genshi maintainers
**Supersedes:** None

## Context

React (Phase 2), Vue and Angular (Phase 3) teams need idiomatic imports without forking component logic.

**In scope:** Adapter implementation rules, `@lit/react` for React.

**Out of scope:** Vue/Angular implementation beyond stubs.

## Decision Drivers

- Zero component logic in adapters
- Single source of truth in `@genshi/core`
- Event mapping only (e.g. `onChange` → `input`)

## Options Considered

### Option A: `@lit/react` createComponent wrappers
- **Description:** Thin wrappers with `elementClass` and event maps.
- **Pros:** Official interop; minimal code
- **Cons:** React-specific peer dependency
- **Effort:** Low
- **Notes:** Chosen

### Option B: Hand-rolled React wrappers with duplicated styles
- **Description:** React components re-implement CSS.
- **Pros:** No Lit peer dependency in consumer mental model
- **Cons:** Guaranteed drift from core
- **Effort:** Medium
- **Notes:** Rejected (research repo approach retired)

## Decision

**We will use Option A for `@genshi/react`.** Adapters:

- Import element classes from `@genshi/core`
- Use `createComponent` with `tagName` and `events`
- Ship `@genshi/react/register` side-effect entry to define custom elements
- Contain **no** styling, token references, or business logic

Vue/Angular adapters follow the same rule when implemented in Phase 3.

## Consequences

### Positive
- Parity guaranteed between Storybook web components and React Integrations

### Negative / Trade-offs
- Controlled component patterns require correct event mapping

### Operational Impact
- CI validates react index has no inline styles
- **Migration / rollback:** N/A

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Contributors add logic to react package | Med | High | validate-boundaries + code review | Maintainers | Every adapter PR |

## Review Schedule

- **Next review:** 2027-07-20
- **Review owner:** Genshi maintainers

## Related ADRs

- ADR-0004 — Lit Canonical Implementation

## References

- [packages/react/src/index.tsx](../../packages/react/src/index.tsx)
- [@lit/react](https://lit.dev/docs/frameworks/react/)
