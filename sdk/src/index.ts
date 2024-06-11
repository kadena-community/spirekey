import { connectFactory } from '@/functions/connectFactory';
import { signFactory } from '@/functions/signFactory';
import type { SpireKeyEvent, SpireKeyWindow } from '@/types';

import { EventBus } from '@/event-bus';
import { disconnectFactory } from '@/functions/disconnectFactory';
import { SidebarManager } from '@/sidebar-manager';

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
