# ADR-0001: Why Genshi Exists

## Status
**Status:** Accepted
**Date:** 2026-07-20
**Decision Maker(s):** Genshi maintainers
**Supersedes:** None

## Context

Organizations need design systems that scale as **platform infrastructure**—not ad-hoc component collections. Genshi exists as a public OSS implementation providing tokens, canonical web components, framework adapters, and documentation contracts.

**In scope:** Product identity, platform vs library distinction.

**Out of scope:** Genshi framework canon ( lives in Genshi 原子 research repo ).

## Decision Drivers

- Clear identity for new contributors without research lineage baggage
- Platform that composes tokens, behavior (foundation), presentation (themes), and adapters
- Public OSS with semver and Storybook as API contract

## Options Considered

### Option A: Design system platform (tokens + core + adapters)
- **Description:** Multi-package platform with Lit canonical core and thin framework adapters.
- **Pros:** Scales across React/Vue/Angular; single source of truth for behavior and styling
- **Cons:** Higher initial setup cost
- **Effort:** High
- **Notes:** Chosen

### Option B: React component library only
- **Description:** Ship `@genshi/react` as primary API without web components.
- **Pros:** Faster initial adoption for React teams
- **Cons:** Framework lock-in; duplicate logic across adapters later
- **Effort:** Low
- **Notes:** Rejected

## Decision

**We will build Genshi as a design system platform (Option A).** Public packages under `@genshi/*` with Storybook documenting Foundations, Tokens, Components, and Integrations.

## Consequences

### Positive
- Single canonical implementation in `@genshi/core`
- Framework flexibility via adapters

### Negative / Trade-offs
- Lit learning curve for contributors extending core

### Operational Impact
- Monorepo with Changesets publishing
- **Migration / rollback:** N/A

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Perceived as "just another React library" | Med | Med | README + Foundations Storybook explain platform model | Maintainers | First 10 external contributors |

## Review Schedule

- **Next review:** 2027-07-20
- **Review owner:** Genshi maintainers

## Related ADRs

- ADR-0003 — Platform Architecture
- ADR-0008 — Repository Separation

## References

- [README.md](../../README.md)
- [Genshi 原子 research repo](https://github.com/jon4ohio/genshi)
