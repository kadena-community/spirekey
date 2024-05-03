import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vanillaExtractPlugin(), react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    include: ['{src,tests}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'jsdom',
    env: {
      NAMESPACE: 'n_eef68e581f767dd66c4d4c39ed922be944ede505',
    },
    coverage: {
      enabled: true,
      provider: 'v8',
      thresholds: {
        lines: 10.58,
        functions: 19.37,
        branches: 34.01,
        statements: 10.58,
        autoUpdate: true,
      },
    },
    setupFiles: ['./tests/components/test-mocks.ts'],
  },
});