const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kadena/react-ui"],
  env: {
    CHAINWEB_URL: process.env.CHAINWEB_URL,
    WALLET_URL: process.env.WALLET_URL,
    STRING_SIG: "true",
    NAMESPACE: process.env.NAMESPACE,
    NETWORK_ID: process.env.NETWORK_ID,
    CHAINWEB_DATA: process.env.CHAINWEB_DATA,
    GAS_STATION: process.env.GAS_STATION,
  },
};

module.exports = withVanillaExtract(nextConfig);
