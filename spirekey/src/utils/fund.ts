import {
  createTransaction,
  ICommandResult,
  type ChainId,
} from '@kadena/client';
import {
  addSigner,
  composePactCommand,
  execution,
  setMeta,
  setNetworkId,
} from '@kadena/client/fp';
import type { Account } from '@kadena/spirekey-types';

import { genesisPrivateKey, genesisPubKey } from '@/utils/constants';
import { asyncPipe } from '@/utils/shared/asyncPipe';
import { l1Client } from '@/utils/shared/client';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { signWithKeyPair } from '@/utils/signSubmitListen';

export const fundAccount = async (account: Account): Promise<ICommandResult> =>
  asyncPipe(
    getCommand(account),
    createTransaction,
    signWithKeyPair({
      publicKey: genesisPubKey,
      secretKey: genesisPrivateKey,
    }),
    l1Client.submit,
    l1Client.pollOne,
  )({});

const getCommand = (account: Account) => {
  if (account.networkId === getDevnetNetworkId())
    return fundLocally(account.accountName);
  if (account.networkId === 'testnet04')
    return fundViaFaucet(account.accountName);
  throw new Error(`Unsupported network: ${account.networkId}`);
};

const fundLocally = (accountName: string) =>
  composePactCommand(
    execution(
      `
      (coin.transfer
        "sender00"
        "${accountName}"
        100.0
      )
    `.trim(),
    ),
    setMeta({
      chainId: Math.floor(Math.random() * 20).toString() as ChainId,
      gasLimit: 10000,
      gasPrice: 0.0000001,
      ttl: 60000,
      senderAccount: 'sender00',
    }),
    addSigner(genesisPubKey, (withCap) => [
      withCap('coin.GAS'),
      withCap('coin.TRANSFER', 'sender00', accountName, 100),
    ]),
    setNetworkId(getDevnetNetworkId()),
  );

const fundViaFaucet = (accountName: string) =>
  composePactCommand(
    execution(
      `
      (n_d8cbb935f9cd9d2399a5886bb08caed71f9bad49.coin-faucet.request-coin "${accountName}" 100.0)
    `.trim(),
    ),
    setMeta({
      chainId: Math.floor(Math.random() * 20).toString() as ChainId,
      gasLimit: 10000,
      gasPrice: 0.0000001,
      ttl: 60000,
      senderAccount: 'c:Ecwy85aCW3eogZUnIQxknH8tG8uXHM5QiC__jeI0nWA', // faucet gas account
    }),
    addSigner(genesisPubKey, (withCap) => [
      withCap(
        'n_d8cbb935f9cd9d2399a5886bb08caed71f9bad49.coin-faucet.GAS_PAYER',
        accountName,
        { int: 1 },
        1,
      ),
      withCap(
        'coin.TRANSFER',
        'c:Ecwy85aCW3eogZUnIQxknH8tG8uXHM5QiC__jeI0nWA',
        accountName,
        100,
      ),
    ]),
    setNetworkId('testnet04'),
  );
