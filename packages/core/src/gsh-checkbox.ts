import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
      width: var(--gsh-checkbox-size);
      height: var(--gsh-checkbox-size);
      margin: 0;
      accent-color: var(--gsh-checkbox-fill-checked);
      border: 1px solid var(--gsh-checkbox-border-default);
      border-radius: 2px;
    }

    input:focus-visible {
      outline: 2px solid var(--gsh-checkbox-border-active);
      outline-offset: 2px;
    }

    :host([disabled]) label {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
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

  render() {
    return html`
      <label>
        <input
          type="checkbox"
          .name=${this.name}
          .value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.disabled}
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
