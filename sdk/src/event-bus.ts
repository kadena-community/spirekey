import { SpireKeyEvent } from './types';

const supportedEvents = [
  'all',
  'account-connected',
  'account-disconnected',
] as const;

type SpireKeyEventName = (typeof supportedEvents)[number];

interface Subscription {
  eventName: SpireKeyEventName;
  callback: (event: SpireKeyEvent) => void;
}

export class EventBus {
  private subscriptions: Subscription[] = [];

  constructor() {
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data?.source !== 'kadena-spirekey') {
        return;
      }

      if (
        typeof event.data?.name === 'string' &&
        !supportedEvents.includes(event.data?.name)
      ) {
        console.warn(`SpireKey event "${event.data?.name}" is not supported.`);
        return;
      }

      this.publish(event.data);
    });
  }

  public publish(event: SpireKeyEvent) {
    this.subscriptions
      .filter(
        (subscription) =>
          subscription.eventName === event.name ||
          subscription.eventName == 'all',
      )
      .forEach((subscription) => {
        try {
          subscription.callback(event);
        } catch (e: unknown) {
          console.error(
            e instanceof Error ? e.message : 'Unknown SpireKey error.',
          );
        }
      });
  }

  public subscribeToAll(callback: (event: SpireKeyEvent) => void) {
    this.subscriptions.push({ eventName: 'all', callback });
  }

  public subscribe(
    eventName: SpireKeyEventName,
    callback: (event: SpireKeyEvent) => void,
  ) {
    this.subscriptions.push({ eventName, callback });
  }
}
