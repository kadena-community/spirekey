import { Account } from '@/context/AccountsContext';

export const getDeviceByPublicKey = (
  accounts: Account[],
  publicKey: string,
) => {
  for (const account of accounts) {
    for (const device of account.devices) {
      if (device.guard.keys.includes(publicKey)) {
        return device;
      }
    }
  }
};
