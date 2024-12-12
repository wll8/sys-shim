/* eslint-env node */
require(`@rushstack/eslint-patch/modern-module-resolution`)

module.exports = {
  root: true,
  extends: [
    `plugin:vue/vue3-essential`,
    `eslint:recommended`,
    `@vue/eslint-config-prettier/skip-formatting`,
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    'no-var': `error`,
    'spaced-comment': `error`,
    'prettier/prettier': [
      `error`,
      {
        singleQuote: true,
        semi: false,
      },
    ],
    semi: [`error`, `never`],
    quotes: [`error`, `backtick`],
    'no-unused-vars': `off`,
    'no-console': `off`,
    'no-async-promise-executor': `off`,
    'vue/multi-word-component-names': `off`,
    'no-debugger': `off`,
  },
  globals: {
    globalThis: true,
    sys: true,
  },
  parserOptions: {
    ecmaVersion: `latest`,
  },
}
