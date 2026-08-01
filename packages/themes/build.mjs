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
  --gsh-dialog-surface: var(--gsh-color-surface-default);
  --gsh-dialog-overlay: rgba(15, 23, 42, 0.45);
  --gsh-dialog-radius: var(--gsh-radius-default);
  --gsh-dialog-padding: var(--gsh-space-padding-large);
  --gsh-dialog-gap: var(--gsh-space-gap-mid);
  --gsh-dialog-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
  --gsh-dialog-title-color: var(--gsh-color-text-primary);
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
