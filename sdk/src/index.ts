import { EmbedManager } from './embed-manager';
import { connect } from './functions/connectFactory';
import { sign } from './functions/signFactory';

type SpireKeySDK = {
  connect: typeof connect;
  sign: typeof sign;
};
const initSpireKey = (
  options: { hostUrl: string } = {
    hostUrl: 'https://spirekey.kadena.io',
  },
): SpireKeySDK => {
  EmbedManager.getInstance(options.hostUrl);
  return { connect, sign };
};

export * from './functions/events';
export * from './types';
export { connect, initSpireKey, sign };
