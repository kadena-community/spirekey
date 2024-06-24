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
        lines: 95.68,
        functions: 85,
        branches: 95.65,
        statements: 95.68,
        autoUpdate: true,
      },
    },
  },
});