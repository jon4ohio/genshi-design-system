# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-08-01

---

## Delta

- **Prerelease cut (2026-08-01):** Changesets pre mode `next`; `@genshi/core@0.3.0-next.0`, `@genshi/react@0.2.1-next.0`; GitHub prerelease [v0.3.0-next.0](https://github.com/jon4ohio/genshi-design-system/releases/tag/v0.3.0-next.0); publish workflow uses `--tag next` for prerelease versions. npm registry publish blocked by foreign `@genshi` scope ownership.
- **Release Readiness Review (2026-08-01): GO** for `0.3.0-next`. Checklist:
  - Architecture frozen (`ARCHITECTURE.md`)
  - ADRs frozen for this cut (0001–0009, including ADR-0009)
  - Component catalog frozen (exemplary seven; CONTRIBUTING lock holds)
  - Storybook stories present for Button, Badge, Input, Checkbox, Select, Dialog, Table (Figma sync already landed @ `b62d89e`)
  - Breaking changes documented (`.changeset/import-seamkit-components.md` — Button/Badge `variant`/`intent`)
  - **Accepted waivers (known limitations):** no Button `warning`/focus-ring vendor tokens; Input disabled approximated via opacity; Select chevron blocked on icons stub; Table rich cell types deferred; orphaned `input-control` vendor family deferred
- **Anchor orientation committed (2026-08-01):** `29efcee` — Entry, Handoff, AGENTS.md, `.anchor/`
- **Figma fidelity on origin (2026-08-01):** `b62d89e` — seven SeamKit-aligned components

## Horizon

1. Product Validation — Genshi Reference Pipeline
2. External `ds-runtime` validation (not a repo dependency)
3. External evaluation → 0.3 Stable → public adoption → catalog expansion → adapters
4. Resolve npm `@genshi` scope ownership (see Blocked) before `@latest` public adoption

## Next

- Run Product Validation (Figma → repo → Storybook → employee-directory)
- Keep catalog locked until after 0.3 Stable + adoption evidence
- Partners consume via git tag / workspace until npm scope is owned

## Blocked

- **npm publish:** `@genshi/core` and `@genshi/react` on the public registry are owned by a different project (`samrith-s/genshi`, state management). Tokens/foundation/themes are unpublished. GitHub prerelease `v0.3.0-next.0` is the authoritative cut until scope/org is secured or packages are renamed.

## Roadmap

- **Release:** `0.3.0-next` (git tag) then 0.3 Stable after validation; npm `@next` when scope allows
- **Focus:** Product validation; ds-runtime external
- **Out of scope until gates:** Catalog expansion, Vue/Angular impl, multi-brand theme UI, requiring ds-runtime in-repo

## Branch / PR

- **Branch:** `main` (version bump `0.3.0-next.0` for `@genshi/core`; Changesets pre mode `next`)
- **Release:** GitHub prerelease `v0.3.0-next.0`
- **Also:** `cursor/research-validation-lineage` has unmerged Storybook DX tip (`5cd6bfa`)

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| | | | | |
