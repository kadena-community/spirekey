import { connectFactory } from './functions/connectFactory';
import { hideSidebarFactory } from './functions/hideSidebarFactory';
import { signFactory } from './functions/signFactory';
import type { SpireKeyEvent, SpireKeyWindow } from './types';

import * as styles from './styles.css';

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
  iframe.className = styles.spirekeySidebar;
  iframe.src = `${options.hostUrl}/embedded/sidebar`;
  iframe.allow = 'publickey-credentials-get *';
  document.body.appendChild(iframe);

  const hideSidebar = hideSidebarFactory({ iframe });

  window.addEventListener('message', (event) => {
    if (
      event.data?.source === 'kadena-spirekey' &&
      event.data?.name === 'close-sidebar'
    ) {
      hideSidebar();
    }
  });

  const functions = {
    connect: connectFactory({ iframe, hideSidebar }),
    sign: signFactory({ iframe }),
    onEvent,
  };

  window.spireKey = functions;

  return functions;
};

export * from './types';
export { initSpireKey, onEvent };
