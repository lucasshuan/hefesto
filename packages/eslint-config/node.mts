import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default function nodeEslint({
  tsconfigDir = process.cwd(),
  ignores = [],
} = {}) {
  return defineConfig([
    {
      ignores: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        'test/**/*.js',
        ...ignores,
      ],
    },

    js.configs.recommended,

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
          ...globals.jest,
        },
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/require-await': 'off',
        'prettier/prettier': 'error',
      },
    },

    prettierRecommended,
  ])
}
