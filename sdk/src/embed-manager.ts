import { Account } from '@kadena/spirekey-types';
import { onSpireKeyEvent } from './functions/events';
import * as styles from './styles.css';

export class EmbedManager {
  public baseUrl: string;
  public useRAccount: boolean;

  public popup: WindowProxy | null = null;
  public notification: HTMLIFrameElement;

  static manager: EmbedManager;

  static getInstance(baseUrl?: string, useRaccount?: boolean): EmbedManager {
    if (!EmbedManager.manager)
      EmbedManager.manager = new EmbedManager(
        baseUrl || 'https://spirekey.kadena.io',
        useRaccount || false,
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

  constructor(baseUrl: string, useRAccount: boolean) {
    this.baseUrl = baseUrl;
    this.notification = this.makeNotification(this.baseUrl);
    this.useRAccount = useRAccount;
  }

  public openPopup(path: string) {
    const { width, height } = screen;
    const params = `width=500,height=${height},left=${width - 500},top=0,popup=1`;
    this.popup = open(this.baseUrl + path + `&use-raccount=${this.useRAccount}`, 'SpireKeyPopup', params);
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

  public hideNotification() {
    this.notification.classList.add(styles.spirekeyNotificationHidden);
    this.notification.src = this.getNotificationUrl(this.baseUrl);
  }
}
