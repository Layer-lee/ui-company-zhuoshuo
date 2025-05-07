module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended', // Vue 3 规则
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: '@babel/eslint-parser', // 使用 Babel 解析器
  },
  rules: {
    // 可以在这里添加自定义规则
    'vue/multi-word-component-names': 'off', // 允许单单词组件名
  },
}
