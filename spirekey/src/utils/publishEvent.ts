import type {
  SpireKeyEventName,
  SpireKeyEventPayloads,
} from '@kadena-spirekey/sdk';

export const publishEvent = <T extends SpireKeyEventName>(
  name: T,
  payload: SpireKeyEventPayloads[T],
): void => {
  window.parent.postMessage({ source: 'kadena-spirekey', name, payload }, '*');
};
