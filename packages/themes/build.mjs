import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

fs.mkdirSync(distDir, { recursive: true });

const componentTokens = `
  /* Select component tokens */
  --gsh-select-fill-ghost: var(--gsh-input-fill-ghost);
  --gsh-select-border-default: var(--gsh-input-border-default);
  --gsh-select-border-active: var(--gsh-input-border-active);
  --gsh-select-size-mid: var(--gsh-input-size-mid);
  --gsh-select-padding-x-mid: var(--gsh-input-padding-x-mid);
  --gsh-select-border-width: var(--gsh-input-border-width);
  --gsh-select-radius-small: var(--gsh-input-radius-small);
  --gsh-select-text-color: var(--gsh-color-text-primary);

  /* Checkbox component tokens */
  --gsh-checkbox-size: 16px;
  --gsh-checkbox-border-default: var(--gsh-input-border-default);
  --gsh-checkbox-border-active: var(--gsh-input-border-active);
  --gsh-checkbox-fill-checked: var(--gsh-button-fill-brand-default);
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
  --gsh-table-border: var(--gsh-color-border-muted);
  --gsh-table-header-fill: var(--gsh-color-surface-neutral-light);
  --gsh-table-cell-padding: var(--gsh-space-padding-mid);
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
