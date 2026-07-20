import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Tokens/Layers',
  tags: ['autodocs'],
};

export default meta;

export const CoreIntentComponent: StoryObj = {
  render: () => html`
    <gsh-stack gap="large">
      <gsh-text color="muted">
        Architecture: how tokens resolve. Taxonomy: how developers address them (domains, not layer names).
      </gsh-text>
      <gsh-box padding="mid" bordered>
        <gsh-text variant="sectionTitle">Core</gsh-text>
        <gsh-text color="muted">Primitives — color.grey.500, dimension.4pt</gsh-text>
      </gsh-box>
      <gsh-box padding="mid" bordered>
        <gsh-text variant="sectionTitle">Intent</gsh-text>
        <gsh-text color="muted">Token domains — text, fill, border, interaction, decorative</gsh-text>
      </gsh-box>
      <gsh-box padding="mid" bordered>
        <gsh-text variant="sectionTitle">Component</gsh-text>
        <gsh-text color="muted">Contract — btn.color.fill.solid.brand.default</gsh-text>
      </gsh-box>
    </gsh-stack>
  `,
};

export const TokenDomains: StoryObj = {
  render: () => html`
    <gsh-stack gap="small">
      <gsh-text variant="sectionTitle">Token domains (public paths)</gsh-text>
      <gsh-text color="muted">gsh.color.text.default.primary</gsh-text>
      <gsh-text color="muted">gsh.color.fill.warning.solid</gsh-text>
      <gsh-text color="muted">gsh.color.decorative.fill.raspberry.strong</gsh-text>
      <gsh-text variant="label">Decorative</gsh-text>
      <gsh-text color="muted">
        Expressive, non-stateful color for charts, avatars, badges, illustrations, and branded accents.
      </gsh-text>
    </gsh-stack>
  `,
};

export const SampleVariables: StoryObj = {
  render: () => html`
    <gsh-stack gap="small">
      <gsh-text variant="label">--gsh-color-text-primary</gsh-text>
      <gsh-box padding="small" bordered>
        <gsh-text>Primary text on default surface</gsh-text>
      </gsh-box>
      <gsh-text variant="label">--gsh-button-fill-brand-default</gsh-text>
      <gsh-button>Brand button token</gsh-button>
    </gsh-stack>
  `,
};
