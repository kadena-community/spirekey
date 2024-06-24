import { beforeEach, describe, expect, it, vi, vitest } from 'vitest';
import { onAccountConnected, publishEvent } from '../events';

describe('events', () => {
  describe('when firing events that are not registered', () => {
    it('should not trigger listeners', () => {
      const cb = vi.fn();
      onAccountConnected(cb);
      const payload = {};
      const name = 'connected';
      window.postMessage({ source: 'other-iframe', name, payload }, '*');
      window.postMessage(
        {
          source: 'kadena-spirekey',
          name: 'something-not-registered',
          payload,
        },
        '*',
      );
      expect(cb).not.toHaveBeenCalled();
    });
  });
});
