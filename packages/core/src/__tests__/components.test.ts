import { describe, expect, it } from 'vitest';
import { GshButton } from '../gsh-button.js';

describe('@genshi/core', () => {
  it('registers gsh-button', () => {
    const el = new GshButton();
    expect(el.tagName.toLowerCase()).toBe('gsh-button');
    expect(el.variant).toBe('brand');
  });
});
