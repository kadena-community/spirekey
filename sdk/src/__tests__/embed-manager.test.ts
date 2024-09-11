import { EmbedManager } from './../embed-manager';

describe('embed-manager', () => {
  it('should have a max of 1 instance of EmbedManager', () => {
    new EmbedManager('masters-of-the-universe');
    const manager = EmbedManager.getInstance('he-man');
    new EmbedManager('masters-of-the-universe');
    const manager2 = EmbedManager.getInstance('skeletor');

    expect(manager).toBe(manager2);
    expect(manager.baseUrl).toBe('skeletor');
    expect(manager2.baseUrl).toBe('skeletor');
    expect(manager.baseUrl).toEqual(manager2.baseUrl);
  });

  it('should trigger events when manager is created', async () => {
    const manager = new EmbedManager('test');
    const spyHideNotification = vi.spyOn(manager, 'hideNotification');
    const spyMaximizeNotification = vi.spyOn(manager, 'maximizeNotification');
    const spyMinimizeNotification = vi.spyOn(manager, 'minimizeNotification');

    window.postMessage(
      {
        source: 'kadena-spirekey',
        name: 'show-notifications-sidebar',
        payload: {},
      },
      '*',
    );
    window.postMessage(
      {
        source: 'kadena-spirekey',
        name: 'maximize-notification',
        payload: {},
      },
      '*',
    );
    window.postMessage(
      {
        source: 'kadena-spirekey',
        name: 'minimize-notification',
        payload: {},
      },
      '*',
    );
    await vi.waitFor(
      () => expect(spyHideNotification).toHaveBeenCalledOnce(),
      1000,
    );
    await vi.waitFor(
      () => expect(spyMaximizeNotification).toHaveBeenCalledOnce(),
      1000,
    );
    await vi.waitFor(
      () => expect(spyMinimizeNotification).toHaveBeenCalledOnce(),
      1000,
    );
  });
});
