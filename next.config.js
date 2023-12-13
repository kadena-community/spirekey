const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kadena/react-ui"],
  env: {
    CHAINWEB_URL: process.env.CHAINWEB_URL,
    WALLET_URL: process.env.WALLET_URL,
    STRING_SIG: "true",
    NAMESPACE: "n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9",
  },
};

module.exports = withVanillaExtract(nextConfig);
