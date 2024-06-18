import type {
  SpireKeyEventName,
  SpireKeyEventPayloads,
} from '@kadena-spirekey/types';

export function publishEvent<T extends SpireKeyEventName>(
  name: T,
  ...args: SpireKeyEventPayloads[T] extends void
    ? []
    : [SpireKeyEventPayloads[T]]
): void;

export function publishEvent<T extends SpireKeyEventName>(
  name: T,
  ...args: any[]
): void {
  const payload = args[0];
  window.parent.postMessage({ source: 'kadena-spirekey', name, payload }, '*');
}
