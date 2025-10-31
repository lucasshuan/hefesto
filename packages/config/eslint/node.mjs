import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default function nodeEslint({ tsconfigDir = process.cwd(), ignores = [] } = {}) {
  return defineConfig([
    { ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', ...ignores] },

    js.configs.recommended,

    ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
      ...cfg,
      files: ['**/*.ts'],
    })),

    {
      files: ['**/*.ts'],
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: tsconfigDir,
        },
        sourceType: 'commonjs',
        globals: {
          ...globals.node,
          ...globals.jest,
        },
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        'prettier/prettier': ['error', { endOfLine: 'auto' }]
      },
    },

    prettierRecommended,
  ])
}