import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonTokens } from './tokens.js';

@customElement('gsh-button')
export class GshButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      box-sizing: border-box;
      margin: 0;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      flex-shrink: 0;
      width: auto;
      min-width: max-content;
      align-self: start;
      color: var(--gsh-button-content-solid);
      border-radius: var(--gsh-button-radius-small);
      padding-block: var(--gsh-button-padding-y-mid);
      font-family: var(--label-default-regular-font-family);
      font-weight: var(--label-default-regular-font-weight);
      font-size: var(--label-default-regular-font-size);
      letter-spacing: var(--label-default-regular-letter-spacing);
      line-height: 1.2;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    :host([variant='brand']) button {
      background: var(--gsh-button-fill-brand-default);
    }
    :host([variant='brand']) button:hover:not(:disabled) {
      background: var(--gsh-button-fill-brand-hover);
    }
    :host([variant='brand']) button:active:not(:disabled) {
      background: var(--gsh-button-fill-brand-pressed);
    }

    :host([variant='neutral']) button {
      background: var(--gsh-button-fill-neutral-default);
    }
    :host([variant='neutral']) button:hover:not(:disabled) {
      background: var(--gsh-button-fill-neutral-hover);
    }
    :host([variant='neutral']) button:active:not(:disabled) {
      background: var(--gsh-button-fill-neutral-pressed);
    }

    :host([size='small']) button {
      padding-inline: var(--gsh-button-padding-x-small);
    }
    :host([size='mid']) button {
      padding-inline: var(--gsh-button-padding-x-mid);
    }
    :host([size='large']) button {
      padding-inline: var(--gsh-button-padding-x-large);
    }
  `;

  @property({ type: String, reflect: true }) variant: 'brand' | 'neutral' = 'brand';
  @property({ type: String, reflect: true }) size: 'small' | 'mid' | 'large' = 'mid';
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`
      <button type="button" ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-button': GshButton;
  }
}

// silence unused import lint — tokens document component contract
void buttonTokens;
