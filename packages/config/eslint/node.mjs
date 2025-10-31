import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default function nodeEslint({ tsconfigDir = process.cwd(), ignores = [] } = {}) {
  return defineConfig([
    {
      ignores: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        'test/**/*.js', // <— ignora testes .js
        ...ignores,
      ],
    },

    js.configs.recommended,

    // Regras type-checked
    ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
      ...cfg,
      files: ['**/*.ts'],
    })),

    {
      files: ['**/*.ts'],
      languageOptions: {
        parserOptions: {
          // usa o tsconfig.eslint.json que você criou
          project: ['./tsconfig.eslint.json'],
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
        // evite encher por causa de handlers async sem await
        '@typescript-eslint/require-await': 'off',
        'prettier/prettier': 'error',
      },
    },

    prettierRecommended,
  ])
}
