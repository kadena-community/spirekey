export interface SpireKeyEvent {
  source: 'kadena-spirekey';
  name: string;
  payload: Record<string, unknown>;
}
