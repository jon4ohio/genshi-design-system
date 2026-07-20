import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Foundations/Governance',
  tags: ['autodocs'],
};

export default meta;

export const Architecture: StoryObj = {
  render: () => html`
    <gsh-stack gap="mid">
      <gsh-text as="h2" variant="sectionTitle">Architecture</gsh-text>
      <gsh-text color="muted">How tokens resolve — not how developers name them.</gsh-text>
      <gsh-box padding="mid" bordered>
        <gsh-text>Core → Intent → Component</gsh-text>
      </gsh-box>
      <gsh-text color="muted">Canonical source: tokens/source/genshi/</gsh-text>
    </gsh-stack>
  `,
};

export const Taxonomy: StoryObj = {
  render: () => html`
    <gsh-stack gap="mid">
      <gsh-text as="h2" variant="sectionTitle">Taxonomy</gsh-text>
      <gsh-text color="muted">
        Public token domains within Intent. Layer names never appear in paths.
      </gsh-text>
      <gsh-stack gap="small">
        <gsh-text color="muted">gsh.color.text.default.primary</gsh-text>
        <gsh-text color="muted">gsh.color.fill.warning.solid</gsh-text>
        <gsh-text color="muted">gsh.color.decorative.fill.raspberry.strong</gsh-text>
      </gsh-stack>
      <gsh-text variant="label">Decorative</gsh-text>
      <gsh-text color="muted">
        Presentation, not meaning — charts, avatars, badges, illustrations, branded accents.
      </gsh-text>
    </gsh-stack>
  `,
};

export const VendorAdaptation: StoryObj = {
  render: () => html`
    <gsh-stack gap="mid">
      <gsh-text as="h2" variant="sectionTitle">Vendor adaptation</gsh-text>
      <gsh-text color="muted">One-time translate at recreate — no runtime vendor aliases.</gsh-text>
      <gsh-box padding="mid" bordered>
        <gsh-stack gap="small">
          <gsh-text>tokens/vendor/seamkit</gsh-text>
          <gsh-text color="muted">↓ recreate-genshi-tokens.mjs</gsh-text>
          <gsh-text>tokens/source/genshi</gsh-text>
          <gsh-text color="muted">↓ build</gsh-text>
          <gsh-text>--gsh-* packages</gsh-text>
        </gsh-stack>
      </gsh-box>
    </gsh-stack>
  `,
};

export const ResolutionChain: StoryObj = {
  render: () => html`
    <gsh-stack gap="mid">
      <gsh-text as="h2" variant="sectionTitle">Resolution chain</gsh-text>
      <gsh-box padding="mid" bordered>
        <gsh-text>Component → Intent → Core</gsh-text>
      </gsh-box>
      <gsh-text color="muted">Never Component → Core.</gsh-text>
    </gsh-stack>
  `,
};

export const Invariants: StoryObj = {
  render: () => html`
    <gsh-stack gap="mid">
      <gsh-text as="h2" variant="sectionTitle">Invariants</gsh-text>
      <gsh-stack gap="small">
        <gsh-text variant="label">Namespace purity</gsh-text>
        <gsh-text color="muted">No gsh.color.intent… in public paths.</gsh-text>
        <gsh-text variant="label">Vendor isolation</gsh-text>
        <gsh-text color="muted">No sfe / non-semantic outside vendor lineage and ADAPTATION.md.</gsh-text>
        <gsh-text variant="label">ADR lock</gsh-text>
        <gsh-text color="muted">ADR-0001 through ADR-0009 Accepted. Enforced via npm run validate.</gsh-text>
      </gsh-stack>
    </gsh-stack>
  `,
};
