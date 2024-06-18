import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['{src,tests}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'jsdom',
    coverage: {
      enabled: true,
      include: ['**/src/**'],
      provider: 'v8',
      thresholds: {
        lines: 83.26,
        functions: 87.5,
        branches: 94.44,
        statements: 83.26,
        autoUpdate: true,
      },
    },
  },
});