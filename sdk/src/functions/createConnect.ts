export interface ConnectParams {
  iframe: HTMLIFrameElement;
}

export const createConnect =
  ({ iframe }: ConnectParams) =>
  (): void => {
    iframe.classList.add('spirekey-sidebar-opened');
  };
