import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import next from '@next/eslint-plugin-next'
import globals from 'globals'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default function nextEslint({
  tsconfigDir = process.cwd(),
  ignores = [],
} = {}) {
  return defineConfig([
    {
      ignores: [
        '**/node_modules/**',
        '**/.next/**',
        '**/out/**',
        'next-env.d.ts',
        ...ignores,
      ],
    },

    js.configs.recommended,
    next.configs['core-web-vitals'],

    ...tseslint.configs.recommended,

    {
      files: ['**/*.ts'],
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.eslint.json'],
          tsconfigRootDir: tsconfigDir,
        },
        globals: {
          ...globals.node,
        },
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/require-await': 'off',
      },
    },

    prettierRecommended,
  ])
}
