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
        SeamKit <code>color/</code> exports map to the Genshi <strong>Intent</strong> layer.
      </gsh-text>
      <gsh-box padding="mid" bordered>
        <gsh-text variant="sectionTitle">Core</gsh-text>
        <gsh-text color="muted">Primitives — blue.500, space.4</gsh-text>
      </gsh-box>
      <gsh-box padding="mid" bordered>
        <gsh-text variant="sectionTitle">Intent</gsh-text>
        <gsh-text color="muted">System language — action.primary, text.default</gsh-text>
      </gsh-box>
      <gsh-box padding="mid" bordered>
        <gsh-text variant="sectionTitle">Component</gsh-text>
        <gsh-text color="muted">Contract — button.primary.background</gsh-text>
      </gsh-box>
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
