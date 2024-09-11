// vitest.config.mts
import { vanillaExtractPlugin } from "file:///Users/straatemans/Documents/projects/kadena/spirekey/node_modules/.pnpm/@vanilla-extract+vite-plugin@4.0.15_@types+node@22.5.1_terser@5.31.6_vite@5.4.2_@types+node@22.5.1_terser@5.31.6_/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import path from "path";
import { defineConfig } from "file:///Users/straatemans/Documents/projects/kadena/spirekey/node_modules/.pnpm/vitest@1.6.0_@types+node@22.5.1_happy-dom@15.0.0_jsdom@25.0.0_terser@5.31.6/node_modules/vitest/dist/config.js";
var __vite_injected_original_dirname = "/Users/straatemans/Documents/projects/kadena/spirekey/sdk";
var vitest_config_default = defineConfig({
  plugins: [vanillaExtractPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  test: {
    include: ["{src,tests}/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    globals: true,
    environment: "jsdom",
    coverage: {
      enabled: true,
      include: ["**/src/**"],
      provider: "v8",
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
        autoUpdate: false
      }
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3RyYWF0ZW1hbnMvRG9jdW1lbnRzL3Byb2plY3RzL2thZGVuYS9zcGlyZWtleS9zZGtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zdHJhYXRlbWFucy9Eb2N1bWVudHMvcHJvamVjdHMva2FkZW5hL3NwaXJla2V5L3Nkay92aXRlc3QuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc3RyYWF0ZW1hbnMvRG9jdW1lbnRzL3Byb2plY3RzL2thZGVuYS9zcGlyZWtleS9zZGsvdml0ZXN0LmNvbmZpZy5tdHNcIjtpbXBvcnQgeyB2YW5pbGxhRXh0cmFjdFBsdWdpbiB9IGZyb20gJ0B2YW5pbGxhLWV4dHJhY3Qvdml0ZS1wbHVnaW4nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3ZhbmlsbGFFeHRyYWN0UGx1Z2luKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgdGVzdDoge1xuICAgIGluY2x1ZGU6IFsne3NyYyx0ZXN0c30vKiovKi57dGVzdCxzcGVjfS4/KGN8bSlbanRdcz8oeCknXSxcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIGNvdmVyYWdlOiB7XG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgaW5jbHVkZTogWycqKi9zcmMvKionXSxcbiAgICAgIHByb3ZpZGVyOiAndjgnLFxuICAgICAgdGhyZXNob2xkczoge1xuICAgICAgICBsaW5lczogOTAsXG4gICAgICAgIGZ1bmN0aW9uczogOTAsXG4gICAgICAgIGJyYW5jaGVzOiA5MCxcbiAgICAgICAgc3RhdGVtZW50czogOTAsXG4gICAgICAgIGF1dG9VcGRhdGU6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1XLFNBQVMsNEJBQTRCO0FBQ3hZLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUY3QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHdCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMscUJBQXFCLENBQUM7QUFBQSxFQUNoQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTLENBQUMsOENBQThDO0FBQUEsSUFDeEQsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsU0FBUyxDQUFDLFdBQVc7QUFBQSxNQUNyQixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxVQUFVO0FBQUEsUUFDVixZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
