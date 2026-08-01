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

/**
 * Badge intents mirror the SeamKit "badge" component-set's `intent` variant
 * property (Figma fileKey 1mpwO1oRCJG6tOrXIZpr5w, node 5568:58532). Each
 * intent maps to a color-key suffix used by the generated `--gsh-badge-color-*`
 * component tokens (tokens/source/genshi/component.json → `gsh.badge`).
 */
export const badgeIntents = [
  'neutral',
  'info',
  'positive',
  'critical',
  'warning',
  'raspberry',
  'magenta',
  'purple',
  'grape',
  'violet',
  'cyan',
  'teal',
  'aquamarine',
] as const;

export type BadgeIntent = (typeof badgeIntents)[number];

export const badgeVariants = ['solid', 'faded', 'outline', 'bare', 'ghost'] as const;

export type BadgeVariant = (typeof badgeVariants)[number];

export const badgeSizes = ['small', 'large'] as const;

export type BadgeSize = (typeof badgeSizes)[number];

/** Genshi intent name -> generated component-token color-key suffix. */
const badgeColorKey: Record<BadgeIntent, string> = {
  neutral: 'grey',
  info: 'blue',
  positive: 'green',
  critical: 'red',
  warning: 'orange',
  raspberry: 'raspberry',
  magenta: 'magenta',
  purple: 'purple',
  grape: 'grape',
  violet: 'violet',
  cyan: 'cyan',
  teal: 'teal',
  aquamarine: 'aquamarine',
} as const;

/**
 * Component-tier `--gsh-badge-*` token references only (never Intent/Core
 * tokens directly — ADR-0002 / ADR-0009 Invariant B). `fill`/`content`/`border`
 * resolve the generated variant x intent matrix; variants without a per-color
 * fill/border (bare, outline) fall back to their shared "default" token.
 */
export const badgeTokens = {
  colorKey: badgeColorKey,
  fill(variant: BadgeVariant, intent: BadgeIntent): string {
    const key = variant === 'bare' || variant === 'outline' ? 'default' : badgeColorKey[intent];
    return `var(--gsh-badge-color-fill-${variant}-${key})`;
  },
  content(variant: BadgeVariant, intent: BadgeIntent): string {
    const key = variant === 'solid' ? 'default' : badgeColorKey[intent];
    return `var(--gsh-badge-color-content-${variant}-${key})`;
  },
  border(variant: BadgeVariant, intent: BadgeIntent): string {
    const key = variant === 'bare' ? 'default' : badgeColorKey[intent];
    return `var(--gsh-badge-color-border-${variant}-${key})`;
  },
  size: {
    small: 'var(--gsh-badge-sizing-size-small)',
    large: 'var(--gsh-badge-sizing-size-large)',
  },
  borderWidth: 'var(--gsh-badge-sizing-border-default)',
  radius: 'var(--gsh-badge-sizing-radius-default)',
  gap: {
    small: 'var(--gsh-badge-spacing-gap-small)',
    large: 'var(--gsh-badge-spacing-gap-mid)',
  },
  paddingX: {
    small: 'var(--gsh-badge-spacing-padding-x-xsmall)',
    large: 'var(--gsh-badge-spacing-padding-x-small)',
  },
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
