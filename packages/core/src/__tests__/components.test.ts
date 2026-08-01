import { describe, expect, it } from 'vitest';
import { GshButton } from '../gsh-button.js';
import { GshBadge } from '../gsh-badge.js';

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
});
