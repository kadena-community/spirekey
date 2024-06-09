import { SidebarManager } from '../sidebar-manager';

export interface ConnectParams {
  sidebarManager: SidebarManager;
}

export const connectFactory =
  ({ sidebarManager }: ConnectParams) =>
  (): void => {
    sidebarManager.open();
  };
