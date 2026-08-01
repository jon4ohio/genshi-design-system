import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

fs.mkdirSync(distDir, { recursive: true });

const componentTokens = `
  /* Select component tokens */
  /* Figma "Dropdown button" (3311:13722) reuses the Button ghost/neutral
     treatment plus a trailing chevron, not the plain Input field styling —
     alias the vendor-sourced --gsh-btn-* ghost/neutral chain (already an
     exact hex match to the SeamKit dropdown spec) instead of Input's tokens. */
  --gsh-select-fill-ghost: var(--gsh-btn-color-fill-ghost-neutral-default);
  --gsh-select-fill-ghost-hover: var(--gsh-btn-color-fill-ghost-neutral-hover);
  --gsh-select-border-default: var(--gsh-btn-color-border-ghost-neutral-default);
  --gsh-select-border-hover: var(--gsh-btn-color-border-ghost-neutral-hover);
  /* Select renders a real native form control (unlike the Button-styled
     Figma mock), so keep the stronger Input-style active/focus border for
     accessible contrast rather than the pale button hover border. */
  --gsh-select-border-active: var(--gsh-input-border-active);
  --gsh-select-border-disabled: var(--gsh-btn-color-border-ghost-disabled);
  --gsh-select-size-mid: var(--gsh-btn-sizing-size-y-mid);
  --gsh-select-padding-x-mid: var(--gsh-btn-spacing-padding-x-mid);
  --gsh-select-border-width: var(--gsh-btn-sizing-border-default);
  /* "M (base)" size in Figma uses the default 8px radius, not 4px. */
  --gsh-select-radius-small: var(--gsh-btn-sizing-radius-large);
  --gsh-select-text-color: var(--gsh-btn-color-content-ghost-neutral);
  --gsh-select-text-color-disabled: var(--gsh-color-interaction-disabled-strong);

  /* Checkbox component tokens */
  --gsh-checkbox-size: 16px;
  --gsh-checkbox-radius: var(--gsh-radius-small);
  --gsh-checkbox-border-width: var(--gsh-sizing-border-200);
  --gsh-checkbox-border-default: var(--gsh-color-interaction-neutral-faded-subtle);
  --gsh-checkbox-border-hover: var(--gsh-color-interaction-neutral-faded-strong);
  --gsh-checkbox-border-active: var(--gsh-color-interaction-neutral-faded-strong);
  --gsh-checkbox-border-disabled: var(--gsh-color-interaction-disabled-strong);
  --gsh-checkbox-border-invalid: var(--gsh-color-interaction-critical-solid-weakest);
  --gsh-checkbox-fill-checked: var(--gsh-color-interaction-brand-solid-weak);
  --gsh-checkbox-fill-checked-hover: var(--gsh-color-interaction-brand-solid-subtle);
  --gsh-checkbox-fill-disabled: var(--gsh-color-interaction-disabled-strong);
  --gsh-checkbox-icon-color: var(--gsh-color-icon-default-inverted-primary);
  --gsh-checkbox-focus-ring: 0 0 0 1px #ffffff, 0 0 0 4px #9747ff;
  --gsh-checkbox-label-gap: var(--gsh-space-gap-small);
  --gsh-checkbox-text-color: var(--gsh-color-text-primary);

  /* Dialog component tokens */
  /* surface/border/radius/padding/sizing sourced from the real vendor gsh-modal-* family
     (tokens/vendor/seamkit/component.json sfe.modal -> tokens/source/genshi/component.json gsh.modal),
     per Figma "Dialog" component set (fileKey 1mpwO1oRCJG6tOrXIZpr5w, nodeId 2001:17412) */
  --gsh-dialog-surface: var(--gsh-modal-color-fill-dialog);
  --gsh-dialog-border: var(--gsh-modal-color-border-dialog);
  --gsh-dialog-border-width: var(--gsh-modal-sizing-border-default);
  --gsh-dialog-radius: var(--gsh-sizing-radius-large);
  --gsh-dialog-padding: var(--gsh-modal-spacing-padding-x-large);
  --gsh-dialog-gap: var(--gsh-modal-spacing-padding-x-large);
  --gsh-dialog-max-width: var(--gsh-modal-sizing-size-x-small);
  --gsh-dialog-title-color: var(--gsh-color-text-primary);
  /* No vendor gsh-modal-* equivalent exists for the backdrop scrim, elevation shadow, or the
     viewport-edge overlay padding — the Figma Dialog node only specifies the panel itself, not
     its presentation wrapper. These remain hand-authored Genshi values. */
  --gsh-dialog-overlay: rgba(15, 23, 42, 0.45);
  --gsh-dialog-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
  --gsh-dialog-overlay-padding: var(--gsh-space-padding-large);

  /* Table component tokens */
  --gsh-table-border: var(--gsh-color-border-neutral-surface);
  --gsh-table-header-fill: var(--gsh-color-fill-neutral-subtle);
  --gsh-table-cell-padding: var(--gsh-space-padding-mid) var(--gsh-space-padding-small);
  --gsh-table-radius: var(--gsh-radius-small);
  --gsh-table-text-color: var(--gsh-color-text-primary);
`;

const css = `/**
 * Genshi default theme — resolves component tokens for web.
 * Import @genshi/tokens/css before this file.
 */
:root {
  color-scheme: light;
  font-family: var(--body-default-regular-font-family, system-ui, sans-serif);
${componentTokens}
}
`;

fs.writeFileSync(path.join(distDir, 'seamkit-default.css'), css);
console.log('Built', path.join(distDir, 'seamkit-default.css'));
