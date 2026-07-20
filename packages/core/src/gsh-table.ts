import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gsh-table')
export class GshTable extends LitElement {
  static styles = css`
    :host {
      display: block;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--gsh-table-border);
      border-radius: var(--gsh-table-radius);
      overflow: hidden;
      font-family: var(--body-default-regular-font-family);
      font-size: var(--body-default-regular-font-size);
      color: var(--gsh-table-text-color);
    }

    ::slotted(thead) {
      background: var(--gsh-table-header-fill);
    }

    ::slotted(th),
    ::slotted(td) {
      padding: var(--gsh-table-cell-padding);
      text-align: left;
      border-bottom: 1px solid var(--gsh-table-border);
    }

    ::slotted(tr:last-child td) {
      border-bottom: none;
    }
  `;

  @property({ type: String }) caption = '';

  render() {
    return html`
      <table role="table">
        ${this.caption
          ? html`<caption style="padding: var(--gsh-table-cell-padding); text-align: left;">
              ${this.caption}
            </caption>`
          : ''}
        <slot></slot>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-table': GshTable;
  }
}
