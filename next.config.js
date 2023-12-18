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
    GAS_STATION:
      "u:n_999ab0660c701e0c19ce8a529f2ed22c15127d41.gas-station.enforce-guard-any:tY8VyiHmldvMOw4vxddWPZ0pQjBJyH-PrXxfku38VTo",
  },
};

module.exports = withVanillaExtract(nextConfig);
