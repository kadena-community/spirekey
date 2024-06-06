export interface HideSidebarParams {
  iframe: HTMLIFrameElement;
}

export const createHideSidebar =
  ({ iframe }: HideSidebarParams) =>
  () => {
    iframe.classList.remove('spirekey-sidebar-opened');
  };
