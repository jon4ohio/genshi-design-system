import { describe, expect, it } from 'vitest';
import { GshButton } from '../gsh-button.js';
import { GshBadge } from '../gsh-badge.js';

describe('@genshi/core', () => {
  it('registers gsh-button', () => {
    const el = new GshButton();
    expect(el.tagName.toLowerCase()).toBe('gsh-button');
    expect(el.variant).toBe('brand');
  });

  it('registers gsh-badge with Figma-aligned defaults', () => {
    const el = new GshBadge();
    expect(el.tagName.toLowerCase()).toBe('gsh-badge');
    expect(el.intent).toBe('neutral');
    expect(el.variant).toBe('solid');
    expect(el.size).toBe('large');
  });
});
