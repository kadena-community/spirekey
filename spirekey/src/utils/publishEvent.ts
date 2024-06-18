import type { SpireKeyEventName, SpireKeyEvents } from '@kadena-spirekey/types';

export function publishEvent<T extends SpireKeyEventName>(
  name: T,
  ...args: SpireKeyEvents[T] extends void ? [] : [SpireKeyEvents[T]]
): void;

export function publishEvent<T extends SpireKeyEventName>(
  name: T,
  ...args: any[]
): void {
  const payload = args[0];
  window.parent.postMessage({ source: 'kadena-spirekey', name, payload }, '*');
}
