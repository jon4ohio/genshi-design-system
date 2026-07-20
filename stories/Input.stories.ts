import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Input',
  component: 'gsh-input',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => html`<gsh-input placeholder="Search employees"></gsh-input>`,
};

export const Sizes: StoryObj = {
  render: () => html`
    <gsh-stack gap="mid">
      <gsh-input size="small" placeholder="Small"></gsh-input>
      <gsh-input size="mid" placeholder="Mid"></gsh-input>
      <gsh-input size="large" placeholder="Large"></gsh-input>
    </gsh-stack>
  `,
};
