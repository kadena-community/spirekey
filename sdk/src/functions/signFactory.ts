import { SidebarManager } from '../sidebar-manager';

export interface SignParams {
  sidebarManager: SidebarManager;
}

export const signFactory =
  ({ sidebarManager }: SignParams) =>
  (transaction: string): void => {
    sidebarManager.open();
    sidebarManager.setIFramePath(
      `/embedded/sidebar/#transaction=${transaction}`,
    );
  };
