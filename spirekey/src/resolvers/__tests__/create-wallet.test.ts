import { renderHook } from '@testing-library/react-hooks';
import { createWallet, useWallet } from '../create-wallet';

describe('create-wallet', () => {
  const NETWORKID = 'testnet04';
  const CHAINID = '4';

  const mocks = vi.hoisted(() => {
    return {
      getNewWebauthnKey: vi.fn(),
      submit: vi.fn(),
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

    vi.mock('@/utils/shared/client', async () => {
      const actual = await vi.importActual('@/utils/shared/client');
      return {
        ...actual,
        l1Client: {
          submit: mocks.submit,
        },
      };
    });

    vi.mock('@/utils/webauthnKey', async () => {
      const actual = await vi.importActual('@/utils/webauthnKey');
      return {
        ...actual,
        getNewWebauthnKey: mocks.getNewWebauthnKey,
      };
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('useWallet', () => {
    it('should return the createWallet function', async () => {
      mocks.mutate.mockResolvedValue({
        data: {
          createWallet: 'test DATA',
        },
      });
      mocks.useMutation.mockReturnValue([mocks.mutate]);
      const { result } = renderHook(() => useWallet());

      const data = await result.current.createWallet(NETWORKID, CHAINID);
      expect(data).toEqual('test DATA');
    });

    it('should throw when there is no createWallet data', async () => {
      mocks.mutate.mockResolvedValue({
        data: {
          createWallet: undefined,
        },
      });
      mocks.useMutation.mockReturnValue([mocks.mutate]);
      const { result } = renderHook(() => useWallet());

      await expect(
        async () => await result.current.createWallet(NETWORKID, CHAINID),
      ).rejects.toThrowError('Could not create wallet');
    });
  });
  describe('createWallet', () => {
    it('should submit the correct transaction', async () => {
      mocks.getNewWebauthnKey.mockResolvedValue({
        credentialId: 'CRED:123',
        hex: 'ff5733',
      });

      mocks.submit.mockResolvedValue({
        networkId: NETWORKID,
        chainId: CHAINID,
        credentialId: 'CRED:123',
        pubkey: '123',
        domain: 'localhost',
      });

      const result = await createWallet('_', {
        networkId: NETWORKID,
        chainId: CHAINID,
      });

      expect(result).toEqual({
        publicKey:
          'c4fb3a6262b12e4a33c6afef824bbd88107ec8ee496e2b7b4ce5b390d9531c8c',
        secretKey:
          '91d50fea212326e58e17dea2ab5a7ea2befefa080a319e4e5b5a3fa233a4c778',
      });

      expect(mocks.submit).toHaveBeenCalledOnce();
      expect(mocks.submit.mock.calls[0][0].sigs[0].pubKey).toEqual(
        '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
      );
    });

    it('should set the correct cid wallet in localstorage', () => {});
  });
});
