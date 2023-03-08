/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript', '@vue/eslint-config-prettier', 'plugin:storybook/recommended'],
  overrides: [{
    files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
    extends: ['plugin:cypress/recommended']
  }],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': ['warn', {
      singleQuote: true,
      semi: false,
      quoteProps: 'consistent',
      singleAttributePerLine: false,
      printWidth: 120
    }],
    'no-restricted-imports': ['warn', {
      patterns: [{
        group: ['.*', '!./private', '!./build'],
        message: 'Relative imports make it harder to move files and code around. Use absolute imports (starting with an @-symbol) instead!'
      }]
    }],
    'vue/multi-word-component-names': 'off'
    // 'vue/block-lang': [
    //   'error',
    //   {
    //     script: { lang: 'ts' },
    //   },
    // ],
    // 'vue/component-api-style': ['error', ['script-setup']],
    // '@typescript-eslint/no-unused-vars': ['warn', { args: 'all', argsIgnorePattern: '^_' }],
    // 'vue/no-undef-components': [
    //   'error',
    //   {
    //     ignorePatterns: ['router-link', 'router-view', 'Icon'],
    //   },
    // ],
  }
};