import { connectFactory } from './functions/connectFactory';
import { hideSideBarFactory } from './functions/hideSidebarFactory';
import { signFactory } from './functions/signFactory';
import type { SpireKeyEvent, SpireKeyWindow } from './types';

import './styles.css';

declare global {
  interface Window {
    spireKey: SpireKeyWindow;
  }
}

const onEvent = (callback: (data: SpireKeyEvent) => void): void => {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data?.source === 'kadena-spirekey') {
      callback(event.data);
    }
  });
};

const initSpireKey = (
  options: { hostUrl: string } = {
    hostUrl: 'https://spirekey.kadena.io',
  },
) => {
  const iframe = document.createElement('iframe');
  iframe.className = 'spirekey-sidebar';

  iframe.src = `${options.hostUrl}/embedded/sidebar`;
  document.body.appendChild(iframe);

  const hideSidebar = hideSideBarFactory({ iframe });

  window.addEventListener('message', (event) => {
    if (
      event.data?.source === 'kadena-spirekey' &&
      event.data?.name === 'close-sidebar'
    ) {
      hideSidebar();
    }
  });

  const functions = {
    connect: connectFactory({ iframe }),
    sign: signFactory({ hostUrl: options.hostUrl, iframe }),
    onEvent,
  };

  window.spireKey = functions;

  return functions;
};

export { initSpireKey, onEvent };
export type { SpireKeyEvent, SpireKeyWindow };
