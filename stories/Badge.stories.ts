import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'gsh-badge',
  tags: ['autodocs'],
};

export default meta;

export const Neutral: StoryObj = {
  render: () => html`<gsh-badge intent="neutral">Neutral</gsh-badge>`,
};

export const Intents: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <gsh-badge intent="neutral">Neutral</gsh-badge>
      <gsh-badge intent="info">Info</gsh-badge>
      <gsh-badge intent="positive">Positive</gsh-badge>
      <gsh-badge intent="critical">Critical</gsh-badge>
      <gsh-badge intent="warning">Warning</gsh-badge>
    </div>
  `,
};

export const Variants: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <gsh-badge intent="info" variant="solid">Solid</gsh-badge>
      <gsh-badge intent="info" variant="faded">Faded</gsh-badge>
      <gsh-badge intent="info" variant="outline">Outline</gsh-badge>
      <gsh-badge intent="info" variant="bare">Bare</gsh-badge>
      <gsh-badge intent="info" variant="ghost">Ghost</gsh-badge>
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 8px;">
      <gsh-badge intent="positive" size="large">Large</gsh-badge>
      <gsh-badge intent="positive" size="small">Small</gsh-badge>
    </div>
  `,
};
