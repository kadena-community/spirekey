import { Account } from '@kadena/spirekey-types';
import { onSpireKeyEvent } from './functions/events';
import * as styles from './styles.css';

export class EmbedManager {
  public baseUrl: string;

  private window: Window;
  public popup: WindowProxy | null = null;
  public notification: HTMLIFrameElement;

  static manager: EmbedManager;

  static getInstance(baseUrl?: string): EmbedManager {
    if (!EmbedManager.manager)
      EmbedManager.manager = new EmbedManager(
        baseUrl || 'https://chainweaver.kadena.io',
      );
    if (baseUrl) EmbedManager.manager.updateBaseUrl(baseUrl);
    return EmbedManager.manager;
  }

  private getNotificationUrl(baseUrl: string) {
    return `${baseUrl}/embedded/notification`;
  }

  public updateBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
    this.notification.src = this.getNotificationUrl(baseUrl);
  }

  private makeNotification(baseUrl: string) {
    const iframe = document.createElement('iframe');
    iframe.classList.add(styles.spirekeyNotification);
    iframe.classList.add(styles.spirekeyNotificationHidden);
    iframe.src = this.getNotificationUrl(baseUrl);

    onSpireKeyEvent('minimize-notification', () => {
      this.minimizeNotification();
    });

    onSpireKeyEvent('maximize-notification', () => {
      this.maximizeNotification();
    });

    onSpireKeyEvent('show-notifications-sidebar', () => {
      this.hideNotification();
    });

    document.body.appendChild(iframe);

    return iframe;
  }

  constructor(baseUrl: string) {
    this.window = window;
    this.baseUrl = baseUrl;
    this.notification = this.makeNotification(this.baseUrl);
  }

  public openPopup(path: string) {
    const { width, height } = screen;
    const params = `width=500,height=${height},left=${width - 500},top=0,popup=1`;

    // for issue that the popup may be open somewhere in an (invisible to the user) tab, first try to close the popup.
    // inivisble because it could be below another application or minimized on desktop
    // or in a other tab on iOS
    this.closePopup();
    setTimeout(() => {
      this.popup = this.window.open(
        this.baseUrl + path,
        'SpireKeyPopup',
        params,
      );
    });
  }

  public closePopup() {
    this.popup?.close();
  }

  public areAccountsReady(accounts: Account[]) {
    const params = new URLSearchParams({ accounts: JSON.stringify(accounts) });
    this.notification.src =
      this.getNotificationUrl(this.baseUrl) + '#' + params.toString();
  }

  public showNotification() {
    this.notification.classList.remove(styles.spirekeyNotificationHidden);
  }

  public minimizeNotification() {
    this.notification.classList.add(styles.spirekeyNotificationMinimized);
  }

  public maximizeNotification() {
    this.notification.classList.remove(styles.spirekeyNotificationMinimized);
  }

  public async hideNotification() {
    this.notification.classList.add(styles.spirekeyNotificationHidden);
    this.notification.src = this.getNotificationUrl(this.baseUrl);
    // wait for notification animation to finish
    return new Promise((resolve) => setTimeout(resolve, 200));
  }
}
