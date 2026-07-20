import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Select',
  component: 'gsh-select',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <gsh-select aria-label="Role">
      <option value="">Select role</option>
      <option value="eng">Engineering</option>
      <option value="design">Design</option>
    </gsh-select>
  `,
};
