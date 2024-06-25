import { onSpireKeyEvent } from './functions/events';
import * as styles from './styles.css';

export class EmbedManager {
  public baseUrl: string;

  public sidebar: HTMLIFrameElement;
  public notification: HTMLIFrameElement;

  static manager: EmbedManager;

  static getInstance(baseUrl?: string) {
    if (!EmbedManager.manager)
      EmbedManager.manager = new EmbedManager(
        baseUrl || 'https://spirekey.kadena.io',
      );
    if (baseUrl) EmbedManager.manager.updateBaseUrl(baseUrl);
    return EmbedManager.manager;
  }

  private getSidebarUrl(baseUrl: string) {
    return `${baseUrl}/embedded/sidebar`;
  }

  private getNotificationUrl(baseUrl: string) {
    return `${baseUrl}/embedded/notification`;
  }

  public updateBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.sidebar.src = this.getSidebarUrl(baseUrl)
    this.notification.src = this.getNotificationUrl(baseUrl)
  }

  private makeSidebar(baseUrl: string) {
    const iframe = document.createElement('iframe');
    iframe.classList.add(styles.spirekeySidebar);
    iframe.src = this.getSidebarUrl(baseUrl)
    iframe.allow = 'publickey-credentials-get *';

    document.body.appendChild(iframe);

    return iframe;
  }

  private makeNotification(baseUrl: string) {
    const iframe = document.createElement('iframe');
    iframe.classList.add(styles.spirekeyNotification);
    iframe.classList.add(styles.spirekeyNotificationHidden);
    iframe.src = this.getNotificationUrl(baseUrl)

    onSpireKeyEvent('minimize-notification', () => {
      this.minimizeNotification();
    });

    onSpireKeyEvent('maximize-notification', () => {
      this.maximizeNotification();
    });

    onSpireKeyEvent('show-notifications-sidebar', () => {
      this.setSidebarPath('/embedded/sidebar/notifications');
      this.hideNotification();
      this.openSidebar();
    });

    document.body.appendChild(iframe);

    return iframe;
  }

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.sidebar = this.makeSidebar(this.baseUrl);
    this.notification = this.makeNotification(this.baseUrl);
  }

  public openSidebar() {
    this.sidebar.classList.add(styles.spirekeySidebarOpen);
  }

  public closeSidebar() {
    this.sidebar.classList.remove(styles.spirekeySidebarOpen);
  }

  public setSidebarPath(path: string) {
    this.sidebar.src = `${this.baseUrl}${path}`;
  }

  public minimizeNotification() {
    this.notification.classList.add(styles.spirekeyNotificationMinimized);
  }

  public maximizeNotification() {
    this.notification.classList.remove(styles.spirekeyNotificationMinimized);
  }

  public hideNotification() {
    this.notification.classList.add(styles.spirekeyNotificationHidden);
  }
}
