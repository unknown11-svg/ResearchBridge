// eslint.config.cjs
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');

const compat = new FlatCompat();

module.exports = [
  // JavaScript recommended rules
  js.configs.recommended,

  // TypeScript recommended rules (converted to flat config)
  ...compat.extends('plugin:@typescript-eslint/recommended'),

  {
    name: 'custom-config',
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        module: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin
    },
    rules: {
      'no-console': 'warn',
      'no-undef': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
