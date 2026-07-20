import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Icon',
  component: 'gsh-icon',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => html`<gsh-icon label="Default icon"></gsh-icon>`,
};

export const Large: StoryObj = {
  render: () => html`<gsh-icon label="Large icon" size="24"></gsh-icon>`,
};
