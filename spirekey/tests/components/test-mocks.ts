import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next/navigation', () => require('next-router-mock'));
vi.mock('@simplewebauthn/browser');
vi.mock('cbor');
vi.mock('@/utils/fund');

// Remove error logging for jsdom not understanding CSS stylesheet parsing
const originalConsoleError = console.error;
console.error = function (...data) {
  if (
    typeof data[0]?.toString === 'function' &&
    data[0].toString().includes('Error: Could not parse CSS stylesheet')
  )
    return;
  originalConsoleError(...data);
};
