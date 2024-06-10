export interface HideSidebarParams {
  iframe: HTMLIFrameElement;
}

export const hideSideBarFactory =
  ({ iframe }: HideSidebarParams) =>
  () => {
    iframe.classList.remove('spirekey-sidebar-opened');
  };
