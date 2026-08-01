import { describe, expect, it } from 'vitest';
import { GshButton } from '../gsh-button.js';
import { GshCheckbox } from '../gsh-checkbox.js';

describe('@genshi/core', () => {
  it('registers gsh-button', () => {
    const el = new GshButton();
    expect(el.tagName.toLowerCase()).toBe('gsh-button');
    expect(el.variant).toBe('brand');
  });

  it('registers gsh-checkbox with Figma-spec state properties', () => {
    const el = new GshCheckbox();
    expect(el.tagName.toLowerCase()).toBe('gsh-checkbox');
    expect(el.checked).toBe(false);
    expect(el.indeterminate).toBe(false);
    expect(el.invalid).toBe(false);
    expect(el.disabled).toBe(false);
  });
});
