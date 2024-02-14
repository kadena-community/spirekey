'use client';

import { Button } from '@/components/Button/Button';
import { useAccounts } from '@/context/AccountsContext';
import { transfer } from '@/utils/transfer';
import { useRouter } from 'next/navigation';

// DEMO PAGE
export default function Transfer() {
  const router = useRouter();
  const { accounts } = useAccounts();

  if (accounts.length < 2) return <div>You need at least 2 accounts</div>;

  const sender = accounts[0];
  const receiver = accounts[1];

  const doTransfer = async () => {
    const tx = await transfer({
      amount: 1,
      receiver: receiver.accountName,
      sender: sender.accountName,
      gasPayer: receiver.accountName,
      publicKey: sender.devices[0].guard.keys[0],
      namespace: process.env.NAMESPACE!,
      networkId: 'fast-development',
    });

    router.push(
      '/sign?transaction=' +
        Buffer.from(JSON.stringify(tx)).toString('base64') +
        '&returnUrl=/transfer',
    );
  };
  return (
    <div>
      <Button onPress={doTransfer}>Transfer</Button>
    </div>
  );
}
