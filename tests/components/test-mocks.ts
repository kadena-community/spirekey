import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next/navigation', () => require('next-router-mock'));
vi.mock('@simplewebauthn/browser');
vi.mock('cbor');

vi.mock('src/utils/fund');
