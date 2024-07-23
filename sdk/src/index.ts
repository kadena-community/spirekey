import { EmbedManager } from './embed-manager';
import { connect, type ConnectedAccount } from './functions/connectFactory';
import { sign, type SignedTransactions } from './functions/signFactory';

type SpireKeySDK = {
  connect: typeof connect;
  sign: typeof sign;
};
const initSpireKey = (
  options: { hostUrl: string; useRAccount?: boolean } = {
    hostUrl: 'https://spirekey.kadena.io',
    useRAccount: false,
  },
): SpireKeySDK => {
  EmbedManager.getInstance(options.hostUrl, options.useRAccount);
  return { connect, sign };
};

export * from './functions/events';
export * from './types';
export {
  connect,
  initSpireKey,
  sign,
  type ConnectedAccount,
  type SignedTransactions,
};
