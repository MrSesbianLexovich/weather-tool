// eslint.config.js
import js from '@eslint/js';
import n from 'eslint-plugin-n';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  n.configs['flat/recommended'],
  prettierConfig,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        fetch: 'readonly',
        AbortController: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'n/no-missing-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-process-exit': 'off',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },
  {
    ignores: ['node_modules/**', 'reports/**', 'coverage/**', 'dist/**'],
  },
];