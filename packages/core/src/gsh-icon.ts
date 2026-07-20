import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gsh-icon')
export class GshIcon extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      flex-shrink: 0;
      vertical-align: middle;
      line-height: 0;
    }

    svg {
      display: block;
    }
  `;

  @property({ type: String }) label = '';
  @property({ type: Number }) size = 16;

  render() {
    return html`
      <svg
        role="img"
        aria-label=${this.label}
        width=${this.size}
        height=${this.size}
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="6" fill="currentColor" />
        <slot></slot>
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-icon': GshIcon;
  }
}
