import { describe, expect, it, vi } from 'vitest';
import { onAccountConnected } from '../events';

describe('events', () => {
  describe('when firing events that are not registered', () => {
    it('should not trigger listeners when the source is different', () => {
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
      vi.waitFor(() => expect(cb).toHaveBeenCalledOnce(), 1000);
    });

    it('should not trigger listeners when the name is different', () => {
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
      vi.waitFor(() => expect(cb).toHaveBeenCalledOnce(), 1000);
    });
  });
});
