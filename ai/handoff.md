# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-08-01

---

## Delta

- **Product Validation — Reference Pipeline (2026-08-01): PASS (in-product)**
  - Figma sync already on `main` @ `b62d89e`
  - `recreate:tokens` + validate + build + 10 tests green
  - `build-storybook` green (all seven Components stories present)
  - `employee-directory` build green after fixing `Button variant="neutral"` → `intent="neutral"` (`d308fad`)
  - **Claim:** Genshi is usable without ds-runtime
- **External ds-runtime (2026-08-01): PARTIAL** — run from external pack (`Downloads/.../DS runtime`), **not** added as a Genshi dependency
  - `resolve gsh-button|gsh-badge|…|gsh-table`: authoritative → `packages/core/src/gsh-*.ts` + `stories/Components/*`
  - `explain gsh-button`: found / structural matches
  - `doctor` / `validate`: FAIL (1076 issues; duplicate normalized IDs — indexer noise from `node_modules`, e.g. Storybook templates)
  - Bare `resolve Button` incorrectly prefers Storybook/`node_modules` over Genshi — use `gsh-*` / `Gsh*` names until DS retrieval config/ignore lands
  - **Claim:** AI can resolve authoritative Genshi components **when queried by Genshi identifiers**; full-repo validate is not green yet
- **Prerelease cut (2026-08-01):** `@genshi/core@0.3.0-next.0`; GitHub prerelease [v0.3.0-next.0](https://github.com/jon4ohio/genshi-design-system/releases/tag/v0.3.0-next.0); publish workflow selects `--tag next` but CI publish failed (`NPM_TOKEN` empty) and registry `@genshi/core|react` owned by unrelated project
- **Release Readiness Review (2026-08-01): GO** — accepted waivers listed under Known limitations in partner brief
- **Anchor orientation (2026-08-01):** Entry / Handoff / AGENTS / `.anchor/`
- **Partner evaluation opened:** [docs/project/partner-evaluation-brief.md](../docs/project/partner-evaluation-brief.md)

## Horizon

1. Collect partner feedback → go/no-go for **0.3 Stable**
2. Secure npm `@genshi` scope (or rename) + `NPM_TOKEN` → publish `@next`
3. Improve ds-runtime scan hygiene against this monorepo (ignore `node_modules`; prefer `gsh-*`)
4. After Stable + adoption evidence: catalog expansion → adapter maturity

## Next

- Share partner brief + Storybook (`npm run storybook`) / git tag with design partners
- Do **not** promote 0.3 Stable, unlock catalog, or deepen Vue/Angular until validation period closes
- Keep catalog locked

## Blocked

- **npm publish:** missing `NPM_TOKEN` in Actions; foreign ownership of `@genshi/core` / `@genshi/react` on registry
- **0.3 Stable / catalog expansion / public adoption push:** gated on partner evaluation period (Phase 6+)
- **ds-runtime doctor/validate green:** gated on retrieval config / ignore of `node_modules` (external to Genshi product boundary)

## Roadmap

- **Release:** `0.3.0-next` (git) → validation period → 0.3 Stable → public adoption → catalog expansion → adapters
- **Focus:** External evaluation evidence
- **Out of scope until gates:** Catalog expansion, Vue/Angular impl, multi-brand theme UI, requiring ds-runtime in-repo

## Branch / PR

- **Branch:** `main` @ latest (includes `0.3.0-next.0` versions + employee-directory intent fix)
- **Release:** [v0.3.0-next.0](https://github.com/jon4ohio/genshi-design-system/releases/tag/v0.3.0-next.0) (prerelease)
- **Also:** `cursor/research-validation-lineage` has unmerged Storybook DX tip (`5cd6bfa`)

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-08-01 | Bare `Button` resolves to Storybook | External ds-runtime | Indexer includes `node_modules` | Query `gsh-*`; later DS ignore config |
| 2026-08-01 | Cannot `npm i @genshi/core@next` | Release | Scope collision + no NPM_TOKEN | Git tag / workspace; fix org ownership |
