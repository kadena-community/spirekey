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
    GAS_STATION: `u:${process.env.NAMESPACE}.gas-station.enforce-guard-any:tY8VyiHmldvMOw4vxddWPZ0pQjBJyH-PrXxfku38VTo`,
  },
};

module.exports = withVanillaExtract(nextConfig);
