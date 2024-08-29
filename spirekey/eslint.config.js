const react = require('eslint-plugin-react');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const unusedImports = require('eslint-plugin-unused-imports');
const tsConfig = require('typescript-eslint');

module.exports = [
  ...tsConfig.configs.recommended,
  {
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
      'unused-imports': unusedImports,
    },
    rules: {
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/mouse-events-have-key-events': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
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
    ],
  },
];
