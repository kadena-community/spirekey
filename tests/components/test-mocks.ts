import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

import { mockL1Client } from '@mocks/@kadena/client';

vi.mock('next/navigation', () => require('next-router-mock'));
vi.mock('@simplewebauthn/browser');
vi.mock('@/utils/fund');
vi.mock('@kadena/client', async (importActual) => {
  const actual = await importActual<typeof import('@kadena/client')>();
  return {
    ...actual,
    createClient: vi.fn(() => mockL1Client),
  };
});

vi.mock('cbor', async () => {
  return {
    default: {
      decode: vi.fn().mockReturnValue({
        authData: new Array(100),
      }),
    },
  };
});
