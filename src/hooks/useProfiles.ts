import { useContext } from 'react';

import { AccountsContext } from '@/context/AccountsContext';

export function useAccounts() {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }

  return context;
}
