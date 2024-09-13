import { renderHook } from '@testing-library/react-hooks';
import { connectWallet, useCredentials } from '../connect-wallet';

describe('connect-wallet', () => {
  const mocks = vi.hoisted(() => {
    return {
      useLazyQuery: vi.fn(),
      useQuery: vi.fn(),
      execute: vi.fn(),
      startAuthentication: vi.fn(),
      client: {
        query: vi.fn(),
      },
    };
  });

  beforeEach(async () => {
    vi.mock('@simplewebauthn/browser', async () => {
      const actual = (await vi.importActual('@simplewebauthn/browser')) as {};
      return {
        ...actual,
        startAuthentication: mocks.startAuthentication,
      };
    });

    vi.mock('@apollo/client', async () => {
      const actual = (await vi.importActual('@apollo/client')) as {};
      return {
        ...actual,
        useLazyQuery: mocks.useLazyQuery,
        useQuery: mocks.useQuery,
      };
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('useCredentials', () => {
    it('should throw when there is no credentials found', async () => {
      mocks.execute.mockResolvedValue({
        data: {
          connectWallet: undefined,
        },
      });
      mocks.useLazyQuery.mockReturnValue([mocks.execute]);

      const { result } = renderHook(() => useCredentials());

      await expect(
        async () => await result.current.getCredentials('testnet04'),
      ).rejects.toThrowError('No credentials found');
    });

    it('should have credentials', async () => {
      mocks.execute.mockResolvedValue({
        data: {
          connectWallet: 'TESTDATA',
        },
      });
      mocks.useLazyQuery.mockReturnValue([mocks.execute]);

      const { result } = renderHook(() => useCredentials());
      const dataResult = await result.current.getCredentials('testnet04');

      expect(dataResult).toEqual('TESTDATA');
    });
  });

  describe('connectWallet', () => {
    it('should throw when there are no credentials found in the graph', async () => {
      mocks.client.query.mockResolvedValue({
        data: {
          events: {
            __typename: 'QueryEventsConnection',
            totalCount: 1,
            edges: [],
          },
        },
        loading: false,
        networkStatus: 7,
      });
      mocks.startAuthentication.mockResolvedValue({
        response: {
          authenticatorData:
            'SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MdAAAAAA',
          clientDataJSON:
            'eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoicmVjb25uZWN0d2FsbGVzIiwib3JpZ2luIjoiaHR0cDovL2xvY2FsaG9zdDoxMzM3IiwiY3Jvc3NPcmlnaW4iOmZhbHNlfQ',
          signature:
            'MEUCIGcyhQnVw4DC6eCkmjUcRtjmK063upULaY6R8RuPpc0bAiEA4iUEnZvXCMGwg0AYkSOPiTqwVrK1zk5eIdbHCj-Lbjg',
          userHandle: 'CC1705666841788',
        },
        id: '-FE-JxHfiAYIayrs_K95QFHrnl4',
      });

      await expect(async () => {
        await connectWallet('_', { networkId: 'testnet04', chainId: '4' }, {
          client: mocks.client,
        } as any);
      }).rejects.toThrowError('No credentials found');
    });

    it('should return undefined when cid is empty', async () => {
      localStorage.setItem(
        'testnet04:wallet:cid',
        'VqF4-2dq3rWM9FkCgvhySRAcovcSD8SSiV0cgmWtoJs',
      );
      mocks.client.query.mockResolvedValue({
        data: {
          events: {
            __typename: 'QueryEventsConnection',
            totalCount: 1,
            edges: [
              {
                __typename: 'QueryEventsConnectionEdge',
                cursor:
                  'R1BDOko6WyJtMUJfVGZKakRlOEs0OU1uRUJTNGVLX2dLSWRMMkFRUGtsek5zaWJjZnBzIiwxLCJPaGI1a0txOGRMckdmdWJBVVpPSGc3bW1sQkdraFVlYVdjcmNYcjcwS2VRIl0=',
                node: {
                  __typename: 'Event',
                  chainId: 0,
                  parameters:
                    '["VqF4-2dq3rWM9FkCgvhySRAcovcSD8SSiV0cgmWtoJs","d9d50b0f2838692a79b82c07ef3151ffae5eb9ddd4b7934bab4a935111a793a2","localhost"]',
                },
              },
            ],
          },
        },
        loading: false,
        networkStatus: 7,
      });
      mocks.startAuthentication.mockResolvedValue({
        response: {
          authenticatorData:
            'SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MFAAAAAA',
          clientDataJSON:
            'eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoicmVjb25uZWN0d2FsbGVzIiwib3JpZ2luIjoiaHR0cDovL2xvY2FsaG9zdDoxMzM3IiwiY3Jvc3NPcmlnaW4iOmZhbHNlfQ',
          signature:
            'MEYCIQD1DxBQQhicL0FDK5tNhkU21GkUxQsW1oeCxToDbOHYyAIhAMDRISpLYZQhunUPuvCNk6QJ6tqr8djgw8tyzxLIBLLS',
          userHandle: 'SpireKey Wallet Manager (Testnet)1726214605211',
        },
        id: 'VqF4-2dq3rWM9FkCgvhySRAcovcSD8SSiV0cgmWtoJs',
      });

      const result = await connectWallet(
        '_',
        { networkId: 'testnet04', chainId: '4' },
        { client: mocks.client } as any,
      );

      expect(result).toEqual({
        publicKey:
          'd9d50b0f2838692a79b82c07ef3151ffae5eb9ddd4b7934bab4a935111a793a2',
        secretKey:
          'aa38a08c4ff4c05a95704b89109390bcc080f4513770ef584785b9f86c152a76',
      });
    });
  });
});
