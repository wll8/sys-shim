module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true, // es 变量
  },
  extends: [
    `eslint:recommended`, // 继承 eslint 的核心推荐规则
  ],
  parserOptions: {
    sourceType: `module`,
    ecmaVersion: 2021, // es 语法
  },
  ignorePatterns: [`dist`, `win-api/res`],
  globals: {
    Neutralino: `writeable`,
  },
  rules: {
    "no-var": `error`,
    "spaced-comment": `error`,
    "no-trailing-spaces": `error`,
    "comma-dangle": [`error`, `always-multiline`],
    "semi": [
      `error`,
      `never`,
    ],
    "quotes": [
      `error`,
      `backtick`,
    ],
    "no-unused-vars": `off`,
    "no-console": `off`,
    "no-debugger": `off`,
    "no-async-promise-executor": [`off`],
  },
}
