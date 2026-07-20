import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { focusFirstTabbable, trapFocus } from '@genshi/foundation';

@customElement('gsh-dialog')
export class GshDialog extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: var(--gsh-dialog-overlay);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--gsh-dialog-overlay-padding);
      z-index: 1000;
    }

    .panel {
      background: var(--gsh-dialog-surface);
      border-radius: var(--gsh-dialog-radius);
      padding: var(--gsh-dialog-padding);
      box-shadow: var(--gsh-dialog-shadow);
      max-width: 480px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--gsh-dialog-gap);
    }

    .title {
      margin: 0;
      font-family: var(--heading-medium-strong-font-family);
      font-weight: var(--heading-medium-strong-font-weight);
      font-size: var(--heading-medium-strong-font-size);
      color: var(--gsh-dialog-title-color);
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) label = 'Dialog';

  private releaseFocusTrap: (() => void) | null = null;
  private previouslyFocused: HTMLElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
    this.deactivateFocusTrap();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        this.previouslyFocused = document.activeElement as HTMLElement | null;
        requestAnimationFrame(() => {
          const panel = this.shadowRoot?.querySelector('.panel') as HTMLElement | null;
          if (panel) {
            this.releaseFocusTrap = trapFocus(panel);
            focusFirstTabbable(panel);
          }
        });
      } else {
        this.deactivateFocusTrap();
        this.previouslyFocused?.focus();
        this.previouslyFocused = null;
      }
    }
  }

  private deactivateFocusTrap(): void {
    this.releaseFocusTrap?.();
    this.releaseFocusTrap = null;
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.open = false;
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }
  };

  private handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.open = false;
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }
  }

  render() {
    if (!this.open) return html``;

    return html`
      <div class="overlay" @click=${this.handleOverlayClick}>
        <div
          class="panel"
          role="dialog"
          aria-modal="true"
          aria-label=${this.label}
        >
          <slot name="title">
            <h2 class="title">${this.label}</h2>
          </slot>
          <slot></slot>
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gsh-dialog': GshDialog;
  }
}
