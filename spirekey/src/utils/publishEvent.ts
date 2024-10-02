import type { SpireKeyEventName, SpireKeyEvents } from '@kadena/spirekey-types';

export function publishEvent<T extends SpireKeyEventName>(
  name: T,
  payload?: SpireKeyEvents[T],
): void {
  window.parent?.postMessage({ source: 'kadena-spirekey', name, payload }, '*');
  window.opener?.postMessage({ source: 'kadena-spirekey', name, payload }, '*');
}
