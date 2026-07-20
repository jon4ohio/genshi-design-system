import { describe, expect, it } from 'vitest';
import { handleRovingTabIndex, trapFocus } from '../focus.js';

describe('@genshi/foundation', () => {
  it('wraps roving tabindex forward', () => {
    const items = [
      document.createElement('button'),
      document.createElement('button'),
      document.createElement('button'),
    ];
    const next = handleRovingTabIndex(items, 2, 'ArrowDown');
    expect(next).toBe(0);
    expect(items[0].tabIndex).toBe(0);
  });

  it('returns focus trap cleanup', () => {
    const container = document.createElement('div');
    const button = document.createElement('button');
    container.append(button);
    document.body.append(container);
    const release = trapFocus(container);
    expect(typeof release).toBe('function');
    release();
    container.remove();
  });
});
