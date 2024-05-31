export interface ConnectParams {
  iframe: HTMLIFrameElement;
}

export const connectFactory =
  ({ iframe }: ConnectParams) =>
  (): void => {
    iframe.classList.add('spirekey-sidebar-opened');
  };
