const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kadena/react-ui'],
  env: {
    CHAINWEB_URL: process.env.CHAINWEB_URL,
    WALLET_URL: process.env.WALLET_URL,
    STRING_SIG: 'true',
    NAMESPACE: process.env.NAMESPACE,
    CHAINWEB_DATA: process.env.CHAINWEB_DATA,
    GAS_STATION: process.env.GAS_STATION,
    INSTA_FUND: process.env.INSTA_FUND,
    CHAIN_ID: process.env.CHAIN_ID,
    DEVNET_NETWORK_ID: process.env.DEVNET_NETWORK_ID,
    AUTO_REGISTER_MAINNET: process.env.AUTO_REGISTER_MAINNET,
    DAPP_NETWORK_ID: process.env.DAPP_NETWORK_ID,
  },
};

module.exports = withVanillaExtract(nextConfig);
