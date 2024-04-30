import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next/navigation', () => require('next-router-mock'));
vi.mock('@simplewebauthn/browser');
vi.mock('@/utils/fund');
vi.mock('@kadena/client');
vi.mock('cbor');
