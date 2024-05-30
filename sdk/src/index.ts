import type { SpireKeyEvent, SpireKeyWindow } from './types';

declare global {
  interface Window {
    spireKey: SpireKeyWindow;
  }
}

const initSpireKey = (
  options: { hostUrl?: string; enableBackdrop?: boolean } = {
    hostUrl: 'https://spirekey.kadena.io',
    enableBackdrop: false,
  },
) => {
  const iframe = document.createElement('iframe');
  iframe.className = 'spirekey-sidebar';

  let backdrop = document.createElement('div');

  const showBackdrop = () => {
    backdrop.className = 'spirekey-backdrop';
    backdrop.addEventListener('click', closeSidebar);
    document.body.appendChild(backdrop);
    requestAnimationFrame(() => {
      backdrop.classList.add('spirekey-backdrop-visible');
    });
  };

  const closeSidebar = () => {
    iframe.classList.remove('spirekey-sidebar-opened');

    if (options.enableBackdrop) {
      backdrop.classList.remove('spirekey-backdrop-visible');
      backdrop.addEventListener('transitionend', () => {
        backdrop.remove();
        backdrop = document.createElement('div');
      });
    }
  };

  const connect = (): void => {
    options.enableBackdrop && showBackdrop();
    iframe.classList.add('spirekey-sidebar-opened');
  };

  const sign = (transaction: string): void => {
    options.enableBackdrop && showBackdrop();
    iframe.classList.add('spirekey-sidebar-opened');
    iframe.src = `${options.hostUrl}/embedded/sidebar/#transaction=${transaction}`;
  };

  const onEvent = (callback: (data: SpireKeyEvent) => void): void => {
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data?.source === 'kadena-spirekey') {
        callback(event.data);
      }
    });
  };

  const style = document.createElement('style');
  style.textContent = `
    .spirekey-sidebar {
      border: 0;
      width: 500px;
      height: 100%;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 999999;
      transform: translateX(100%);
      transition: transform 400ms ease-in-out;
    }

    .spirekey-sidebar-opened {
      transform: translateX(0%);
    }

    .spirekey-backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: opacity 400ms ease-in-out;
    }

    .spirekey-backdrop-visible {
      z-index: 999998;
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  iframe.src = `${options.hostUrl}/embedded/sidebar`;
  document.body.appendChild(iframe);

  window.addEventListener('message', (event) => {
    if (
      event.data?.source === 'kadena-spirekey' &&
      event.data?.name === 'close-sidebar'
    ) {
      closeSidebar();
    }
  });

  const functions = { connect, sign, onEvent };
  window.spireKey = functions;

  return functions;
};

export { initSpireKey };
export type { SpireKeyEvent, SpireKeyWindow };
