import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Foundations/Overview',
  tags: ['autodocs'],
};

export default meta;

export const Architecture: StoryObj = {
  render: () => html`
    <gsh-stack gap="mid">
      <gsh-text as="h1" variant="pageTitle">Genshi Design System</gsh-text>
      <gsh-text color="muted">
        Core → Intent → Component token layers with Lit canonical components and framework adapters.
      </gsh-text>
    </gsh-stack>
  `,
};
