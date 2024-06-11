import { spinner as spinnerHtml } from './spinner';

import * as styles from './styles.css';

export class SidebarManager {
  public iframeUrl: string;
  public sidebar: HTMLDivElement;
  public iframe: HTMLIFrameElement;
  public header: HTMLDivElement;
  public body: HTMLDivElement;
  public spinner: HTMLDivElement;
  public closeButton: HTMLButtonElement;
  private isLoading: boolean = true;

  static makeSidebar = (): HTMLDivElement => {
    document.querySelector('.spirekey-sidebar')?.remove();
    const sidebar = document.createElement('div');
    sidebar.classList.add(styles.spirekeySidebar);

    document.body.appendChild(sidebar);

    return sidebar;
  };

  static makeHeader = (sidebar: HTMLDivElement): HTMLDivElement => {
    const header = document.createElement('div');
    header.classList.add(styles.spirekeySidebarHeader);

    sidebar.appendChild(header);

    return header;
  };

  static makeBody = (sidebar: HTMLDivElement): HTMLDivElement => {
    const header = document.createElement('div');
    header.classList.add(styles.spirekeySidebarBody);

    sidebar.appendChild(header);

    return header;
  };

  static makeSpinner = (body: HTMLDivElement): HTMLDivElement => {
    const spinner = document.createElement('div');
    spinner.classList.add(styles.spirekeySidebarSpinner);
    spinner.innerHTML = spinnerHtml;

    body.appendChild(spinner);

    return spinner;
  };

  static makeCloseButton = (header: HTMLDivElement): HTMLButtonElement => {
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';

    header.appendChild(closeButton);

    return closeButton;
  };

  static makeIFrame = (url: string, body: HTMLDivElement) => {
    const iframe = document.createElement('iframe');
    iframe.classList.add(
      styles.spirekeySidebarIFrame,
      styles.spirekeySidebarIFrameHidden,
    );
    iframe.src = `${url}/embedded/sidebar`;

    body.appendChild(iframe);

    return iframe;
  };

  constructor(iframeUrl: string) {
    this.iframeUrl = iframeUrl;
    this.sidebar = SidebarManager.makeSidebar();
    this.header = SidebarManager.makeHeader(this.sidebar);
    this.body = SidebarManager.makeBody(this.sidebar);
    this.spinner = SidebarManager.makeSpinner(this.body);
    this.iframe = SidebarManager.makeIFrame(iframeUrl, this.body);
    this.closeButton = SidebarManager.makeCloseButton(this.header);

    this.registerEventListeners();
  }

  public open() {
    this.sidebar.classList.add(styles.spirekeySidebarOpen);
  }

  public close() {
    this.sidebar.classList.remove(styles.spirekeySidebarOpen);
  }

  public setIFramePath(path: string) {
    this.setIsLoading(true);
    this.iframe.src = `${this.iframeUrl}${path}`;
  }

  public setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.toggleSpinner();
  }

  private toggleSpinner() {
    this.spinner.classList.toggle(
      styles.spirekeySidebarSpinnerHidden,
      !this.isLoading,
    );
    this.iframe.classList.toggle(
      styles.spirekeySidebarIFrameHidden,
      this.isLoading,
    );
  }

  private registerEventListeners() {
    this.closeButton.addEventListener('click', () => {
      this.close();
    });

    this.iframe.addEventListener('load', () => {
      this.setIsLoading(false);
    });
  }
}
