import { EmbedManager } from './embed-manager';
import { connect } from './functions/connectFactory';
import { onAccountConnected } from './functions/events';
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
  const embedManager = EmbedManager.getInstance(options.hostUrl);

  onAccountConnected(() => {
    embedManager.closeSidebar();
  });

  return { connect, sign };
};

export * from './functions/events';
export * from './types';
export { connect, initSpireKey, sign };
