import { describe, expect, it } from 'vitest';
import { GshButton } from '../gsh-button.js';
import { GshBadge } from '../gsh-badge.js';
import { GshInput } from '../gsh-input.js';

describe('@genshi/core', () => {
  it('registers gsh-button', () => {
    const el = new GshButton();
    expect(el.tagName.toLowerCase()).toBe('gsh-button');
    expect(el.variant).toBe('solid');
    expect(el.intent).toBe('brand');
    expect(el.size).toBe('mid');
    expect(el.shape).toBe('boxed');
    expect(el.disabled).toBe(false);
  });

  it('reflects gsh-button variant axes as attributes', async () => {
    const el = new GshButton();
    document.body.appendChild(el);
    el.variant = 'outline';
    el.intent = 'critical';
    el.size = 'large';
    el.shape = 'rounded';
    await el.updateComplete;
    expect(el.getAttribute('variant')).toBe('outline');
    expect(el.getAttribute('intent')).toBe('critical');
    expect(el.getAttribute('size')).toBe('large');
    expect(el.getAttribute('shape')).toBe('rounded');
    document.body.removeChild(el);
  });

  it('registers gsh-badge with Figma-aligned defaults', () => {
    const el = new GshBadge();
    expect(el.tagName.toLowerCase()).toBe('gsh-badge');
    expect(el.intent).toBe('neutral');
    expect(el.variant).toBe('solid');
    expect(el.size).toBe('large');
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
