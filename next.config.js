const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kadena/react-ui"],
  experimental: {
    appDir: true,
  },
  env: {
    WEBAUTHN_MOCK: process.env.WEBAUTHN_MOCK,
  },
};

module.exports = withVanillaExtract(nextConfig);
