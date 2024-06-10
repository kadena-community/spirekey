export interface SignParams {
  hostUrl: string;
  iframe: HTMLIFrameElement;
}

export const signFactory =
  ({ hostUrl, iframe }: SignParams) =>
  (transaction: string): void => {
    iframe.classList.add('spirekey-sidebar-opened');
    iframe.src = `${hostUrl}/embedded/sidebar/#transaction=${transaction}`;
  };
