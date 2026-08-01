# @genshi/core

## 0.3.0-next.0

### Minor Changes

- 45f7674: Re-synced the Phase 1/2 exemplary component catalog (Button, Badge, Input, Checkbox, Select, Dialog, Table) against the real SeamKit Figma source (`SeamKit.UI --- Platform`), fixing several fidelity gaps and one governance bug.

  **Breaking changes:**

  - `gsh-button`: `variant` now models Figma's real style axis (`solid | faded | bare | outline | ghost`, default `solid`) instead of color. Color semantics moved to a new `intent` property (`brand | critical | neutral | positive | inverse`, default `brand`). A new `shape` property (`boxed | rounded`) was also added. `size` gained an `xsmall` option.
  - `gsh-badge`: same split — `variant` now means visual treatment (`solid | faded | outline | bare | ghost`), color semantics moved to a new `intent` property (13 options matching the generated Component tokens). `size` is now `small | large`.

  **Fixes:**

  - `gsh-badge` and its `badgeTokens` helper were referencing Intent-tier tokens (`--gsh-color-*`) directly from component CSS, bypassing the Component→Intent resolution chain (ADR-0002/ADR-0009 Invariant B). Now resolves exclusively through the existing `--gsh-badge-*` Component tokens.
  - `gsh-dialog` was using hardcoded `rgba(...)` placeholder values instead of the real vendor-sourced `--gsh-modal-*` tokens for surface, border, radius, padding, and sizing.
  - `gsh-input`: added missing hover and error/invalid states (tokens existed but were never aliased); fixed a wrong border-radius on the `large` size.
  - `gsh-checkbox`: added hover/focus-visible/disabled/invalid states with corrected color values (previously borrowed mismatched Input/Button tokens).
  - `gsh-select`: corrected border-radius (was aliasing Input's 4px; Figma's Dropdown button uses 8px) and added missing hover/disabled states.
  - `gsh-table`: corrected border color, header fill, and cell padding to match measured Figma values.

  **Known gaps (not fixed, documented for follow-up):**

  - `gsh-button` has no vendor-sourced token for a `warning` intent or a focus-ring state.
  - `gsh-input` has no vendor-sourced disabled-state tokens (approximated with `opacity`).
  - `gsh-select` has no chevron/caret icon (blocked on `packages/icons` still being a stub).
  - `gsh-table`'s richer cell types (status pill, badge, trend indicator, actions) are not modeled as they'd require new components, which are out of scope while the catalog is locked pre-prerelease.
  - An orphaned, unused `input-control` vendor token family was found alongside the actually-used `form-input` family — flagged for a future cleanup/consolidation decision, not touched here.

## 0.2.0

### Minor Changes

- Initial public release scaffold — layered token architecture, Lit core, React adapters, Storybook, and employee directory example.
- Phase 2 governance lock: Accepted ADRs, Intent terminology, validation scripts, Select/Checkbox/Dialog/Table components.

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @genshi/foundation@0.2.0
