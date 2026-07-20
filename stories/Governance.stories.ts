import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Foundations/Governance',
  tags: ['autodocs'],
};

export default meta;

export const FrozenArchitecture: StoryObj = {
  render: () => html`
    <gsh-stack gap="mid">
      <gsh-text as="h2" variant="sectionTitle">Governance lock (Phase 2)</gsh-text>
      <gsh-text color="muted">
        ADR-0001 through ADR-0008 are Accepted. Token middle layer is <strong>Intent</strong>.
        Package boundaries enforced via npm run validate.
      </gsh-text>
      <gsh-box padding="mid" bordered>
        <gsh-stack gap="small">
          <gsh-text variant="label">Frozen until post-prerelease feedback</gsh-text>
          <gsh-text variant="caption" color="muted">Layered tokens · Foundation · Themes · Core · Adapters</gsh-text>
        </gsh-stack>
      </gsh-box>
    </gsh-stack>
  `,
};
