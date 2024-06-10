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
        lines: 23.59,
        functions: 40,
        branches: 70,
        statements: 23.59,
        autoUpdate: true,
      },
    },
  },
});