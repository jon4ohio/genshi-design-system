/** Component token references for @genshi/core (CSS custom properties only). */

export const typography = {
  pageTitle: 'heading-large-strong',
  sectionTitle: 'heading-medium-strong',
  subtitle: 'subtitle-default-regular',
  body: 'body-default-regular',
  bodyStrong: 'body-default-strong',
  label: 'label-default-regular',
  labelStrong: 'label-default-strong',
  caption: 'caption-default-text',
} as const;

export type TypographyVariant = keyof typeof typography;

export const textColor = {
  primary: 'var(--gsh-color-text-primary)',
  muted: 'var(--gsh-color-text-muted)',
  brand: 'var(--gsh-color-text-brand)',
  inverse: 'var(--gsh-color-text-inverse)',
} as const;

export type TextColor = keyof typeof textColor;

export const surface = {
  default: 'var(--gsh-color-surface-default)',
  neutralLight: 'var(--gsh-color-surface-neutral-light)',
} as const;

export const spacing = {
  gap: {
    small: 'var(--gsh-space-gap-small)',
    mid: 'var(--gsh-space-gap-mid)',
    large: 'var(--gsh-space-gap-large)',
  },
  padding: {
    small: 'var(--gsh-space-padding-small)',
    mid: 'var(--gsh-space-padding-mid)',
    default: 'var(--gsh-space-padding-default)',
    large: 'var(--gsh-space-padding-large)',
  },
  radius: {
    small: 'var(--gsh-radius-small)',
    default: 'var(--gsh-radius-default)',
  },
} as const;

/**
 * Documentary reference for gsh-button's Component-tier token surface.
 * Synced against Figma "Button" (node 3034:34227): variant = Solid/Faded/
 * Bare/Outline/Ghost, intent = Brand/Critical/Neutral/Positive/Inverse
 * (Figma's "Warning" intent has no generated tokens — see gsh-button.ts doc
 * comment), size = Large/Mid/Small/Xsmall, shape = Boxed/Rounded.
 * Full canonical `--gsh-btn-*` set lives in tokens/generated/css/tokens.css;
 * this samples one representative axis (solid/brand) plus the shared
 * sizing/shape tokens used across every variant+intent combination.
 */
export const buttonTokens = {
  fill: {
    solidBrand: {
      default: 'var(--gsh-btn-color-fill-solid-brand-default)',
      hover: 'var(--gsh-btn-color-fill-solid-brand-hover)',
      pressed: 'var(--gsh-btn-color-fill-solid-brand-pressed)',
    },
  },
  content: {
    solidDefault: 'var(--gsh-btn-color-content-solid-default)',
    solidInverse: 'var(--gsh-btn-color-content-solid-inverse)',
  },
  sizeY: {
    large: 'var(--gsh-btn-sizing-size-y-large)',
    mid: 'var(--gsh-btn-sizing-size-y-mid)',
    small: 'var(--gsh-btn-sizing-size-y-small)',
    xsmall: 'var(--gsh-btn-sizing-size-y-xsmall)',
  },
  paddingX: {
    small: 'var(--gsh-btn-spacing-padding-x-small)',
    mid: 'var(--gsh-btn-spacing-padding-x-mid)',
    large: 'var(--gsh-btn-spacing-padding-x-large)',
    xsmall: 'var(--gsh-btn-spacing-padding-x-xsmall)',
  },
  gap: 'var(--gsh-btn-spacing-gap-large)',
  borderWidth: 'var(--gsh-btn-sizing-border-default)',
  radius: {
    boxedLarge: 'var(--gsh-btn-sizing-radius-large)',
    boxedSmall: 'var(--gsh-btn-sizing-radius-small)',
    rounded: 'var(--gsh-btn-sizing-radius-round)',
  },
} as const;

export const inputTokens = {
  fill: 'var(--gsh-input-fill-ghost)',
  border: {
    default: 'var(--gsh-input-border-default)',
    active: 'var(--gsh-input-border-active)',
  },
  size: {
    small: 'var(--gsh-input-size-small)',
    mid: 'var(--gsh-input-size-mid)',
    large: 'var(--gsh-input-size-large)',
  },
  paddingX: {
    small: 'var(--gsh-input-padding-x-small)',
    mid: 'var(--gsh-input-padding-x-mid)',
    large: 'var(--gsh-input-padding-x-large)',
  },
  borderWidth: 'var(--gsh-input-border-width)',
  radius: 'var(--gsh-input-radius-small)',
} as const;

export const badgeTokens = {
  fill: {
    brand: 'var(--gsh-color-surface-neutral-light)',
    neutral: 'var(--gsh-color-surface-default)',
  },
  text: {
    brand: 'var(--gsh-color-text-brand)',
    neutral: 'var(--gsh-color-text-primary)',
  },
  paddingX: 'var(--gsh-space-padding-small)',
  paddingY: 'var(--gsh-space-padding-small)',
  radius: 'var(--gsh-radius-small)',
} as const;

export function typographyCss(prefix: string, includeLineHeight = true): string {
  const parts = [
    `font-family: var(--${prefix}-font-family)`,
    `font-weight: var(--${prefix}-font-weight)`,
    `font-size: var(--${prefix}-font-size)`,
    `letter-spacing: var(--${prefix}-letter-spacing)`,
  ];
  if (includeLineHeight) {
    parts.push(`line-height: var(--${prefix}-line-height)`);
  }
  return parts.join('; ');
}
