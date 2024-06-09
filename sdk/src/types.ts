export interface SpireKeyEvent {
  source: 'kadena-spirekey';
  name: string;
  payload?: Record<string, unknown>;
}

export interface SpireKeyWindow {
  connect: () => void;
  disconnect: () => void;
  sign: (transaction: string) => void;
}
