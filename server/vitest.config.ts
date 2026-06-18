import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    testTimeout: 120000,
    hookTimeout: 120000,
    pool: 'forks',
    fileParallelism: false,
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
