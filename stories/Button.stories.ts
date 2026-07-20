import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Button',
  component: 'gsh-button',
  tags: ['autodocs'],
};

export default meta;

export const Brand: StoryObj = {
  render: () => html`<gsh-button>Brand</gsh-button>`,
};

export const Neutral: StoryObj = {
  render: () => html`<gsh-button variant="neutral">Neutral</gsh-button>`,
};

export const Disabled: StoryObj = {
  render: () => html`<gsh-button disabled>Disabled</gsh-button>`,
};

export const Sizes: StoryObj = {
  render: () => html`
    <gsh-stack direction="horizontal" gap="mid" align="center">
      <gsh-button size="small">Small</gsh-button>
      <gsh-button size="mid">Mid</gsh-button>
      <gsh-button size="large">Large</gsh-button>
    </gsh-stack>
  `,
};
