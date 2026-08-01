# Handoff

**Contract:** Handoff  
**Problem coordinated:** What changed recently? What's next?  
**Updated:** 2026-08-01

---

## Delta

- **Post-ADR-007 P0 complete → STOP (2026-08-01):** Orientation checkpoint already on `main`; mutation topology recorded (shared Cursor/Claude tree — manual exclusivity only); pull was already up to date; re-orient refreshed Entry/Handoff. Anchor P1 contract bugs fixed in Anchor repo. **Stop engineering. Start learning** — partner observation with live attribution table in [partner-evaluation-brief.md](../docs/project/partner-evaluation-brief.md).
- **Post-pull re-orient (2026-08-01):** `main` already current with `origin/main` (Phase 2.1 / ADR-0009 present). Refreshed Entry ownership map (partner brief; AGENTS.md as interim host dispatch, not orientation output). Mutation topology recorded below.
- **Mutation topology (2026-08-01):** This working tree has been mutated by multiple AI hosts (Cursor and Claude both ran `orientation@1` in the same short window earlier; Claude Code still has cwd here alongside Cursor). **Interim operational policy (manual only):** Only one operator may perform mutating operations against this shared checkout at a time. No lock mechanism exists yet; enforcement is deferred until concurrency work (if ever). Do not assume runtime protection.
- **AI Consumption Validation (2026-08-01): PASS (bare-name + duplicate-ID bar)**
  - **ds-runtime fix** (canonical repo `/Users/mac/Development/demo-workspace/design-system-runtime` @ `b60c6e1`): `walkFiles` skips `node_modules`, `.git`, `dist`, `build`, `storybook-static`, `coverage`; implementation ranking prefers `packages/`; regression fixture `node-modules-pollution-ds` + tests.
  - **Evidence against Genshi root:**
    - `resolve Button|Badge|Input|Checkbox|Select|Dialog|Table` → primary `packages/react/src/index.tsx` (not `node_modules`)
    - `explain Button` → found
    - `validate`: `duplicate-identifier` **blocking count = 0**; `passed=false` solely from **4 non-blocking** `unresolved-story-reference` on docs stories (`Foundations/Overview`, `Governance`, `Wrappers`, `Tokens/Layers`) — not components; not Storybook-template noise
    - `doctor`: `issueCount=8` (same 4 refs mirrored as error+warning); prior flood was ~1076
  - **Tool-install evidence:** fresh pack `ds-runtime-1.0.0.tgz` (sha256 `6ca3fc2e6079cf41b71c0bd7cc67ca6d96c137bc633051a4fda37f2ca556d972`) at `/Users/mac/Development/demo-workspace/design-system-runtime/ds-runtime-1.0.0.tgz` (also copied to `/Users/mac/Downloads/Projects/Code & Tools/DS runtime/ds-runtime-1.0.0.tgz`); temp `npm install` + `resolve Button` → `packages/react/src/index.tsx`
  - Storybook attaches as **stories**, not competing implementations; authority for bare names = what source-reader indexes + `packages/` preference
- **Product Validation — Reference Pipeline (2026-08-01): PASS (in-product)** — recreate/validate/build/tests/Storybook/employee-directory (`intent` fix `d308fad`)
- **Prerelease:** [v0.3.0-next.0](https://github.com/jon4ohio/genshi-design-system/releases/tag/v0.3.0-next.0); npm `@next` still blocked (foreign `@genshi` scope + empty `NPM_TOKEN`)
- **Release Readiness Review GO**; Anchor scaffolding on `main`
- **Partner evaluation opened:** [docs/project/partner-evaluation-brief.md](../docs/project/partner-evaluation-brief.md)

## Horizon

1. Collect partner feedback (git clone path) → go/no-go for **0.3 Stable**
2. Secure npm `@genshi` scope (or rename) + `NPM_TOKEN` → publish `@next` / test install-as-dependency
3. Optionally clear non-blocking docs-story unresolved refs in ds-runtime or story titles (not a Genshi catalog unlock)
4. After Stable + adoption evidence: catalog expansion → adapter maturity

## Next

- Share partner brief + Storybook / git tag `v0.3.0-next.0` with design partners
- Do **not** promote 0.3 Stable, unlock catalog, or deepen Vue/Angular until validation period closes
- Keep catalog locked

## Blocked

- **npm publish / install-as-dependency:** missing `NPM_TOKEN`; foreign ownership of `@genshi/core` / `@genshi/react` on registry
- **Partner eval scope gap (explicit):** Partner eval validates API/DX from a **clone**; **installation-as-a-dependency remains untested** pending npm scope / `NPM_TOKEN`
- **0.3 Stable / catalog expansion:** gated on partner evaluation period

## ds-runtime paths (locked)

| Role | Path |
|------|------|
| Canonical **dev** repo | `/Users/mac/Development/demo-workspace/design-system-runtime` |
| Release **artifact** (tool pack) | `/Users/mac/Development/demo-workspace/design-system-runtime/ds-runtime-1.0.0.tgz` (mirrored under Downloads `.../DS runtime/`) |

**Supported root** = design-system **source repo** (see ds-runtime README); not an app install tree. Genshi does **not** depend on `ds-runtime` in-repo.

## Roadmap

- **Release:** `0.3.0-next` (git) → partner evidence → 0.3 Stable → public adoption → catalog expansion → adapters
- **Focus:** Market / partner evidence; npm when unblocked
- **Out of scope until gates:** Catalog expansion, Vue/Angular impl, multi-brand theme UI, requiring ds-runtime in-repo

## Branch / PR

- **Genshi:** `main` @ latest (`0.3.0-next.0` + validation docs)
- **ds-runtime:** `cursor/ev-02-authority-determination` @ `b60c6e1` (indexer fix; push when ready)
- **Release:** [v0.3.0-next.0](https://github.com/jon4ohio/genshi-design-system/releases/tag/v0.3.0-next.0)

## Friction Log

| Date | Repeated explanation | Contract | Root cause | Action |
|------|---------------------|----------|------------|--------|
| 2026-08-01 | Bare `Button` → Storybook | AI Consumption | Indexer walked `node_modules`/`dist` | Skip dirs + prefer `packages/`; regression test |
| 2026-08-01 | Cannot `npm i @genshi/core@next` | Release | Scope collision + no NPM_TOKEN | Git tag / workspace; fix org ownership |
