import { renderHook } from '@testing-library/react-hooks';
import {
  createAccount,
  CreateAccountVariables,
  useCreateAccount,
} from '../create-account';

describe('create-account', () => {
  const createClientAttrs: CreateAccountVariables = {
    networkId: 'testnet04',
    publicKey:
      'c4fb3a6262b12e4a33c6afef824bbd88107ec8ee496e2b7b4ce5b390d9531c8c',
    alias: 'master of the universe',
    secretKey:
      '91d50fea212326e58e17dea2ab5a7ea2befefa080a319e4e5b5a3fa233a4c778',
    color: 'ff00ff',
    domain: 'etheria',
  };
  const mocks = vi.hoisted(() => {
    return {
      submit: vi.fn(),
      getNewWebauthnKey: vi.fn(),
      client: {
        query: vi.fn(),
      },
      useMutation: vi.fn(),
      mutate: vi.fn(),
    };
  });

  beforeEach(async () => {
    vi.mock('@apollo/client', async () => {
      const actual = await vi.importActual('@apollo/client');
      return {
        ...actual,
        useMutation: mocks.useMutation,
      };
    });

    vi.mock('@/utils/webauthnKey', async () => {
      const actual = await vi.importActual('@/utils/webauthnKey');
      return {
        ...actual,
        getNewWebauthnKey: mocks.getNewWebauthnKey,
      };
    });

    vi.mock('@/utils/shared/client', async () => {
      const actual = await vi.importActual('@/utils/shared/client');
      return {
        ...actual,
        l1Client: {
          submit: mocks.submit,
        },
      };
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('useCreateAccount', () => {
    it('should return the createAccount function', async () => {
      mocks.mutate.mockResolvedValue({
        data: {
          createAccount: 'test DATA',
        },
      });
      mocks.useMutation.mockReturnValue([mocks.mutate]);
      const { result } = renderHook(() => useCreateAccount());

      const data = await result.current.createAccount(createClientAttrs);
      expect(data).toEqual('test DATA');
    });

    it('should throw when there is no createAccount data', async () => {
      mocks.mutate.mockResolvedValue({
        data: {
          createAccount: undefined,
        },
      });
      mocks.useMutation.mockReturnValue([mocks.mutate]);
      const { result } = renderHook(() => useCreateAccount());

      await expect(
        async () => await result.current.createAccount(createClientAttrs),
      ).rejects.toThrowError('Account creation failed');
    });
  });

  describe('registerAccountOnChain', () => {
    it('should throw error, when there is no client', async () => {
      mocks.getNewWebauthnKey.mockResolvedValue({
        credentialId: 'CRED:123',
        hex: 'ff5733',
      });

      await expect(async () =>
        createAccount('-', createClientAttrs, {
          client: undefined,
        }),
      ).rejects.toThrowError('No client available');
    });

    it('should create an arrow of promises to get transactions for creating an account on a chain', async () => {
      mocks.getNewWebauthnKey.mockResolvedValue({
        credentialId: 'CRED:123',
        publicKey: 'pubKey-123',
        deviceType: 'desktop',
      });
      mocks.client.query.mockResolvedValue({
        data: {
          accountName: {
            name: 'r:he-man',
            guard: {
              keys: ['123'],
              pred: 'keys-any',
            },
          },
        },
      });

      mocks.submit.mockImplementation(async (signedTX) => {
        const cmd = JSON.parse(signedTX.cmd);
        return 'signedTX' + cmd.meta.chainId;
      });

      const data = await createAccount('-', createClientAttrs, {
        client: mocks.client,
      } as any);

      expect(data.txQueue.length).toEqual(20);
    });
  });
});
