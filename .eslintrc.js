module.exports = {
  extends: [
    'alloy'
  ],
  env: {
    node: true
  },
  rules: {
    'max-len': [ 'error', 160 ],
    'no-param-reassign': [ 'off' ],
    'prefer-promise-reject-errors': [ 'off' ],
    'one-var': [ 'off' ],
    'brace-style': [ 'error', '1tbs' ],
    'no-console': 'error',
    'array-bracket-spacing': [ 'error', 'always' ], // prettier对这个的支持太弱鸡了...
    'comma-dangle': [ 'error', 'never' ],
    quotes: [ 'error', 'single' ],
    'quote-props': [ 'error', 'as-needed' ],
    'max-params': [ 'error', 5 ],
    'key-spacing': [ 'error' ],
    'keyword-spacing': [ 'error' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': [ 'error', { max: 1, maxEOF: 0, maxBOF: 1 } ],
    'eol-last': [ 'error', 'always' ],
    indent: [ 'error', 2, { SwitchCase: 1 } ], // 两个空格缩进
    semi: [ 'error', 'never' ], // 不允许分号
    'space-before-blocks': [ 'error', 'always' ],
    'arrow-spacing': [ 'error', { before: true, after: true } ],
    'space-infix-ops': [ 'error' ]
  }
}
