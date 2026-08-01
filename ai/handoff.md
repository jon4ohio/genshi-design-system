# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-08-01

---

## Delta

- **Figma fidelity on origin (2026-08-01):** Pushed SeamKit component import to `origin/main` @ `b62d89e` (Button, Badge, Input, Checkbox, Select, Dialog, Table). Build/test/validate green. Changeset documents Button/Badge breaking `variant`/`intent` split.
- **Anchor orientation committed (2026-08-01):** Branch B scaffolding — Entry, Handoff, thin AGENTS.md, `.anchor/` path map. Separate from product fidelity commits.
- **Phase 2.1 sync (2026-08-01):** Genshi-native token JSON, ADR-0009, taxonomy validation, SeamKit vendor split.

## Horizon

1. Release Readiness Review → cut `0.3.0-next`
2. Product Validation — Genshi Reference Pipeline
3. External `ds-runtime` validation (not a repo dependency)
4. External evaluation → 0.3 Stable → public adoption → catalog expansion → adapters

## Next

- Release Readiness Review (architecture/ADRs/catalog frozen; Storybook vs Figma; breaking changes + known gaps accepted)
- Cut `0.3.0-next` with npm dist-tag `next`
- Keep catalog locked until after 0.3 Stable + adoption evidence

## Blocked

- None

## Roadmap

- **Release:** Prove Genshi — `0.3.0-next` then 0.3 Stable after validation
- **Focus:** Product validation (Figma → tokens → Lit → Storybook → example app); ds-runtime external
- **Out of scope until gates:** Catalog expansion, Vue/Angular impl, multi-brand theme UI, requiring ds-runtime in-repo

## Branch / PR

- **Branch:** `main` @ `b62d89e` (up to date with `origin/main` after Figma push; Anchor docs commit follows)
- **Also:** `cursor/research-validation-lineage` has unmerged Storybook DX tip (`5cd6bfa`)

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| | | | | |
