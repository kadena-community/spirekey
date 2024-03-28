import { Device } from '@/context/AccountsContext';
import {
  arrayParameterValue,
  objectParameterValue,
  returnUrlWithDevice,
  searchParamsToString,
  urlWithSearchParams,
} from '@/utils/searchParameters';
import { describe, expect, it } from 'vitest';

describe('searchParameters', () => {
  describe('returnUrlWithDevice', () => {
    it('creates a return url with a device', async () => {
      const device: Device = {
        domain: 'http://localhost',
        color: '#000000',
        deviceType: 'phone',
        ['credential-id']: 'my-phone',
        guard: {
          keys: ['my-pubkey'],
          pred: 'keys-any',
        },
      };
      const returnUrl = returnUrlWithDevice('http://localhost', device);
      expect(returnUrl).toBe(
        'http://localhost/?device=eyJkb21haW4iOiJodHRwOi8vbG9jYWxob3N0IiwiY29sb3IiOiIjMDAwMDAwIiwiZGV2aWNlVHlwZSI6InBob25lIiwiY3JlZGVudGlhbC1pZCI6Im15LXBob25lIiwiZ3VhcmQiOnsia2V5cyI6WyJteS1wdWJrZXkiXSwicHJlZCI6ImtleXMtYW55In19',
      );
    });
  });

  describe('objectParameterValue', () => {
    it('stringifies and base64 encodes an object', async () => {
      expect(objectParameterValue({ hello: 'world' })).toBe(
        'eyJoZWxsbyI6IndvcmxkIn0=',
      );
    });
  });

  describe('arrayParameterValue', () => {
    it('stringifies an array', async () => {
      expect(arrayParameterValue([1, 2, 3, 'a', 'b', 'c'])).toBe(
        '[1,2,3,"a","b","c"]',
      );
    });
  });

  describe('urlWithSearchParams', () => {
    it('creates a URL with search parameters', async () => {
      const searchParameters = {
        hello: 'world',
        foo: 'bar',
      };
      const url = 'http://localhost';
      expect(urlWithSearchParams(url, searchParameters)).toBe(
        'http://localhost/?hello=world&foo=bar',
      );
    });

    it('includes search parameters already included in the url', async () => {
      const searchParameters = {
        hello: 'world',
        foo: 'bar',
      };
      const url = 'http://localhost?alice=bob';
      expect(urlWithSearchParams(url, searchParameters)).toBe(
        'http://localhost/?alice=bob&hello=world&foo=bar',
      );
    });

    it('encodes URI components', async () => {
      const searchParameters = { returnUrl: 'http://localhost' };
      const url = 'http://localhost';
      expect(urlWithSearchParams(url, searchParameters)).toBe(
        'http://localhost/?returnUrl=http%3A%2F%2Flocalhost',
      );
    });
  });

  describe('searchParamsToString', () => {
    it('creates a URL search parameter string from an object', async () => {
      const searchParameters = {
        hello: 'world',
        foo: 'bar',
      };
      expect(searchParamsToString(searchParameters)).toBe(
        'hello=world&foo=bar',
      );
    });

    it('encodes URI components', async () => {
      const searchParameters = { returnUrl: 'http://localhost' };
      expect(searchParamsToString(searchParameters)).toBe(
        'returnUrl=http%3A%2F%2Flocalhost',
      );
    });
  });
});
