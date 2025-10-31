/* eslint-disable no-undef */
import { defineConfig } from 'orval';
import dotenv from 'dotenv';

dotenv.config()

export default defineConfig({
  hefesto: {
    input: (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001') + '/docs-json',
    output: {
      target: 'src/lib/api/generated.ts',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: 'src/lib/api/fetcher.ts',
          name: 'customAxios',
        },
      },
    },
  },
});