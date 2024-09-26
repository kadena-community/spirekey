import type { Account, Device } from '@kadena/spirekey-types';
import { ICap, IUnsignedCommand } from '@kadena/types';

export type PlumbingTxStep = {
  title: string;
  caps: Map<string, ICap[]>;
  tx: IUnsignedCommand;
  signed?: boolean;
};

// @TODO get from other package?
export const getPubkey = (
  accounts: Account[],
  credentialId: Device['credential-id'],
) => {
  for (const account of accounts) {
    for (const device of account.devices) {
      if (credentialId === device['credential-id']) {
        return device.guard.keys[0];
      }
    }
  }
  throw new Error('No public key found');
};

export const getSubtitle = (size: number): string => {
  if (size > 1) return `asked for the following ${size} modules`;
  return 'asked for the following module';
};

export const findNetworkId = (steps: PlumbingTxStep[]): string | null =>
  steps.reduce((foundNetworkId, { tx }) => {
    const { networkId } = JSON.parse(tx.cmd);
    if (!foundNetworkId) return networkId;
    if (foundNetworkId !== networkId) {
      throw new Error('Multiple network IDs found');
    }
    return networkId;
  }, null);
