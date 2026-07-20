import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { inputTokens, textColor } from './tokens.js';

@customElement('gsh-input')
export class GshInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    input {
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      outline: none;
      line-height: 1.2;
      color: var(--gsh-color-text-primary);
      background: var(--gsh-input-fill-ghost);
      border: var(--gsh-input-border-width) solid var(--gsh-input-border-default);
      border-radius: var(--gsh-input-radius-small);
      font-family: var(--body-default-regular-font-family);
      font-weight: var(--body-default-regular-font-weight);
      font-size: var(--body-default-regular-font-size);
      letter-spacing: var(--body-default-regular-letter-spacing);
    }

    input:focus {
      border-color: var(--gsh-input-border-active);
    }

    :host([size='small']) input {
      height: var(--gsh-input-size-small);
      padding-inline: var(--gsh-input-padding-x-small);
    }
    :host([size='mid']) input {
      height: var(--gsh-input-size-mid);
      padding-inline: var(--gsh-input-padding-x-mid);
    }
    :host([size='large']) input {
      height: var(--gsh-input-size-large);
      padding-inline: var(--gsh-input-padding-x-large);
    }
  `;

  @property({ type: String, reflect: true }) size: 'small' | 'mid' | 'large' = 'mid';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) type = 'text';
  @property({ type: String }) name = '';
  @property({ type: String }) 'aria-label' = '';

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('value')) {
      const input = this.shadowRoot?.querySelector('input');
      if (input && input.value !== this.value) {
        input.value = this.value;
      }
    }
  }

  render() {
    return html`
      <input
        .type=${this.type}
        .name=${this.name}
        .value=${this.value}
        .placeholder=${this.placeholder}
        aria-label=${this['aria-label'] || undefined}
        @input=${this.handleInput}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-input': GshInput;
  }
}

void textColor;
void inputTokens;
