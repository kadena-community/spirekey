import type { Account, Device } from '@/context/types';

export const getDeviceByPublicKey = (
  accounts: Account[],
  publicKey: string,
): Device | undefined => {
  for (const account of accounts) {
    for (const device of account.devices) {
      if (device.guard.keys.includes(publicKey)) {
        return device;
      }
    }
  }
};
