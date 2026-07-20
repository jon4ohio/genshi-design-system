import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Box',
  component: 'gsh-box',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => html`<gsh-box padding="mid">Surface box</gsh-box>`,
};

export const Bordered: StoryObj = {
  render: () => html`<gsh-box padding="mid" bordered>Bordered box</gsh-box>`,
};
