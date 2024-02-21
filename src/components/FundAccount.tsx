import { Account } from '@/context/AccountsContext';
import { fundAccount } from '@/utils/fund';
import { Button } from '@kadena/react-ui';
import { useState } from 'react';

interface Props {
  account: Account;
}

// TODO: This seems to be unused?
export const FundAccount = ({ account }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFundAccount = async () => {
    try {
      setLoading(true);
      if (!account) throw new Error('No account selected');

      await fundAccount(account);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleFundAccount}>
        {loading ? 'Loading...' : 'Fund account'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};
