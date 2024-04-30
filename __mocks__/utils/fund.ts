import { vi } from 'vitest';

export const fundAccount = vi
  .fn()
  .mockResolvedValue({ result: { status: 'success' } });
