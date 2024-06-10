import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vanillaExtractPlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
      include: ['**/src/**'],
      exclude: [
        '**/app/(examples)/**',
        '**/app/(embedded)/**',
        '**/app/(wallet)/**',
      ],
      provider: 'v8',
      thresholds: {
        lines: 23.11,
        functions: 31.03,
        branches: 46.9,
        statements: 23.11,
        autoUpdate: true,
      },
    },
    setupFiles: [path.resolve(__dirname, './tests/components/test-mocks.ts')],
  },
});