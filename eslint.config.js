import wizardryConfig from 'eslint-config-wizardry';
import wizardryFsd from 'eslint-plugin-wizardry-fsd';

const config = [
  ...wizardryConfig,
  wizardryFsd.configs.flat.next,
  {
    ignores: ['out/', 'dist/'],
  },
];

export default config;
