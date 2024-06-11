import { EventBus } from './event-bus';
import { connectFactory } from './functions/connectFactory';
import { disconnectFactory } from './functions/disconnectFactory';
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
  const sidebarManager = new SidebarManager(options.hostUrl);
  const eventBus = new EventBus();

  eventBus.subscribe('account-connected', () => {
    sidebarManager.close();
  });

  const functions = {
    connect: connectFactory({ sidebarManager }),
    disconnect: disconnectFactory({ sidebarManager, eventBus }),
    sign: signFactory({ sidebarManager }),
  };

  window.spireKey = functions;

  return { functions, eventBus };
};

export * from './types';
export { initSpireKey };
