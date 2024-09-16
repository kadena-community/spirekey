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
    globals: true,
    reporters: ['default'],
    include: ['{src,tests}/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'happy-dom',
    env: {
      NAMESPACE: 'n_eef68e581f767dd66c4d4c39ed922be944ede505',
    },
    coverage: {
      enabled: true,
      include: ['**/src/**'],
      exclude: [
        '**/app/(embedded)/**',
        '**/app/(wallet)/**',
        'src/**/*.tsx',
        'src/**/*.d.ts',
        'src/components/**/index.ts',
        'src/**/*.css.ts',
        'src/**/*.md',
      ],
      provider: 'v8',
      thresholds: {
        lines: 24,
        functions: 32,
        branches: 50,
        statements: 24,
      },
    },
    setupFiles: [path.resolve(__dirname, './tests/test-mocks.ts')],
  },
});
