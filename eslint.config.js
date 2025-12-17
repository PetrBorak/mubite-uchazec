import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import boundaries from 'eslint-plugin-boundaries';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/.husky/**',
      '**/sw.js',
      '**/public/**/*.js',
    ],
  },
  {
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        {
          type: 'shared',
          pattern: 'packages/shared/src/**/*',
        },
        {
          type: 'backend',
          pattern: 'packages/backend/src/**/*',
        },
        {
          type: 'frontend',
          pattern: 'packages/frontend/src/**/*',
        },
      ],
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'frontend',
              allow: ['shared'],
            },
            {
              from: 'backend',
              allow: ['shared'],
            },
            {
              from: 'shared',
              allow: [],
            },
          ],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    },
  }
);
