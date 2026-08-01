import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

@customElement('gsh-checkbox')
export class GshCheckbox extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    label {
      display: inline-flex;
      align-items: center;
      gap: var(--gsh-checkbox-label-gap);
      cursor: pointer;
      color: var(--gsh-checkbox-text-color);
      font-family: var(--body-default-regular-font-family);
      font-size: var(--body-default-regular-font-size);
    }

    input {
      box-sizing: border-box;
      width: var(--gsh-checkbox-size);
      height: var(--gsh-checkbox-size);
      margin: 0;
      accent-color: var(--gsh-checkbox-fill-checked);
      border: var(--gsh-checkbox-border-width) solid var(--gsh-checkbox-border-default);
      border-radius: var(--gsh-checkbox-radius);
    }

    input:hover:not(:disabled) {
      border-color: var(--gsh-checkbox-border-hover);
    }

    input:checked:hover:not(:disabled),
    input:indeterminate:hover:not(:disabled) {
      accent-color: var(--gsh-checkbox-fill-checked-hover);
    }

    input:focus-visible {
      border-color: var(--gsh-checkbox-border-active);
      outline: none;
      box-shadow: var(--gsh-checkbox-focus-ring);
    }

    input:disabled {
      border-color: var(--gsh-checkbox-border-disabled);
      accent-color: var(--gsh-checkbox-fill-disabled);
      cursor: not-allowed;
    }

    :host([invalid]) input {
      border-color: var(--gsh-checkbox-border-invalid);
    }

    :host([disabled]) label {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) invalid = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) name = '';
  @property({ type: String }) value = 'on';

  private handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('indeterminate')) {
      const input = this.shadowRoot?.querySelector('input');
      if (input) {
        input.indeterminate = this.indeterminate;
      }
    }
  }

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          .name=${this.name}
          .value=${this.value}
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          aria-invalid=${this.invalid || undefined}
          @change=${this.handleChange}
        />
        <slot></slot>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-checkbox': GshCheckbox;
  }
}
