import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['./src/*.test.ts', './tests/**/*.test.ts'],
    environment: 'jsdom',
    env: {
      NAMESPACE: 'n_eef68e581f767dd66c4d4c39ed922be944ede505',
    },
    coverage: {
      enabled: true,
      provider: 'v8',
      thresholds: {
        lines: 3.46,
        functions: 7.78,
        branches: 18.68,
        statements: 3.46,
        autoUpdate: true,
      },
    },
  },
});
