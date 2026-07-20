import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Stack',
  component: 'gsh-stack',
  tags: ['autodocs'],
};

export default meta;

export const Vertical: StoryObj = {
  render: () => html`
    <gsh-stack gap="mid">
      <gsh-text>First</gsh-text>
      <gsh-text>Second</gsh-text>
    </gsh-stack>
  `,
};

export const Horizontal: StoryObj = {
  render: () => html`
    <gsh-stack direction="horizontal" gap="mid" align="center">
      <gsh-button size="small">One</gsh-button>
      <gsh-button size="small" variant="neutral">Two</gsh-button>
    </gsh-stack>
  `,
};
