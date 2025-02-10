// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import stylistic from '@stylistic/eslint-plugin';

export default withNuxt({
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    '@stylistic/space-unary-ops': [1, { overrides: { '!': true } }],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/no-trailing-spaces': ['error'],
    '@stylistic/comma-spacing': ['error', { before: false, after: true }],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/semi': 'error',
    '@stylistic/indent': ['error', 2],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/member-delimiter-style': ['error'],
    '@stylistic/no-extra-semi': ['error'],
    'vue/html-indent': ['error', 2],
    'vue/no-multiple-template-root': 'off',
    'vue/block-order': [
      'error', {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/require-v-for-key': 'off',
    'vue/valid-v-for': 'off',
  },
});
