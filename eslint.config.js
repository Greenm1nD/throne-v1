import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      'apps/api/src/db/migrations/**',
      'apps/web/scripts/**',
      // other Claude Code worktrees checked out under this repo path; not part of this tree
      '.claude/worktrees/**',
      // tool-generated scratch state (git-ignored); not source
      '.remember/**',
      // pre-existing site code; linted when it is next touched
      'apps/web/src/**',
      // pre-existing marketing/ops script outside the pnpm workspace (not apps/* or packages/*)
      'tech_integrations/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
]
