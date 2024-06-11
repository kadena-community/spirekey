import { vi } from 'vitest';

const decode = vi.fn().mockReturnValue({
  authData: new Array(100),
});

export default { decode };
