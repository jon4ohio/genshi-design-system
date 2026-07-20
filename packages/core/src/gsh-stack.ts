import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { spacing } from './tokens.js';

@customElement('gsh-stack')
export class GshStack extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }
  `;

  @property({ type: String }) direction: 'vertical' | 'horizontal' = 'vertical';
  @property({ type: String }) gap: keyof typeof spacing.gap = 'mid';
  @property({ type: String }) align = '';
  @property({ type: String }) justify = '';

  render() {
    const style = `
      flex-direction: ${this.direction === 'horizontal' ? 'row' : 'column'};
      gap: ${spacing.gap[this.gap]};
      ${this.align ? `align-items: ${this.align};` : ''}
      ${this.justify ? `justify-content: ${this.justify};` : ''}
    `;
    return html`<div style=${style}><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-stack': GshStack;
  }
}
