const react = require('eslint-plugin-react');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const tsConfig = require('typescript-eslint');

module.exports = [
  ...tsConfig.configs.recommended,
  {
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/mouse-events-have-key-events': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    },
  },
  { files: ['src/'] },
  {
    ignores: [
      'eslint.config.js',
      'next.config.js',
      '.next/',
      'coverage/',
      'src/app/(examples)/',
      'src/app/(wallet)/',
      'playwright-report/',
    ],
  },
];
