// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    //自己配置的eslint 建议在项目中配置，这样团队更加统一，只配置编辑器的话，不利于后期维护；
    //分号总是加 ，不加的话报error不是warn
    'semi': ['error', 'always'],
    //关掉eslint默认的缩进
    'indent': 'off',
    //vue 与 script 缩进 2*1
    'vue/script-indent': ['error', 2, { 'baseIndent': 1 }],
    //函数括号前空格 anonymous-匿名函数 named-有名字 asyncArrow-箭头函数
    'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }]

    //修正错误方式   在package.json中 "lint": "eslint --ext .js,.vue src",
    //在命令行 npm run lint -- --fix
  }
}
