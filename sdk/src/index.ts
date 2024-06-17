import { connectFactory } from './functions/connectFactory';
import { onAccountConnected } from './functions/events';
import { signFactory } from './functions/signFactory';
import { SidebarManager } from './sidebar-manager';
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
  const sidebarManager = SidebarManager.getInstance(options.hostUrl);

  onAccountConnected(() => {
    sidebarManager.close();
  });

  const functions = {
    connect: connectFactory({ sidebarManager }),
    sign: signFactory({ sidebarManager }),
  };

  window.spireKey = functions;

  return { functions };
};

export * from './functions/events';
export * from './types';
export { initSpireKey };
