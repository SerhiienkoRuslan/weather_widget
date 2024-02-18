const prettierConfig = require('./.prettierrc')

module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'standard',
    'plugin:prettier/recommended',
  ],
  globals: {
    VERSION: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@babel', 'jest', 'react-hooks', 'prettier'],
  rules: {
    'camelcase': 'off',
    'curly': 'error',
    'linebreak-style': ['error', 'unix'],
    'newline-before-return': 'error',
    'no-else-return': 'error',
    'no-param-reassign': 'error',
    'nonblock-statement-body-position': ['error', 'below'],
    'object-shorthand': 'error',
    'prefer-destructuring': 'error',
    'prettier/prettier': ['error', prettierConfig],
    'react-hooks/exhaustive-deps': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'react/hook-use-state': 'error',
    'react/jsx-filename-extension': [
      0,
      {
        allow: 'as-needed',
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/no-array-index-key': 'error',
    'react/prop-types': 1, // warn
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  // lint settings for typescript files only
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'jest-dom'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'interface', format: ['PascalCase'] },
          { selector: 'typeLike', format: ['PascalCase'] },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true }],
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'react/jsx-uses-react': 'off',
        'react/prop-types': 0, // off
        'react/react-in-jsx-scope': 'off',
        'jest/no-conditional-expect': 'off',
        'nonblock-statement-body-position': 'off',
        'curly': ['error', 'all'],
      },
    },
  ],
}
