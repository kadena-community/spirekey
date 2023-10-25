const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kadena/react-ui"],
  experimental: {
    appDir: true,
  },
  env: {
    WEBAUTHN_MOCK: false,
  },
};

module.exports = withVanillaExtract(nextConfig);
