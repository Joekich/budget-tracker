import wizardryConfig from 'eslint-config-wizardry';
import wizardryFsd from 'eslint-plugin-wizardry-fsd';

const config = [
  ...wizardryConfig,
  {
    ignores: ['out/', 'dist/'],
    plugins: {
      'wizardry-fsd': wizardryFsd,
    },
  },
];

export default config;
