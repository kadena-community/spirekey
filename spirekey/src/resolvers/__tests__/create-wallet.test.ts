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
          '5a6274f271c36a7181721040543e43b0ae8d337f374d35e69dee817f4218410f',
        secretKey:
          '4fb2694dcd0345c839e6802d199781e7ba6f4ba67040f22817f7a1f11a031ff8',
      });

      expect(mocks.submit).toHaveBeenCalledOnce();
      expect(mocks.submit.mock.calls[0][0].sigs[0].pubKey).toEqual(
        '368820f80c324bbc7c2b0610688a7da43e39f91d118732671cd9c7500ff43cca',
      );
    });

    it('should set the correct cid wallet in localstorage', () => {});
  });
});
