import type { SpireKeyEvent } from './types';

const iframe = document.createElement('iframe');
const backdrop = document.createElement('div');

const showBackdrop = () => {
  document.body.appendChild(backdrop);
  requestAnimationFrame(() => {
    backdrop.classList.add('spirekey-backdrop-visible');
  });
};

const closeSidebar = () => {
  iframe.classList.remove('spirekey-sidebar-opened');
  backdrop.classList.remove('spirekey-backdrop-visible');
  backdrop.addEventListener('transitionend', () => {
    backdrop.remove();
  });
};

const connectWithSpireKey = () => {
  showBackdrop();
  iframe.classList.add('spirekey-sidebar-opened');
};

const signWithSpireKey = (transaction: string) => {
  showBackdrop();
  iframe.classList.add('spirekey-sidebar-opened');
  iframe.src = `http://localhost:1337/embedded/sidebar/#transaction=${transaction}`;
};

const onSpireKeyEvent = (callback: (data: SpireKeyEvent) => void): void => {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data?.source === 'kadena-spirekey') {
      callback(event.data);
    }
  });
};

const initSpireKey = () => {
  window.addEventListener('message', (event) => {
    if (event.data.source && event.data.source === 'kadena-spirekey') {
      console.log(
        `Message received from embedded (${event.data.name}): ${JSON.stringify(event.data.payload, null, 2)}`,
      );
    }
  });

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

  iframe.className = 'spirekey-sidebar';
  iframe.src = 'http://localhost:1337/embedded/sidebar';
  document.body.appendChild(iframe);

  backdrop.className = 'spirekey-backdrop';
  backdrop.addEventListener('click', closeSidebar);
};

export { connectWithSpireKey, initSpireKey, onSpireKeyEvent, signWithSpireKey };
export type { SpireKeyEvent };
