const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kadena/react-ui"],
  env: {
    VERCEL_URL: process.env.VERCEL_URL,
  },
};

module.exports = withVanillaExtract(nextConfig);
