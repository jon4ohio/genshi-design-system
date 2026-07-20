import type { Preview } from '@storybook/web-components';
import '@genshi/tokens/css';
import '@genshi/themes/seamkit-default';
import '@genshi/core/define';
import '../stories/storybook.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
