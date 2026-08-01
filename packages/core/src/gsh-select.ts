import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

@customElement('gsh-select')
export class GshSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    select {
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      outline: none;
      appearance: auto;
      cursor: pointer;
      color: var(--gsh-select-text-color);
      background: var(--gsh-select-fill-ghost);
      border: var(--gsh-select-border-width) solid var(--gsh-select-border-default);
      border-radius: var(--gsh-select-radius-small);
      height: var(--gsh-select-size-mid);
      padding-inline: var(--gsh-select-padding-x-mid);
      font-family: var(--body-default-regular-font-family);
      font-size: var(--body-default-regular-font-size);
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }

    select:hover:not(:disabled) {
      background: var(--gsh-select-fill-ghost-hover);
      border-color: var(--gsh-select-border-hover);
    }

    select:focus-visible {
      border-color: var(--gsh-select-border-active);
      outline: 2px solid var(--gsh-select-border-active);
      outline-offset: 2px;
    }

    select:disabled {
      cursor: not-allowed;
      border-color: var(--gsh-select-border-disabled);
      color: var(--gsh-select-text-color-disabled);
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: String }) 'aria-label' = '';
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('value')) {
      const select = this.shadowRoot?.querySelector('select');
      if (select && select.value !== this.value) {
        select.value = this.value;
      }
    }
  }

  render() {
    return html`
      <select
        .name=${this.name}
        .value=${this.value}
        aria-label=${this['aria-label'] || undefined}
        ?disabled=${this.disabled}
        @change=${this.handleChange}
      >
        <slot></slot>
      </select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-select': GshSelect;
  }
}
