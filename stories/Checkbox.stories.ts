import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'gsh-checkbox',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => html`<gsh-checkbox>Accept terms</gsh-checkbox>`,
};

export const Checked: StoryObj = {
  render: () => html`<gsh-checkbox checked>Subscribe to updates</gsh-checkbox>`,
};
