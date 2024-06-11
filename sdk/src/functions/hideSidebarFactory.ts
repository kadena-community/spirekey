import * as styles from '../styles.css';

export interface HideSidebarParams {
  iframe: HTMLIFrameElement;
}

export const hideSidebarFactory =
  ({ iframe }: HideSidebarParams) =>
  () => {
    iframe.classList.remove(styles.spirekeySidebarOpened);
  };
