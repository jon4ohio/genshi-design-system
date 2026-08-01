import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonTokens } from './tokens.js';

/**
 * gsh-button
 *
 * Synced against Figma "Button" (COMPONENT_SET, node 3034:34227, fileKey
 * 1mpwO1oRCJG6tOrXIZpr5w, page "↳ Buttons"). This is a deep-dive follow-up to
 * the first sync pass — see below for `link`/`warning`/`Focused` specifics.
 *
 * Figma variant axes → component properties:
 *   - Variant (Solid/Faded/Bare/Outline/Ghost/Link) → `variant`
 *     `link` is a Figma-only-for-Brand treatment: underlined text, no
 *     fill/border/padding-box (see `content-link-*` tokens + CSS below).
 *   - Intent  (Brand/Critical/Neutral/Inverse/Positive/Warning) → `intent`
 *     Warning is now backed by real `--gsh-btn-color-*-warning-*` tokens
 *     (tokens/vendor/seamkit/component.json `sfe.btn.color.*.warning`,
 *     sourced from the previously-unwired `sfe.color.interaction.warning.*`
 *     / `sfe.color.text.warning.*` Intent-layer scale — a genuine orange
 *     ramp, `color.orange.*`). NOTE: the "Warning" instances in the Figma
 *     file itself are bound to the *Positive* (green) variables — a
 *     confirmed Figma-side authoring bug (verified via get_variable_defs on
 *     multiple Warning nodes across all 5 box-model variants, and visually
 *     via screenshot: Warning renders green in Figma today). We did not
 *     propagate that bug; we wired Warning to the real, already-existing
 *     warning color scale in the Intent layer instead, matching the
 *     Critical/Positive reference pattern.
 *   - Size (L/M(base)/S/XS) → `size` ('large'|'mid'|'small'|'xsmall')
 *     `link` only exists for Intent=Brand in Figma but spans all 4 sizes.
 *   - Style (Boxed/Rounded) → `shape` ('boxed'|'rounded')
 *     Out of scope for this pass: only Boxed data was pulled for the new
 *     link/warning/Focused additions (Rounded already worked for the
 *     pre-existing variants/intents from the first pass).
 *   - State (Default/Hover/Pressed/Disabled/Focused) → CSS pseudo-classes.
 *     NOTE: Figma defines a "Focused" state with a real, visually-confirmed
 *     two-layer ring effect (colored outer + white inner separator),
 *     uniform across every variant/intent/Style combo checked (including
 *     the new Link and Warning). However `get_variable_defs` shows this
 *     effect is an unbound literal ("focus ring": DROP_SHADOW #9747FF +
 *     DROP_SHADOW #FFFFFF) — not a bound `sfe/...` variable — and #9747FF
 *     matches Figma's own UI accent for component/instance boundaries, not
 *     a value traceable to any primitive in tokens/vendor/seamkit. Per
 *     ADR-0002/ADR-0009 (Component → Intent → Core only, never a raw
 *     literal skipping Intent), we do not encode it as a token: doing so
 *     would also break with precedent (component.json has zero raw-hex
 *     leaves; only primitive.json/Core does). No focus-ring color is
 *     fabricated here; the native focus outline is left intact as a
 *     baseline a11y fallback — the same call the first pass made, now
 *     re-verified with hard evidence rather than assumed.
 */
