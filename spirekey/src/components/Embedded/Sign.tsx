'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useSign } from '@/hooks/useSign';

import { Button } from '../shared/Button/Button';

interface Props {
  transaction?: string;
}

export default function Sign(props: Props) {
  const { transaction } = props;
  const { accounts } = useAccounts();
  const { sign } = useSign();

  if (!transaction) return;

  const data = transaction
    ? Buffer.from(transaction, 'base64').toString()
    : null;
  const tx = JSON.parse(data ?? '{}');

  const onSign = async () => {
    const signedTx = await sign(tx, accounts[0]?.devices[0]['credential-id']);

    window.parent.postMessage(
      {
        source: 'kadena-spirekey',
        name: 'all-transactions-signed',
        payload: {
          transactions: [signedTx],
        },
      },
      '*',
    );
  };

  return (
    <Button variant="primary" onPress={onSign}>
      Sign
    </Button>
  );
}
