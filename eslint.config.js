import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default [
  // Base ESLint configuration
  js.configs.recommended,
  // TypeScript configuration
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: { ...globals.node, ...globals.browser, JSX: true },
    },
    plugins: {
      'react-refresh': reactRefreshPlugin,
      '@typescript-eslint': typescriptEslintPlugin,
      tailwindcss: tailwindcssPlugin, // Add Tailwind CSS plugin
      'react-hooks': reactHooksPlugin,
    },
  },
  // General rules for TypeScript and React files
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    rules: {
      'object-shorthand': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        1,
        { allowConstantExport: true },
      ],
      'no-unused-vars': [
        2,
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: false,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        2,
        {
          allowExpressions: true,
        },
      ],
      'max-len': [
        1,
        {
          code: 100,
        },
      ],
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2, { SwitchCase: 1 }],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'no-console': 'error',
      'object-curly-newline': [
        'error',
        { multiline: true, minProperties: 5, consistent: true },
      ],
      'object-property-newline': [
        'error',
        { allowAllPropertiesOnSameLine: true },
      ],
      'comma-dangle': ['error', 'always-multiline'],
      '@typescript-eslint/prefer-as-const': 2,
      '@typescript-eslint/prefer-function-type': 2,
      '@typescript-eslint/no-explicit-any': 2,
      // Tailwind CSS rules
      'tailwindcss/classnames-order': 'warn', // Enforce classnames order
      'tailwindcss/no-custom-classname': 'warn', // Warn on custom classnames
    },
  },
];
