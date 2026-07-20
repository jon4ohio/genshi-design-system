import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Dialog',
  component: 'gsh-dialog',
  tags: ['autodocs'],
};

export default meta;

export const Open: StoryObj = {
  render: () => html`
    <gsh-dialog open label="Confirm action">
      <gsh-text color="muted">This dialog traps focus and closes on Escape.</gsh-text>
      <gsh-stack direction="horizontal" gap="mid" slot="actions">
        <gsh-button variant="neutral">Cancel</gsh-button>
        <gsh-button>Confirm</gsh-button>
      </gsh-stack>
    </gsh-dialog>
  `,
};
