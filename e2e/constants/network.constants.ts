import type { ChainId } from '@kadena/types';

export const devnetHost = 'http://localhost:8080';
export const networkId = 'development';
export const devnetUrl = (chainId: ChainId) => {
  return `${devnetHost}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
};
export const webauthnWalletModule =
  'n_560eefcee4a090a24f12d7cf68cd48f11d8d2bd9.webauthn-wallet';
