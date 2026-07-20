import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Text',
  component: 'gsh-text',
  tags: ['autodocs'],
};

export default meta;

export const Body: StoryObj = {
  render: () => html`<gsh-text>Body text</gsh-text>`,
};

export const PageTitle: StoryObj = {
  render: () => html`<gsh-text as="h1" variant="pageTitle">Page title</gsh-text>`,
};

export const Muted: StoryObj = {
  render: () => html`<gsh-text color="muted">Muted caption</gsh-text>`,
};
