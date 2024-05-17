/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'no-console': ['off'],
    'no-unused-vars': ['off'],
    'no-async-promise-executor': ['off'],
  },
  globals: {
    globalThis: true,
    sys: true,
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
