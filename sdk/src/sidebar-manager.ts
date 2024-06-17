import * as styles from './styles.css';

export class SidebarManager {
  public baseUrl: string;

  public iframe: HTMLIFrameElement;

  static makeIFrame = (baseUrl: string) => {
    const iframe = document.createElement('iframe');
    iframe.classList.add(styles.spirekeySidebar);
    iframe.src = `${baseUrl}/embedded/sidebar`;
    iframe.allow = 'publickey-credentials-get *';

    document.body.appendChild(iframe);

    return iframe;
  };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.iframe = SidebarManager.makeIFrame(this.baseUrl);
  }

  public open() {
    this.iframe.classList.add(styles.spirekeySidebarOpen);
  }

  public close() {
    this.iframe.classList.remove(styles.spirekeySidebarOpen);
  }

  public setIFramePath(path: string) {
    this.iframe.src = `${this.baseUrl}${path}`;
  }
}
