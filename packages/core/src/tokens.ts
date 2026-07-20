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

export const buttonTokens = {
  fill: {
    brand: {
      default: 'var(--gsh-button-fill-brand-default)',
      hover: 'var(--gsh-button-fill-brand-hover)',
      pressed: 'var(--gsh-button-fill-brand-pressed)',
    },
    neutral: {
      default: 'var(--gsh-button-fill-neutral-default)',
      hover: 'var(--gsh-button-fill-neutral-hover)',
      pressed: 'var(--gsh-button-fill-neutral-pressed)',
    },
  },
  content: 'var(--gsh-button-content-solid)',
  paddingX: {
    small: 'var(--gsh-button-padding-x-small)',
    mid: 'var(--gsh-button-padding-x-mid)',
    large: 'var(--gsh-button-padding-x-large)',
  },
  paddingY: 'var(--gsh-button-padding-y-mid)',
  radius: 'var(--gsh-button-radius-small)',
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
