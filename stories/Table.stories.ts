import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Table',
  component: 'gsh-table',
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj = {
  render: () => html`
    <gsh-table caption="Team members">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ada Okonkwo</td>
          <td>Engineering</td>
        </tr>
        <tr>
          <td>James Chen</td>
          <td>Product Design</td>
        </tr>
      </tbody>
    </gsh-table>
  `,
};
