import * as styles from './styles.css';

export class EmbedManager {
  public baseUrl: string;

  public sidebar: HTMLIFrameElement;
  public notification: HTMLIFrameElement;

  static manager: EmbedManager;

  static getInstance(baseUrl: string) {
    if (!EmbedManager.manager) EmbedManager.manager = new EmbedManager(baseUrl);
    return EmbedManager.manager;
  }

  private makeSidebar(baseUrl: string) {
    const iframe = document.createElement('iframe');
    iframe.classList.add(styles.spirekeySidebar);
    iframe.src = `${baseUrl}/embedded/sidebar`;
    iframe.allow = 'publickey-credentials-get *';

    document.body.appendChild(iframe);

    return iframe;
  }

  private makeNotification(baseUrl: string) {
    const iframe = document.createElement('iframe');
    iframe.classList.add(styles.spirekeyNotification);
    iframe.src = `${baseUrl}/embedded/notification`;

    window.addEventListener('message', (event) => {
      if (
        event.data.source === 'kadena-spirekey' &&
        event.data.name === 'toggle-notification'
      ) {
        this.minimizeNotification();
      }
    });

    window.addEventListener('message', (event) => {
      if (
        event.data.source === 'kadena-spirekey' &&
        event.data.name === 'toggle-sidebar-notifications'
      ) {
        this.minimizeNotification();
        this.openSidebar();
        this.setSidebarPath('/embedded/sidebar/notifications');
      }
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
    this.notification.classList.toggle(styles.spirekeyNotificationMinimized);
  }

  public removeNotification() {
    this.notification.remove();
  }
}
