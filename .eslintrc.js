module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': 'off',
    'no-undef': 'off',
    'consistent-return': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'object-curly-newline': 'off',
    'import/no-named-as-default': 'off',
    'no-use-before-define': 'off',
    'operator-linebreak': 'off',
  },
};