@customElement('gsh-button')
export class GshButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    button {
      box-sizing: border-box;
      margin: 0;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--gsh-btn-spacing-gap-large);
      white-space: nowrap;
      flex-shrink: 0;
      width: auto;
      min-width: max-content;
      align-self: start;
      border-style: solid;
      border-width: var(--gsh-btn-sizing-border-default);
      font-family: var(--label-default-regular-font-family);
      font-weight: var(--label-default-regular-font-weight);
      font-size: var(--label-default-regular-font-size);
      letter-spacing: var(--label-default-regular-letter-spacing);
      line-height: 1.2;
    }

    button:disabled {
      cursor: not-allowed;
    }

    /* Size → height + horizontal padding (Figma uses a fixed row height,
       not vertical padding, so content is centered via flex align-items). */
    :host([size='large']) button {
      height: var(--gsh-btn-sizing-size-y-large);
      padding-inline: var(--gsh-btn-spacing-padding-x-large);
    }
    :host([size='mid']) button {
      height: var(--gsh-btn-sizing-size-y-mid);
      padding-inline: var(--gsh-btn-spacing-padding-x-mid);
    }
    :host([size='small']) button {
      height: var(--gsh-btn-sizing-size-y-small);
      padding-inline: var(--gsh-btn-spacing-padding-x-small);
    }
    :host([size='xsmall']) button {
      height: var(--gsh-btn-sizing-size-y-xsmall);
      padding-inline: var(--gsh-btn-spacing-padding-x-xsmall);
    }

    /* Shape: "Boxed" radius scales with size; "Rounded" is a pill at every size. */
    :host([shape='boxed'][size='large']) button,
    :host([shape='boxed'][size='mid']) button {
      border-radius: var(--gsh-btn-sizing-radius-large);
    }
    :host([shape='boxed'][size='small']) button,
    :host([shape='boxed'][size='xsmall']) button {
      border-radius: var(--gsh-btn-sizing-radius-small);
    }
    :host([shape='rounded']) button {
      border-radius: var(--gsh-btn-sizing-radius-round);
    }

    /* ---------- Variant = Solid ---------- */
    /* Text is a single shared "inverted" tone for brand/critical/neutral/positive,
       and flips for intent=inverse — matches gsh.btn.color.content.solid tokens
       (keyed by "default" | "inverse", not by every intent). */
    :host([variant='solid']) button {
      color: var(--gsh-btn-color-content-solid-default);
    }
    :host([variant='solid'][intent='brand']) button {
      background: var(--gsh-btn-color-fill-solid-brand-default);
      border-color: var(--gsh-btn-color-border-solid-brand-default);
    }
    :host([variant='solid'][intent='brand']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-brand-hover);
      border-color: var(--gsh-btn-color-border-solid-brand-hover);
    }
    :host([variant='solid'][intent='brand']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-brand-pressed);
      border-color: var(--gsh-btn-color-border-solid-brand-pressed);
    }
    :host([variant='solid'][intent='critical']) button {
      background: var(--gsh-btn-color-fill-solid-critical-default);
      border-color: var(--gsh-btn-color-border-solid-critical-default);
    }
    :host([variant='solid'][intent='critical']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-critical-hover);
      border-color: var(--gsh-btn-color-border-solid-critical-hover);
    }
    :host([variant='solid'][intent='critical']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-critical-pressed);
      border-color: var(--gsh-btn-color-border-solid-critical-pressed);
    }
    :host([variant='solid'][intent='neutral']) button {
      background: var(--gsh-btn-color-fill-solid-neutral-default);
      border-color: var(--gsh-btn-color-border-solid-neutral-default);
    }
    :host([variant='solid'][intent='neutral']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-neutral-hover);
      border-color: var(--gsh-btn-color-border-solid-neutral-hover);
    }
    :host([variant='solid'][intent='neutral']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-neutral-pressed);
      border-color: var(--gsh-btn-color-border-solid-neutral-pressed);
    }
    :host([variant='solid'][intent='positive']) button {
      background: var(--gsh-btn-color-fill-solid-positive-default);
      border-color: var(--gsh-btn-color-border-solid-positive-default);
    }
    :host([variant='solid'][intent='positive']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-positive-hover);
      border-color: var(--gsh-btn-color-border-solid-positive-hover);
    }
    :host([variant='solid'][intent='positive']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-positive-pressed);
      border-color: var(--gsh-btn-color-border-solid-positive-pressed);
    }
    :host([variant='solid'][intent='warning']) button {
      background: var(--gsh-btn-color-fill-solid-warning-default);
      border-color: var(--gsh-btn-color-border-solid-warning-default);
    }
    :host([variant='solid'][intent='warning']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-warning-hover);
      border-color: var(--gsh-btn-color-border-solid-warning-hover);
    }
    :host([variant='solid'][intent='warning']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-warning-pressed);
      border-color: var(--gsh-btn-color-border-solid-warning-pressed);
    }
    :host([variant='solid'][intent='inverse']) button {
      background: var(--gsh-btn-color-fill-solid-inverse-default);
      border-color: var(--gsh-btn-color-border-solid-inverse-default);
      color: var(--gsh-btn-color-content-solid-inverse);
    }
    :host([variant='solid'][intent='inverse']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-inverse-hover);
      border-color: var(--gsh-btn-color-border-solid-inverse-hover);
    }
    :host([variant='solid'][intent='inverse']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-solid-inverse-pressed);
      border-color: var(--gsh-btn-color-border-solid-inverse-pressed);
    }
    :host([variant='solid']) button:disabled {
      background: var(--gsh-btn-color-fill-solid-disabled);
      border-color: var(--gsh-btn-color-border-solid-disabled);
    }
    :host([variant='solid'][intent='inverse']) button:disabled {
      background: var(--gsh-btn-color-fill-solid-inverse-disabled);
      border-color: var(--gsh-btn-color-border-solid-inverse-disabled);
    }

    /* ---------- Variant = Faded ---------- */
    :host([variant='faded'][intent='brand']) button {
      background: var(--gsh-btn-color-fill-faded-brand-default);
      border-color: var(--gsh-btn-color-border-faded-brand-default);
      color: var(--gsh-btn-color-content-faded-brand);
    }
    :host([variant='faded'][intent='brand']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-brand-hover);
      border-color: var(--gsh-btn-color-border-faded-brand-hover);
    }
    :host([variant='faded'][intent='brand']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-brand-pressed);
      border-color: var(--gsh-btn-color-border-faded-brand-pressed);
    }
    :host([variant='faded'][intent='critical']) button {
      background: var(--gsh-btn-color-fill-faded-critical-default);
      border-color: var(--gsh-btn-color-border-faded-critical-default);
      color: var(--gsh-btn-color-content-faded-critical);
    }
    :host([variant='faded'][intent='critical']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-critical-hover);
      border-color: var(--gsh-btn-color-border-faded-critical-hover);
    }
    :host([variant='faded'][intent='critical']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-critical-pressed);
      border-color: var(--gsh-btn-color-border-faded-critical-pressed);
    }
    :host([variant='faded'][intent='neutral']) button {
      background: var(--gsh-btn-color-fill-faded-neutral-default);
      border-color: var(--gsh-btn-color-border-faded-neutral-default);
      color: var(--gsh-btn-color-content-faded-neutral);
    }
    :host([variant='faded'][intent='neutral']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-neutral-hover);
      border-color: var(--gsh-btn-color-border-faded-neutral-hover);
    }
    :host([variant='faded'][intent='neutral']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-neutral-pressed);
      border-color: var(--gsh-btn-color-border-faded-neutral-pressed);
    }
    :host([variant='faded'][intent='positive']) button {
      background: var(--gsh-btn-color-fill-faded-positive-default);
      border-color: var(--gsh-btn-color-border-faded-positive-default);
      color: var(--gsh-btn-color-content-faded-positive);
    }
    :host([variant='faded'][intent='positive']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-positive-hover);
      border-color: var(--gsh-btn-color-border-faded-positive-hover);
    }
    :host([variant='faded'][intent='positive']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-positive-pressed);
      border-color: var(--gsh-btn-color-border-faded-positive-pressed);
    }
    :host([variant='faded'][intent='warning']) button {
      background: var(--gsh-btn-color-fill-faded-warning-default);
      border-color: var(--gsh-btn-color-border-faded-warning-default);
      color: var(--gsh-btn-color-content-faded-warning);
    }
    :host([variant='faded'][intent='warning']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-warning-hover);
      border-color: var(--gsh-btn-color-border-faded-warning-hover);
    }
    :host([variant='faded'][intent='warning']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-warning-pressed);
      border-color: var(--gsh-btn-color-border-faded-warning-pressed);
    }
    :host([variant='faded'][intent='inverse']) button {
      background: var(--gsh-btn-color-fill-faded-inverse-default);
      border-color: var(--gsh-btn-color-border-faded-inverse-default);
      color: var(--gsh-btn-color-content-faded-inverse);
    }
    :host([variant='faded'][intent='inverse']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-inverse-hover);
      border-color: var(--gsh-btn-color-border-faded-inverse-hover);
    }
    :host([variant='faded'][intent='inverse']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-faded-inverse-pressed);
      border-color: var(--gsh-btn-color-border-faded-inverse-pressed);
    }
    :host([variant='faded']) button:disabled {
      background: var(--gsh-btn-color-fill-faded-disabled);
      border-color: var(--gsh-btn-color-border-faded-disabled);
    }
    :host([variant='faded'][intent='inverse']) button:disabled {
      background: var(--gsh-btn-color-fill-faded-inverse-disabled);
      border-color: var(--gsh-btn-color-border-faded-inverse-disabled);
    }

    /* ---------- Variant = Bare ---------- */
    :host([variant='bare'][intent='brand']) button {
      background: var(--gsh-btn-color-fill-bare-brand-default);
      border-color: var(--gsh-btn-color-border-bare-brand-default);
      color: var(--gsh-btn-color-content-bare-brand);
    }
    :host([variant='bare'][intent='brand']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-brand-hover);
      border-color: var(--gsh-btn-color-border-bare-brand-hover);
    }
    :host([variant='bare'][intent='brand']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-brand-pressed);
      border-color: var(--gsh-btn-color-border-bare-brand-pressed);
    }
    :host([variant='bare'][intent='critical']) button {
      background: var(--gsh-btn-color-fill-bare-critical-default);
      border-color: var(--gsh-btn-color-border-bare-critical-default);
      color: var(--gsh-btn-color-content-bare-critical);
    }
    :host([variant='bare'][intent='critical']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-critical-hover);
      border-color: var(--gsh-btn-color-border-bare-critical-hover);
    }
    :host([variant='bare'][intent='critical']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-critical-pressed);
      border-color: var(--gsh-btn-color-border-bare-critical-pressed);
    }
    :host([variant='bare'][intent='neutral']) button {
      background: var(--gsh-btn-color-fill-bare-neutral-default);
      border-color: var(--gsh-btn-color-border-bare-neutral-default);
      color: var(--gsh-btn-color-content-bare-neutral);
    }
    :host([variant='bare'][intent='neutral']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-neutral-hover);
      border-color: var(--gsh-btn-color-border-bare-neutral-hover);
    }
    :host([variant='bare'][intent='neutral']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-neutral-pressed);
      border-color: var(--gsh-btn-color-border-bare-neutral-pressed);
    }
    :host([variant='bare'][intent='positive']) button {
      background: var(--gsh-btn-color-fill-bare-positive-default);
      border-color: var(--gsh-btn-color-border-bare-positive-default);
      color: var(--gsh-btn-color-content-bare-positive);
    }
    :host([variant='bare'][intent='positive']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-positive-hover);
      border-color: var(--gsh-btn-color-border-bare-positive-hover);
    }
    :host([variant='bare'][intent='positive']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-positive-pressed);
      border-color: var(--gsh-btn-color-border-bare-positive-pressed);
    }
    :host([variant='bare'][intent='warning']) button {
      background: var(--gsh-btn-color-fill-bare-warning-default);
      border-color: var(--gsh-btn-color-border-bare-warning-default);
      color: var(--gsh-btn-color-content-bare-warning);
    }
    :host([variant='bare'][intent='warning']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-warning-hover);
      border-color: var(--gsh-btn-color-border-bare-warning-hover);
    }
    :host([variant='bare'][intent='warning']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-warning-pressed);
      border-color: var(--gsh-btn-color-border-bare-warning-pressed);
    }
    :host([variant='bare'][intent='inverse']) button {
      background: var(--gsh-btn-color-fill-bare-inverse-default);
      border-color: var(--gsh-btn-color-border-bare-inverse-default);
      color: var(--gsh-btn-color-content-bare-inverse);
    }
    :host([variant='bare'][intent='inverse']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-inverse-hover);
      border-color: var(--gsh-btn-color-border-bare-inverse-hover);
    }
    :host([variant='bare'][intent='inverse']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-bare-inverse-pressed);
      border-color: var(--gsh-btn-color-border-bare-inverse-pressed);
    }
    :host([variant='bare']) button:disabled {
      background: var(--gsh-btn-color-fill-bare-disabled);
      border-color: var(--gsh-btn-color-border-bare-disabled);
    }
    :host([variant='bare'][intent='inverse']) button:disabled {
      background: var(--gsh-btn-color-fill-bare-inverse-disabled);
      border-color: var(--gsh-btn-color-border-bare-inverse-disabled);
    }

    /* ---------- Variant = Outline ---------- */
    :host([variant='outline'][intent='brand']) button {
      background: var(--gsh-btn-color-fill-outline-brand-default);
      border-color: var(--gsh-btn-color-border-outline-brand-default);
      color: var(--gsh-btn-color-content-outline-brand);
    }
    :host([variant='outline'][intent='brand']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-brand-hover);
      border-color: var(--gsh-btn-color-border-outline-brand-hover);
    }
    :host([variant='outline'][intent='brand']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-brand-pressed);
      border-color: var(--gsh-btn-color-border-outline-brand-pressed);
    }
    :host([variant='outline'][intent='critical']) button {
      background: var(--gsh-btn-color-fill-outline-critical-default);
      border-color: var(--gsh-btn-color-border-outline-critical-default);
      color: var(--gsh-btn-color-content-outline-critical);
    }
    :host([variant='outline'][intent='critical']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-critical-hover);
      border-color: var(--gsh-btn-color-border-outline-critical-hover);
    }
    :host([variant='outline'][intent='critical']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-critical-pressed);
      border-color: var(--gsh-btn-color-border-outline-critical-pressed);
    }
    :host([variant='outline'][intent='neutral']) button {
      background: var(--gsh-btn-color-fill-outline-neutral-default);
      border-color: var(--gsh-btn-color-border-outline-neutral-default);
      color: var(--gsh-btn-color-content-outline-neutral);
    }
    :host([variant='outline'][intent='neutral']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-neutral-hover);
      border-color: var(--gsh-btn-color-border-outline-neutral-hover);
    }
    :host([variant='outline'][intent='neutral']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-neutral-pressed);
      border-color: var(--gsh-btn-color-border-outline-neutral-pressed);
    }
    :host([variant='outline'][intent='positive']) button {
      background: var(--gsh-btn-color-fill-outline-positive-default);
      border-color: var(--gsh-btn-color-border-outline-positive-default);
      color: var(--gsh-btn-color-content-outline-positive);
    }
    :host([variant='outline'][intent='positive']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-positive-hover);
      border-color: var(--gsh-btn-color-border-outline-positive-hover);
    }
    :host([variant='outline'][intent='positive']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-positive-pressed);
      border-color: var(--gsh-btn-color-border-outline-positive-pressed);
    }
    :host([variant='outline'][intent='warning']) button {
      background: var(--gsh-btn-color-fill-outline-warning-default);
      border-color: var(--gsh-btn-color-border-outline-warning-default);
      color: var(--gsh-btn-color-content-outline-warning);
    }
    :host([variant='outline'][intent='warning']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-warning-hover);
      border-color: var(--gsh-btn-color-border-outline-warning-hover);
    }
    :host([variant='outline'][intent='warning']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-warning-pressed);
      border-color: var(--gsh-btn-color-border-outline-warning-pressed);
    }
    :host([variant='outline'][intent='inverse']) button {
      background: var(--gsh-btn-color-fill-outline-inverse-default);
      border-color: var(--gsh-btn-color-border-outline-inverse-default);
      color: var(--gsh-btn-color-content-outline-inverse);
    }
    :host([variant='outline'][intent='inverse']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-inverse-hover);
      border-color: var(--gsh-btn-color-border-outline-inverse-hover);
    }
    :host([variant='outline'][intent='inverse']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-outline-inverse-pressed);
      border-color: var(--gsh-btn-color-border-outline-inverse-pressed);
    }
    :host([variant='outline']) button:disabled {
      background: var(--gsh-btn-color-fill-outline-disabled);
      border-color: var(--gsh-btn-color-border-outline-disabled);
    }
    :host([variant='outline'][intent='inverse']) button:disabled {
      background: var(--gsh-btn-color-fill-outline-inverse-disabled);
      border-color: var(--gsh-btn-color-border-outline-inverse-disabled);
    }

    /* ---------- Variant = Ghost ---------- */
    :host([variant='ghost'][intent='brand']) button {
      background: var(--gsh-btn-color-fill-ghost-brand-default);
      border-color: var(--gsh-btn-color-border-ghost-brand-default);
      color: var(--gsh-btn-color-content-ghost-brand);
    }
    :host([variant='ghost'][intent='brand']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-brand-hover);
      border-color: var(--gsh-btn-color-border-ghost-brand-hover);
    }
    :host([variant='ghost'][intent='brand']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-brand-pressed);
      border-color: var(--gsh-btn-color-border-ghost-brand-pressed);
    }
    :host([variant='ghost'][intent='critical']) button {
      background: var(--gsh-btn-color-fill-ghost-critical-default);
      border-color: var(--gsh-btn-color-border-ghost-critical-default);
      color: var(--gsh-btn-color-content-ghost-critical);
    }
    :host([variant='ghost'][intent='critical']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-critical-hover);
      border-color: var(--gsh-btn-color-border-ghost-critical-hover);
    }
    :host([variant='ghost'][intent='critical']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-critical-pressed);
      border-color: var(--gsh-btn-color-border-ghost-critical-pressed);
    }
    :host([variant='ghost'][intent='neutral']) button {
      background: var(--gsh-btn-color-fill-ghost-neutral-default);
      border-color: var(--gsh-btn-color-border-ghost-neutral-default);
      color: var(--gsh-btn-color-content-ghost-neutral);
    }
    :host([variant='ghost'][intent='neutral']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-neutral-hover);
      border-color: var(--gsh-btn-color-border-ghost-neutral-hover);
    }
    :host([variant='ghost'][intent='neutral']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-neutral-pressed);
      border-color: var(--gsh-btn-color-border-ghost-neutral-pressed);
    }
    :host([variant='ghost'][intent='positive']) button {
      background: var(--gsh-btn-color-fill-ghost-positive-default);
      border-color: var(--gsh-btn-color-border-ghost-positive-default);
      color: var(--gsh-btn-color-content-ghost-positive);
    }
    :host([variant='ghost'][intent='positive']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-positive-hover);
      border-color: var(--gsh-btn-color-border-ghost-positive-hover);
    }
    :host([variant='ghost'][intent='positive']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-positive-pressed);
      border-color: var(--gsh-btn-color-border-ghost-positive-pressed);
    }
    :host([variant='ghost'][intent='warning']) button {
      background: var(--gsh-btn-color-fill-ghost-warning-default);
      border-color: var(--gsh-btn-color-border-ghost-warning-default);
      color: var(--gsh-btn-color-content-ghost-warning);
    }
    :host([variant='ghost'][intent='warning']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-warning-hover);
      border-color: var(--gsh-btn-color-border-ghost-warning-hover);
    }
    :host([variant='ghost'][intent='warning']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-warning-pressed);
      border-color: var(--gsh-btn-color-border-ghost-warning-pressed);
    }
    :host([variant='ghost'][intent='inverse']) button {
      background: var(--gsh-btn-color-fill-ghost-inverse-default);
      border-color: var(--gsh-btn-color-border-ghost-inverse-default);
      color: var(--gsh-btn-color-content-ghost-inverse);
    }
    :host([variant='ghost'][intent='inverse']) button:hover:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-inverse-hover);
      border-color: var(--gsh-btn-color-border-ghost-inverse-hover);
    }
    :host([variant='ghost'][intent='inverse']) button:active:not(:disabled) {
      background: var(--gsh-btn-color-fill-ghost-inverse-pressed);
      border-color: var(--gsh-btn-color-border-ghost-inverse-pressed);
    }
    :host([variant='ghost']) button:disabled {
      background: var(--gsh-btn-color-fill-ghost-disabled);
      border-color: var(--gsh-btn-color-border-ghost-disabled);
    }
    :host([variant='ghost'][intent='inverse']) button:disabled {
      background: var(--gsh-btn-color-fill-ghost-inverse-disabled);
      border-color: var(--gsh-btn-color-border-ghost-inverse-disabled);
    }

    /* ---------- Variant = Link ---------- */
    /* Figma "Link" has no fill/border/padding-box at any size — the instance
       bounding box exactly matches the text glyph box (e.g. 56x20 at Size=L
       vs Solid's 88x48 at the same size). It is plain underlined text, not a
       box-model button, so it resets the size-axis height/padding rules
       above rather than reusing them. Figma only defines Link for
       Intent=Brand — other intents fall back to the brand color via the
       CSS custom property's own initial value (no per-intent override
       exists because none exists in the vendor/Figma source). */
    :host([variant='link']) button {
      height: auto;
      padding-inline: 0;
      border: none;
      background: transparent;
      color: var(--gsh-btn-color-content-link-brand);
      text-decoration: none;
    }
    :host([variant='link']) button:hover:not(:disabled),
    :host([variant='link']) button:active:not(:disabled) {
      text-decoration: underline;
    }
    :host([variant='link']) button:disabled {
      color: var(--gsh-btn-color-content-link-disabled);
    }
  `;

  /**
   * Figma "Variant": visual style/emphasis.
   * `link` is a Figma-only-for-Brand plain-text treatment (no fill/border) —
   * see class docblock and the "Variant = Link" CSS block above.
   */
  @property({ type: String, reflect: true })
  variant: 'solid' | 'faded' | 'bare' | 'outline' | 'ghost' | 'link' = 'solid';

  /** Figma "Intent": semantic color role. */
  @property({ type: String, reflect: true })
  intent: 'brand' | 'neutral' | 'critical' | 'positive' | 'inverse' | 'warning' = 'brand';

  /** Figma "Size": L/M(base)/S/XS. */
  @property({ type: String, reflect: true })
  size: 'large' | 'mid' | 'small' | 'xsmall' = 'mid';

  /** Figma "Style": Boxed (radius scales with size) vs Rounded (pill). */
  @property({ type: String, reflect: true })
  shape: 'boxed' | 'rounded' = 'boxed';

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
