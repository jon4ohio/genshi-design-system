import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'gsh-badge',
  tags: ['autodocs'],
};

export default meta;

export const Neutral: StoryObj = {
  render: () => html`<gsh-badge>Neutral</gsh-badge>`,
};

export const Brand: StoryObj = {
  render: () => html`<gsh-badge variant="brand">Brand</gsh-badge>`,
};
