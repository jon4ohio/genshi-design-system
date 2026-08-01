import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  badgeTokens,
  type BadgeIntent,
  type BadgeSize,
  type BadgeVariant,
} from './tokens.js';

/**
 * gsh-badge — synced against SeamKit.UI's "badge" component set
 * (Figma fileKey 1mpwO1oRCJG6tOrXIZpr5w, node 5568:58532).
 *
 * Properties mirror the real Figma variant matrix: `intent` (color
 * semantics), `variant` (visual treatment), `size`, plus optional
 * `icon-left`/`icon-right` slots and the default slot for the label.
 * Colors/spacing/radius resolve exclusively through Component-tier
 * `--gsh-badge-*` tokens (see tokens.ts) — never Intent/Core tokens directly.
 */
@customElement('gsh-badge')
export class GshBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    span {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border-style: solid;
      font-family: var(--label-default-regular-font-family);
      font-weight: var(--label-default-regular-font-weight);
      letter-spacing: var(--label-default-regular-letter-spacing);
      line-height: 1.2;
    }

    ::slotted(*) {
      flex-shrink: 0;
    }
  `;

  /** Color semantics — SeamKit "intent" variant property. */
  @property({ type: String, reflect: true }) intent: BadgeIntent = 'neutral';

  /** Visual treatment — SeamKit "variant" variant property. */
  @property({ type: String, reflect: true }) variant: BadgeVariant = 'solid';

  /** SeamKit "Size" variant property. */
  @property({ type: String, reflect: true }) size: BadgeSize = 'large';

  render() {
    const hasBorder =
      this.variant === 'outline' || this.variant === 'bare' || this.variant === 'ghost';

    const style = `
      background: ${badgeTokens.fill(this.variant, this.intent)};
      color: ${badgeTokens.content(this.variant, this.intent)};
      border-color: ${hasBorder ? badgeTokens.border(this.variant, this.intent) : 'transparent'};
      border-width: ${hasBorder ? badgeTokens.borderWidth : '0'};
      border-radius: ${badgeTokens.radius};
      height: ${badgeTokens.size[this.size]};
      min-width: ${badgeTokens.size[this.size]};
      gap: ${badgeTokens.gap[this.size]};
      padding-inline: ${badgeTokens.paddingX[this.size]};
      font-size: var(--${this.size === 'small' ? 'caption-default-text' : 'label-default-regular'}-font-size);
    `;

    return html`
      <span style=${style}>
        <slot name="icon-left"></slot>
        <slot></slot>
        <slot name="icon-right"></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-badge': GshBadge;
  }
}
