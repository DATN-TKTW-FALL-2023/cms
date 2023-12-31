module.exports = {
  env: {
    //   es5: true,
    browser: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:@typescript-eslint/recommended', 'airbnb/hooks'],
  plugins: ['prettier', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': ['error'],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'prefer-promise-reject-errors': 0,
    'no-nested-ternary': 0,
    'react/prop-types': 0,
    'func-names': 0,
    'no-console': 0,
    'no-tabs': 0,
    'no-underscore-dangle': 0,
    'react-hooks/rules-of-hooks': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-fragments': 0,
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }],
    'max-classes-per-file': 0,
    'react/static-property-placement': 0,
    'react/forbid-prop-types': 0,
    'react/state-in-constructor': 0,
    'react/no-array-index-key': 0,
    'react/jsx-filename-extension': [0, { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react/jsx-props-no-spreading': [0, { html: 'ignore', custom: 'ignore', explicitSpread: 'ignore' }],
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': 1,
    'default-param-last': 0,
    'no-shadow': 0,
    'no-void': 0, // Since we do not use prop-types
    'react/require-default-props': 0, // Since we do not use prop-types
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
}
