import { accountName } from '../account-name';

describe('account-name', () => {
  const mocks = vi.hoisted(() => {
    return {
      local: vi.fn(),
    };
  });

  beforeEach(async () => {
    vi.mock('@/utils/shared/client', async () => {
      const actual = (await vi.importActual('@/utils/shared/client')) as {};
      return {
        ...actual,
        l1Client: {
          local: mocks.local,
        },
      };
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('accountName', () => {
    it('should return the correct info', async () => {
      mocks.local.mockResolvedValue({
        result: {
          status: 'success',
          data: {},
        },
      });

      const attrData = {
        networkId: 'testnet04',
        passKey: '1223',
        hdWalletKey: '456',
      };
      await accountName('_', attrData);

      expect(mocks.local).toBeCalledTimes(1);
      const cmdData = mocks.local.mock.calls[0][0].cmd;
      expect(
        cmdData.includes(
          `"signers":[{"pubKey":"${attrData.hdWalletKey}","scheme":"ED25519"}]`,
        ),
      ).toBe(true);
      expect(
        cmdData.includes(`"keys":["WEBAUTHN-${attrData.passKey}","456"]`),
      ).toBe(true);
    });
  });
});
