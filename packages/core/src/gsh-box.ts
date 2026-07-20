import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { spacing, surface } from './tokens.js';

@customElement('gsh-box')
export class GshBox extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String }) padding: keyof typeof spacing.padding = 'mid';
  @property({ type: String }) radius: keyof typeof spacing.radius = 'small';
  @property({ type: Boolean, reflect: true }) bordered = false;
  @property({ type: String }) as = 'div';

  render() {
    const style = `
      background: ${surface.default};
      padding: ${spacing.padding[this.padding]};
      border-radius: ${spacing.radius[this.radius]};
      ${this.bordered ? 'border: var(--gsh-border-width-default) solid var(--gsh-color-border-muted);' : ''}
    `;

    return this.as === 'section'
      ? html`<section style=${style}><slot></slot></section>`
      : html`<div style=${style}><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-box': GshBox;
  }
}
