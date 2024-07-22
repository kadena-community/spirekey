import type { ChainId, ITransactionDescriptor } from '@kadena/client';
import type { Account } from '@kadena/spirekey-types';

import type { AddNotification } from '@/context/shared/NotificationsContext';

import { getNetworkDisplayName } from './getNetworkDisplayName';
import { registerAccountOnChain } from './register';
import { getAccountFromChain } from './shared/account';

type Credential = {
  type: string;
  publicKey: string;
  id: string;
};

type User = {
  alias: string;
  accountName: string;
  pendingTxIds: ITransactionDescriptor[];
  credentials: Credential[];
};

export const getUser = (account: Account): User => {
  const [device] = account.devices;
  return {
    alias: account.alias,
    accountName: account.accountName,
    pendingTxIds: device.pendingRegistrationTxs || [],
    credentials: [
      {
        type: 'WebAuthn',
        publicKey: device.guard.keys[0],
        id: device['credential-id'],
      },
    ],
  };
};

const getAccountWithNetworkError = async ({
  addNotification,
  accountName,
  networkId,
  chainId,
}: {
  addNotification: (config: AddNotification) => void;
  accountName: string;
  networkId: string;
  chainId: ChainId;
}) => {
  try {
    return await getAccountFromChain({
      accountName,
      networkId,
      chainId,
    });
  } catch (error) {
    addNotification({
      title: 'Network error',
      variant: 'error',
      message: "Couldn't find account information due to network problems",
    });
    throw new Error('Network error');
  }
};

export const onConnectWith =
  ({
    addNotification,
    redirect,
  }: {
    addNotification: (config: AddNotification) => void;
    redirect: (url: string) => void;
  }) =>
  ({
    url,
    networkId,
    chainId,
    account,
  }: {
    url: URL | string;
    networkId: string;
    chainId: ChainId;
    account: Account;
  }) =>
  async () => {
    const user = getUser(account);
    const remoteAccount = await getAccountWithNetworkError({
      addNotification,
      accountName: user.accountName,
      networkId: networkId,
      chainId,
    });
    if (typeof url === 'string') {
      addNotification({
        variant: 'error',
        title: `No return URL provided by the dApp.`,
      });
      return;
    }

    if (remoteAccount) {
      url.searchParams.set(
        'user',
        Buffer.from(JSON.stringify(user)).toString('base64'),
      );
      redirect(url.toString());
      return;
    }

    /**
     * The account does not exist on the given chain on the network.
     * Create the account on the fly if it has only one device.
     */
    if (account.devices.length !== 1) {
      addNotification({
        variant: 'error',
        title: `This account does not exist on ${getNetworkDisplayName(networkId)} on chain ${chainId} and cannot be created on the fly.`,
      });
      return;
    }

    // TODO: handle the cases where multiple devices are present on an account
    const device = account.devices[0];

    /**
     * Register the account on the chain where it did not exist
     */
    const pendingTransactions = await registerAccountOnChain({
      accountName: account.accountName,
      color: device.color,
      deviceType: device.deviceType,
      domain: device.domain,
      credentialId: device['credential-id'],
      credentialPubkey: device.guard.keys[0],
      networkId: account.networkId,
      chainId: chainId,
    });

    /**
     * Add the pending transaction id to the user object that is shared with the client dApp
     */
    url.searchParams.set(
      'user',
      Buffer.from(
        JSON.stringify({
          ...user,
          pendingTxIds: pendingTransactions,
        }),
      ).toString('base64'),
    );

    redirect(url.toString());
  };
