import { fundAccount } from '@/utils/fund';
import { Button } from '@kadena/react-ui';
import { useState } from 'react';

interface Props {
  accountName: string;
}

export const FundAccount = ({ accountName }: Props) => {
  // const { activeAccount, getAccountDetails } = useAccounts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFundAccount = async () => {
    try {
      setLoading(true);
      if (!accountName) throw new Error('No account selected');

      await fundAccount(accountName);
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
