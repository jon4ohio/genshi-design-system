import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { typography, textColor, type TextColor, type TypographyVariant } from './tokens.js';

@customElement('gsh-text')
export class GshText extends LitElement {
  static styles = css`
    :host {
      display: inline;
      margin: 0;
    }
  `;

  @property({ type: String }) variant: TypographyVariant = 'body';
  @property({ type: String }) color: TextColor = 'primary';
  @property({ type: String }) as = 'span';

  render() {
    const prefix = typography[this.variant];
    const style = `
      margin: 0;
      color: ${textColor[this.color]};
      font-family: var(--${prefix}-font-family);
      font-weight: var(--${prefix}-font-weight);
      font-size: var(--${prefix}-font-size);
      letter-spacing: var(--${prefix}-letter-spacing);
      line-height: var(--${prefix}-line-height);
    `;

    switch (this.as) {
      case 'h1':
        return html`<h1 style=${style}><slot></slot></h1>`;
      case 'h2':
        return html`<h2 style=${style}><slot></slot></h2>`;
      case 'h3':
        return html`<h3 style=${style}><slot></slot></h3>`;
      case 'p':
        return html`<p style=${style}><slot></slot></p>`;
      default:
        return html`<span style=${style}><slot></slot></span>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-text': GshText;
  }
}
