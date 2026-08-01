import { describe, expect, it } from 'vitest';
import { GshButton } from '../gsh-button.js';
import { GshSelect } from '../gsh-select.js';

describe('@genshi/core', () => {
  it('registers gsh-button', () => {
    const el = new GshButton();
    expect(el.tagName.toLowerCase()).toBe('gsh-button');
    expect(el.variant).toBe('brand');
  });

  it('registers gsh-select', () => {
    const el = new GshSelect();
    expect(el.tagName.toLowerCase()).toBe('gsh-select');
    expect(el.disabled).toBe(false);
  });
});
