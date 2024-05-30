export interface SpireKeyEvent {
  source: 'kadena-spirekey';
  name: string;
  payload?: Record<string, unknown>;
}

export interface SpireKeyWindow {
  connect: () => void;
  sign: (transaction: string) => void;
  onEvent: (callback: (data: SpireKeyEvent) => void) => void;
}
