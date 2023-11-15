const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kadena/react-ui"],
  env: {
    CHAINWEB_URL: process.env.CHAINWEB_URL,
    WALLET_URL: process.env.WALLET_URL,
  },
};

module.exports = withVanillaExtract(nextConfig);
