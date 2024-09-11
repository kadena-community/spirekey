import { describe, expect, it, vi } from 'vitest';
import { onAccountConnected, onIsReady, onTransactionsSigned } from '../events';

describe('events', () => {
  describe('trigger events', () => {
    it('should trigger signed event', async () => {
      const cb = vi.fn();
      onTransactionsSigned(cb);
      const payload = {};

      window.postMessage(
        {
          source: 'kadena-spirekey',
          name: 'signed',
          payload,
        },
        '*',
      );

      await vi.waitFor(() => expect(cb).toHaveBeenCalledOnce(), 1000);
    });

    it('should trigger isReady event', async () => {
      const cb = vi.fn();
      onIsReady(cb);
      const payload = {};

      window.postMessage(
        {
          source: 'kadena-spirekey',
          name: 'isReady',
          payload,
        },
        '*',
      );

      await vi.waitFor(() => expect(cb).toHaveBeenCalledOnce(), 1000);
    });
  });
  describe('when firing events that are not registered', () => {
    it('should not trigger listeners when the source is different', async () => {
      const cb = vi.fn();
      onAccountConnected(cb);
      const payload = {};
      window.postMessage(
        { source: 'other-iframe', name: 'connected', payload },
        '*',
      );
      window.postMessage(
        {
          source: 'kadena-spirekey',
          name: 'connected',
          payload,
        },
        '*',
      );
      await vi.waitFor(() => expect(cb).toHaveBeenCalledOnce(), 1000);
    });

    it('should not trigger listeners when the name is different', async () => {
      const cb = vi.fn();
      onAccountConnected(cb);
      const payload = {};
      window.postMessage(
        {
          source: 'kadena-spirekey',
          name: 'something-not-registered',
          payload,
        },
        '*',
      );
      window.postMessage(
        {
          source: 'kadena-spirekey',
          name: 'connected',
          payload,
        },
        '*',
      );
      await vi.waitFor(() => expect(cb).toHaveBeenCalledOnce(), 1000);
    });
  });
});
