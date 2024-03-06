import { AccountsContext } from '@/context/AccountsContext';
import { useContext } from 'react';

const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error('useAccounts must be used within a AccountsProvider');
  }
  return context;
};

export { useAccounts };
