import { EventBus } from '../event-bus';
import { SidebarManager } from '../sidebar-manager';

export interface ConnectParams {
  sidebarManager: SidebarManager;
  eventBus: EventBus;
}

export const disconnectFactory =
  ({ sidebarManager, eventBus }: ConnectParams) =>
  (): void => {
    sidebarManager.setIFramePath('/embedded/sidebar/');
    eventBus.publish({
      source: 'kadena-spirekey',
      name: 'account-disconnected',
    });
  };
