import { EmbedManager } from './embed-manager';
import { connect, connectFactory } from './functions/connectFactory';
import { onAccountConnected } from './functions/events';
import { sign, signFactory } from './functions/signFactory';
import type { SpireKeyWindow } from './types';

declare global {
  interface Window {
    spireKey: SpireKeyWindow;
  }
}

const initSpireKey = (
  options: { hostUrl: string } = {
    hostUrl: 'https://spirekey.kadena.io',
  },
) => {
  const embedManager = EmbedManager.getInstance(options.hostUrl);

  onAccountConnected(() => {
    embedManager.closeSidebar();
  });

  const functions = {
    connect: connectFactory({ embedManager }),
    sign: signFactory({ embedManager }),
  };

  window.spireKey = functions;

  return { functions };
};

export * from './functions/events';
export * from './types';
export { connect, initSpireKey, sign };
