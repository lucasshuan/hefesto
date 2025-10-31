import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import next from '@next/eslint-plugin-next'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default function nextEslint({ tsconfigDir = process.cwd(), ignores = [] } = {}) {
  return defineConfig([
    { ignores: ['**/node_modules/**', '**/.next/**', '**/out/**', 'next-env.d.ts', ...ignores] },

    js.configs.recommended,
    next.configs['core-web-vitals'],

    ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
      ...cfg,
      files: ['**/*.ts', '**/*.tsx'],
    })),

    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: tsconfigDir,
        },
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'warn'
      },
    },

    prettierRecommended,
  ])
}