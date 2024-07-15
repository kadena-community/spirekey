import { ICommand, IUnsignedCommand } from '@kadena/client';
import type { Account } from '@kadena/spirekey-types';
import { EmbedManager } from '../embed-manager';
import { onIsReady } from './events';

export const isAccountReady = (account: Account) => async () => {
  EmbedManager.getInstance().areAccountsReady([account]);
  return new Promise((resolve) => {
    onIsReady((a) => resolve(a));
  });
};

export const areAccountsReady = async (accounts: Account[]) => {
  EmbedManager.getInstance().areAccountsReady(accounts);
  return new Promise((resolve) => {
    onIsReady((a) => resolve(a));
  });
};
