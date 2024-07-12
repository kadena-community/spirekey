import { createTransactionBuilder, type ChainId } from '@kadena/client';
import { Account } from '@kadena/spirekey-types';
import { getAccountFromChain } from './shared/account';

export type Credential = {
  pubKey: string;
  credentialId: string;
};
export type AccountBalance = {
  accountName: string;
  credentials: Credential[];
  balance: number;
  chainId: ChainId;
  networkId: string;
  target: ChainId;
  cost: number;
};
export const getOptimalTransfers = async (
  account: Account,
  amount: number,
  target: ChainId,
) => {
  const details = await Promise.all(
    account.chainIds.map(async (chainId) => {
      const details = await getAccountFromChain({
        accountName: account.accountName,
        networkId: account.networkId,
        chainId,
      });
      if (!details) return null;
      return {
        accountName: account.accountName,
        networkId: account.networkId,
        chainId,
        credentials: details.devices.flatMap((d) =>
          d.guard.keys.map((pubKey) => ({
            pubKey,
            credentialId: d['credential-id'],
          })),
        ),
        balance: details.balance,
        target,
        cost: 0,
      };
    }),
  );
  details.map((acc) => ({}));
};

export const sortAccountBalances =
  (target: ChainId) =>
  (
    a: Pick<AccountBalance, 'balance' | 'chainId'>,
    b: Pick<AccountBalance, 'balance' | 'chainId'>,
  ) => {
    if (a.chainId === target) return -1;
    if (b.chainId === target) return 1;
    return b.balance - a.balance;
  };

const module = `${process.env.NAMESPACE}.webauthn-wallet`;
type TransferCommand = ReturnType<typeof getTransferCommand>;
export const getTransferCommand = (accountBalance: AccountBalance) =>
  createTransactionBuilder({
    meta: {
      sender: accountBalance.accountName,
      chainId: accountBalance.chainId,
      gasLimit: 1500,
      gasPrice: 1e-8,
    },
  }).execution(
    `(${module}.transfer-crosschain
    "${accountBalance.accountName}"
    "${accountBalance.accountName}"
    (${module}.get-wallet-guard 
      "${accountBalance.accountName}"
    )
    "${accountBalance.target}"
    ${accountBalance.cost.toFixed(8)}
  )`,
  );
export const getTransferCaps =
  (accountBalance: AccountBalance) => (cmd: TransferCommand) =>
    accountBalance.credentials
      .reduce(
        (cmd, credential) =>
          cmd.addSigner(
            { pubKey: credential.pubKey, scheme: 'WebAuthn' },
            (withCap) => [
              withCap(
                `${module}.TRANSFER_XCHAIN`,
                accountBalance.accountName,
                accountBalance.accountName,
                { decimal: accountBalance.cost.toFixed(8) },
                accountBalance.target,
              ),
              withCap(`${module}.GAS`, accountBalance.accountName),
              withCap(
                `${module}.GAS_PAYER`,
                accountBalance.accountName,
                { int: 1 },
                1,
              ),
            ],
          ),
        cmd,
      )
      .setNetworkId(accountBalance.networkId)
      .createTransaction();
export const getTransferTransaction = (accountBalance: AccountBalance) => {
  const cmd = getTransferCommand(accountBalance);
  return getTransferCaps(accountBalance)(cmd);
};
