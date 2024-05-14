import { ChainId } from '@kadena/client';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      AUTO_REGISTER_MAINNET: string;
      INSTA_FUND: string;
      DEVNET_NETWORK_ID: string;
      DAPP_NETWORK_ID: string;
      WALLET_NETWORK_ID: string;
      CHAIN_ID: ChainId;
      NAMESPACE: string;
      GAS_STATION: string;
      WALLET_URL: string;
      DEVNET_HOST: string;
      CHAINWEB_URL: string;
      MERCHANT_ACCOUNT: string;
      ACCOUNT_OPERATIONS: string;
      CAPABILITY_TRANSLATIONS: string;
    }
  }
}
