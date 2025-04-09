// eslint.config.js
import eslintRecommended from 'eslint:recommended';
import reactRecommended from 'plugin:react/recommended';
import typescriptRecommended from 'plugin:@typescript-eslint/recommended';

const config = [
  eslintRecommended,
  reactRecommended,
  typescriptRecommended,
  {
    parserOptions: {
      ecmaVersion: 2021, // Allow the latest ECMAScript features
      sourceType: 'module', // Enable ECMAScript modules
    },
    rules: {
      // Your custom rules go here
      'no-console': 'warn', // Example: warning for console.log
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];

export default config;
