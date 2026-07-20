import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { badgeTokens } from './tokens.js';

@customElement('gsh-badge')
export class GshBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding-inline: var(--gsh-space-padding-small);
      padding-block: var(--gsh-space-padding-small);
      border-radius: var(--gsh-radius-small);
      font-family: var(--label-default-regular-font-family);
      font-weight: var(--label-default-regular-font-weight);
      font-size: var(--label-default-regular-font-size);
      letter-spacing: var(--label-default-regular-letter-spacing);
      line-height: 1.2;
    }

    :host([variant='brand']) span {
      background: var(--gsh-color-surface-neutral-light);
      color: var(--gsh-color-text-brand);
    }

    :host([variant='neutral']) span {
      background: var(--gsh-color-surface-default);
      color: var(--gsh-color-text-primary);
    }
  `;

  @property({ type: String, reflect: true }) variant: 'brand' | 'neutral' = 'neutral';

  render() {
    return html`<span><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-badge': GshBadge;
  }
}

void badgeTokens;
