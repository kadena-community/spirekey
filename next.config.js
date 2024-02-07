const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const testnetVars = {
  NAMESPACE: 'n_eef68e581f767dd66c4d4c39ed922be944ede505',
  GAS_STATION:
    'u:n_eef68e581f767dd66c4d4c39ed922be944ede505.gas-station.enforce-guard-any:dorjIaX8IGJZtfgZzYRkXV0DE9mEPxPvyuwdmML5eTk',
};

const useTestnet = false;

const DEFAULT = {
  CHAINWEB_URL: process.env.CHAINWEB_URL,
  WALLET_URL: process.env.WALLET_URL,
  NAMESPACE: process.env.NAMESPACE,
  NETWORK_ID: process.env.NETWORK_ID,
  CHAINWEB_DATA: process.env.CHAINWEB_DATA,
  GAS_STATION: process.env.GAS_STATION,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kadena/react-ui'],
  env: useTestnet
    ? {
        ...DEFAULT,
        ...testnetVars,
      }
    : DEFAULT,
};

module.exports = withVanillaExtract(nextConfig);
