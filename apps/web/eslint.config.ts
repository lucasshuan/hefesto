import nextEslint from '@hefesto/eslint-config/next'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default nextEslint({
  tsconfigDir: __dirname,
})
