module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error", // Each time that prettir finds a error I want it returns erro
    "class-methods-use-this": "off", //It changes the default rule: every method has to use 'this'.
    "no-param-reassign": "off", //It allow to receive a params and make changes in that param. (Most used for sequelize)
    "camelcase": "off", //Variable dont need to be camelcase. (Eg.: variableName)
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    //It will not complain if you declare a variable called next and it is note assigned
  },
};
