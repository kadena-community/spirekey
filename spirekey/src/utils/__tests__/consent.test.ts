import { getAccountsForTx } from '@/utils/consent';
import { type ChainId, createTransactionBuilder } from '@kadena/client';
import { Account, Device } from '@kadena/spirekey-types';

const createMockAccounts = ({
  pubKeys,
  chainId,
  networkId,
}: {
  pubKeys: string[];
  chainId: ChainId;
  networkId: string;
}): Account[] =>
  pubKeys.map((pubKey, i) => {
    const account = {
      networkId,
      accountName: `c:${pubKey}`,
      chainIds: [chainId],
      balance: '0.0',
      alias: `SpireKey Account ${i}`,
      minApprovals: 1,
      minRegistrationApprovals: 1,
      devices: [],
    };

    return addMockDevices(account, [pubKey]);
  });

const addMockDevices = (account: Account, pubKeys: string[]): Account => ({
  ...account,
  devices: [
    ...account.devices,
    ...pubKeys.map((pubKey) => {
      const device: Device = {
        guard: {
          keys: [pubKey],
          pred: 'keys-any',
        },
        color: '#000',
        domain: 'https://chainweaver.kadena.io',
        deviceType: 'phone',
        'credential-id': 'credid',
      };
      return device;
    }),
  ],
});

const getTxFixture = ({
  pubKeys,
  networkId,
  chainId,
}: {
  pubKeys: string[];
  networkId: string;
  chainId: ChainId;
}) => {
  const tx = createTransactionBuilder({
    meta: { chainId },
    networkId,
  }).execution(`(+ 1 1)`);
  for (const pubKey of pubKeys) {
    tx.addSigner({ pubKey, scheme: 'WebAuthn' });
  }
  return tx.createTransaction();
};

describe('consent', () => {
  describe('when getting accounts to sign with', () => {
    describe('and there are no applicable accounts', () => {
      describe('but the pubkey exists on a different network', () => {
        it('should add the account to the candidates list', () => {
          const pubKeys = ['WEBAUTHN-alice'];
          const tx = getTxFixture({
            pubKeys,
            chainId: '4',
            networkId: 'testnet04',
          });
          const accounts = createMockAccounts({
            chainId: '4',
            networkId: 'mainnet01',
            pubKeys,
          });
          const devices = getAccountsForTx(accounts)(tx);
          expect(devices.accounts).toEqual([]);
          expect(devices.candidates).toEqual(accounts);
        });
      });
      describe('but the pubkey exists on a different chain', () => {
        it('should add the account to the accounts list', () => {
          const pubKeys = ['WEBAUTHN-alice'];
          const tx = getTxFixture({
            pubKeys,
            chainId: '4',
            networkId: 'testnet04',
          });
          const accounts = createMockAccounts({
            chainId: '18',
            networkId: 'testnet04',
            pubKeys,
          });
          const devices = getAccountsForTx(accounts)(tx);
          expect(devices.accounts).toEqual(accounts);
          expect(devices.candidates).toEqual([]);
        });
      });
      describe('and the pubkey does not exists on a different network', () => {
        it('should keep the lists empty', () => {
          const pubKeys = ['WEBAUTHN-alice'];
          const tx = getTxFixture({
            pubKeys,
            chainId: '4',
            networkId: 'testnet04',
          });
          const accounts = createMockAccounts({
            chainId: '18',
            networkId: 'testnet04',
            pubKeys: ['WEBAUTHN-bob'],
          });
          const devices = getAccountsForTx(accounts)(tx);
          expect(devices.accounts).toEqual([]);
          expect(devices.candidates).toEqual([]);
        });
      });
    });
    describe('and there is one applicable account', () => {
      describe('and there is one one matching pubKey in the tx', () => {
        it('should add the account to the accounts list', () => {
          const pubKeys = ['WEBAUTHN-alice'];
          const tx = getTxFixture({
            pubKeys,
            chainId: '4',
            networkId: 'testnet04',
          });
          const accounts = createMockAccounts({
            chainId: '4',
            networkId: 'testnet04',
            pubKeys,
          });
          const devices = getAccountsForTx(accounts)(tx);
          expect(devices.accounts).toEqual(accounts);
          expect(devices.candidates).toEqual([]);
        });
      });
      describe('and there are multiple matching pubKeys', () => {
        it('should only add the account to the accounts list once', () => {
          const pubKeys = ['WEBAUTHN-alice', 'WEBAUTHN-alice-2'];
          const tx = getTxFixture({
            pubKeys,
            chainId: '4',
            networkId: 'testnet04',
          });
          const accounts = createMockAccounts({
            chainId: '4',
            networkId: 'testnet04',
            pubKeys: [pubKeys[0]],
          }).map((a) => addMockDevices(a, [pubKeys[1]]));
          const devices = getAccountsForTx(accounts)(tx);
          expect(devices.accounts).toEqual(accounts);
          expect(devices.candidates).toEqual([]);
        });
      });
    });
  });
});
