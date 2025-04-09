// eslint.config.js
module.exports = {
    extends: [
      'eslint:recommended', // Extend the recommended ESLint rules
      'plugin:react/recommended', // If you're using React
      'plugin:@typescript-eslint/recommended', // If you're using TypeScript
    ],
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
  };
  