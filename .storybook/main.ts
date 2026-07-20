import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/web-components-vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(viteConfig) {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@genshi/core': path.resolve(dirname, '../packages/core/src'),
      '@genshi/core/define': path.resolve(dirname, '../packages/core/src/define.ts'),
      '@genshi/react': path.resolve(dirname, '../packages/react/src'),
      '@genshi/react/register': path.resolve(dirname, '../packages/react/src/register.ts'),
      '@genshi/tokens/css': path.resolve(
        dirname,
        '../packages/tokens/dist/tokens.css'
      ),
      '@genshi/themes/seamkit-default': path.resolve(
        dirname,
        '../packages/themes/dist/seamkit-default.css'
      ),
    };
    return viteConfig;
  },
};

export default config;
