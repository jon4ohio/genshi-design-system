import type { Meta, StoryObj } from '@storybook/web-components';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Stack, Text } from '@genshi/react';
import '@genshi/react/register';

const meta: Meta = {
  title: 'Integrations/React/Wrappers',
  tags: ['autodocs'],
};

export default meta;

function mountReact(renderFn: () => React.ReactNode): HTMLElement {
  const host = document.createElement('div');
  const root = createRoot(host);
  root.render(renderFn());
  return host;
}

export const ButtonWrapper: StoryObj = {
  render: () =>
    mountReact(() => React.createElement(Button, null, 'React Button')),
};

export const StackWrapper: StoryObj = {
  render: () =>
    mountReact(() =>
      React.createElement(
        Stack,
        { gap: 'mid' },
        React.createElement(Text, { variant: 'sectionTitle' }, 'React stack'),
        React.createElement(Text, { color: 'muted' }, 'Thin @lit/react wrapper')
      )
    ),
};
