import {
  getAccountFromChain,
  getRAccountFromChain,
} from '@/utils/shared/account';
import {
  createTransactionBuilder,
  IBuilder,
  type ChainId,
} from '@kadena/client';
import { Account, OptimalTransactionsAccount } from '@kadena/spirekey-types';
import BigNumber from 'bignumber.js';

export type AccountBalance = {
  accountName: string;
  credentials: string[];
  balance: number;
  chainId: ChainId;
  networkId: string;
  cost: number;
};
export const getAccountBalances = (
  account: Pick<Account, 'chainIds' | 'accountName' | 'networkId'>,
) =>
  Promise.all(
    account.chainIds.map(async (chainId) => {
      const details = account.accountName.startsWith('r:')
        ? await getRAccountFromChain({
            accountName: account.accountName,
            networkId: account.networkId,
            chainId,
          })
        : await getAccountFromChain({
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
        balance: parseFloat(details.balance),
        cost: 0,
      };
    }),
  );

const getMinCost = (requested: number, available: number) => {
  if (available > requested) return requested;
  return available;
};
type OptimalTransfers = {
  required: number;
  balances: AccountBalance[];
};
const gasFeeMargins = 1e-4;
export const getOptimalTransfers = (
  accountBalances: AccountBalance[],
  target: ChainId,
  amount: number,
) => {
  const { balances, required } = accountBalances
    .sort(sortAccountBalances(target))
    .reduce(
      (r: OptimalTransfers, { balance, chainId, ...accountBalance }) => {
        if (r.required <= 0) return r;
        if (chainId === target)
          return {
            required: BigNumber(r.required).minus(balance).toNumber(),
            balances: [...r.balances],
          };

        const amount = getMinCost(
          r.required,
          balance > r.required
            ? balance
            : BigNumber(balance).minus(gasFeeMargins).toNumber(),
        );
        return {
          required: BigNumber(r.required).minus(amount).toNumber(),
          balances: [
            ...r.balances,
            { ...accountBalance, balance, chainId, cost: amount },
          ],
        };
      },
      { required: amount, balances: [] },
    );
  if (required > 0) return null;
  return balances.filter(({ chainId }) => chainId !== target);
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

export const getRAccountTransferCommand = (
  accountBalance: AccountBalance,
  target: ChainId,
) =>
  createTransactionBuilder({
    meta: {
      sender: accountBalance.accountName,
      chainId: accountBalance.chainId,
      gasLimit: 1500,
      gasPrice: 1e-8,
    },
  }).execution(
    `(coin.transfer-crosschain
      "${accountBalance.accountName}"
      "${accountBalance.accountName}"
      (at 'guard (coin.details
        "${accountBalance.accountName}"
      ))
      "${target}"
      ${accountBalance.cost.toFixed(8)}
    )`,
  );
export const getRAccountTransferCaps =
  (accountBalance: AccountBalance, target: ChainId) => (cmd: IBuilder<any>) =>
    accountBalance.credentials
      .reduce(
        (cmd, pubKey) =>
          cmd.addSigner({ pubKey, scheme: 'ED25519' }, (withCap) => [
            withCap(
              `coin.TRANSFER_XCHAIN`,
              accountBalance.accountName,
              accountBalance.accountName,
              { decimal: accountBalance.cost.toFixed(8) },
              target,
            ),
            withCap(`coin.GAS`),
          ]),
        cmd,
      )
      .setNetworkId(accountBalance.networkId)
      .createTransaction();

export const getTransferTransaction =
  (target: ChainId) => (accountBalance: AccountBalance) => {
    const cmd = getRAccountTransferCommand(accountBalance, target);
    return getRAccountTransferCaps(accountBalance, target)(cmd);
  };

export const getOptimalTransactions = async (
  account: OptimalTransactionsAccount,
  target: ChainId,
  amount: number,
) => {
  return [];
};
