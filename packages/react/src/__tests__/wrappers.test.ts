import { describe, expect, it } from 'vitest';
import { Button, Text } from '../index.js';

describe('@genshi/react', () => {
  it('exports thin wrapper components', () => {
    expect(Text).toBeDefined();
    expect(Button).toBeDefined();
  });
});
