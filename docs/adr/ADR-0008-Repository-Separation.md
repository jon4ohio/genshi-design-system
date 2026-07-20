# ADR-0008: Repository Separation

## Status
**Status:** Accepted
**Date:** 2026-07-20
**Decision Maker(s):** Genshi maintainers
**Supersedes:** None

## Context

Genshi was explored in the **Genshi 原子** repository (SeamKit adaptation, React POC, validation evidence). Production OSS requires a clean identity without in-place pivot confusion.

**In scope:** Two-repo roles, contributor orientation, link policy.

**Out of scope:** Deprecating or deleting the research repository.

## Decision Drivers

- New contributors should not need SeamKit adaptation history to use Genshi
- Preserve research evidence as historical record
- Fresh ADR numbering in production repo (0001–0008)

## Options Considered

### Option A: Two repositories (Research + Production)
- **Description:** 原子 = Research & Validation; genshi-design-system = production OSS.
- **Pros:** Clean identity; independent semver and CI
- **Cons:** Two repos to maintain links between
- **Effort:** Medium one-time split
- **Notes:** Chosen

### Option B: In-place pivot of 原子 design-system/
- **Description:** Convert existing folder to Lit monorepo.
- **Pros:** Single repo
- **Cons:** Mixed history; confuses framework canon with product
- **Effort:** High confusion cost
- **Notes:** Rejected

## Decision

**We will use Option A.**

| Repository | Role |
|------------|------|
| [Genshi 原子](https://github.com/jon4ohio/genshi) | Research & Validation — framework canon, experiments, evidence |
| **genshi-design-system** (this repo) | Production — packages, releases, Storybook |

**Do not** label 原子 as deprecated. Use "Research & Validation lineage" language.

Do **not** copy ADR numbering from 原子 `design-system/docs/adr/`.

## Consequences

### Positive
- Production repo reads as designed from day one
- Framework thesis stays separate from product velocity

### Negative / Trade-offs
- Cross-repo doc links must stay current

### Operational Impact
- README in both repos links to the other
- **Migration / rollback:** N/A

### Risks

| Risk | Likelihood | Impact | Mitigation | Owner/Role | Review Trigger |
|------|-----------|--------|------------|------------|----------------|
| Contributors open PRs in wrong repo | Med | Low | README "Production implementation" banner | Maintainers | Onboarding feedback |

## Review Schedule

- **Next review:** 2027-07-20
- **Review owner:** Genshi maintainers

## Related ADRs

- ADR-0001 — Why Genshi Exists

## References

- [Genshi 原子 README](https://github.com/jon4ohio/genshi/blob/main/README.md)
- [anchor/project.md](https://github.com/jon4ohio/genshi/blob/main/anchor/project.md)
