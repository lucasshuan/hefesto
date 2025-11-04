import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import next from '@next/eslint-plugin-next'
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

    ...tseslint.configs.recommendedTypeChecked,

    {
      files: ['**/*.{ts,tsx,js,jsx}'],
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.eslint.json', './tsconfig.json'],
          tsconfigRootDir: tsconfigDir,
        },
      },
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-explicit-any': [
          'warn',
          { ignoreRestArgs: true },
        ],
        '@typescript-eslint/require-await': 'off',
      },
    },

    prettierRecommended,
  ])
}
