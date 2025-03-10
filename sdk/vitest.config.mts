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
    globals: true,
    environment: 'happy-dom',
    coverage: {
      enabled: true,
      include: ['**/src/**'],
      provider: 'v8',
      thresholds: {
        lines: 90,
        functions: 88,
        branches: 90,
        statements: 90,
        autoUpdate: false,
      },
    },
  },
});
