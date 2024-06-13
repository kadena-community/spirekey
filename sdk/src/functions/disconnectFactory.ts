import { SidebarManager } from '../sidebar-manager';
import { publishEvent } from './events';

export interface ConnectParams {
  sidebarManager: SidebarManager;
}

export const disconnectFactory =
  ({ sidebarManager }: ConnectParams) =>
  (): void => {
    sidebarManager.setIFramePath('/embedded/sidebar/');
    publishEvent('disconnected', undefined);
  };
