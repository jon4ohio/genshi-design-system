import { describe, expect, it } from 'vitest';
import { GshButton } from '../gsh-button.js';
import { GshInput } from '../gsh-input.js';

describe('@genshi/core', () => {
  it('registers gsh-button', () => {
    const el = new GshButton();
    expect(el.tagName.toLowerCase()).toBe('gsh-button');
    expect(el.variant).toBe('brand');
  });

  it('registers gsh-input with default state properties', () => {
    const el = new GshInput();
    expect(el.tagName.toLowerCase()).toBe('gsh-input');
    expect(el.size).toBe('mid');
    expect(el.disabled).toBe(false);
    expect(el.invalid).toBe(false);
  });

  it('reflects gsh-input disabled and invalid as attributes', async () => {
    const el = new GshInput();
    document.body.appendChild(el);
    el.disabled = true;
    el.invalid = true;
    await el.updateComplete;
    expect(el.hasAttribute('disabled')).toBe(true);
    expect(el.hasAttribute('invalid')).toBe(true);
    document.body.removeChild(el);
  });
});
