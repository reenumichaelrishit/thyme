// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
// eslint-plugin
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginPromise from 'eslint-plugin-promise'
export default [
  {
    ignores: ['**/*.d.ts', '**/out', '**/*.js', '**/node_modules'],
  },
  ...tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
  ),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'prettier': eslintPluginPrettier,
      'promise': eslintPluginPromise,
    },
    rules: {
      'no-warn-ignore': 'off',
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  eslintConfigPrettier,
]