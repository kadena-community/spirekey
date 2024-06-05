'use client';

import { useAccounts } from '@/context/AccountsContext';
import { getSig } from '@/utils/getSig';
import { addSignatures } from '@kadena/client';
import { startAuthentication } from '@simplewebauthn/browser';
import { Button } from '../shared/Button/Button';

interface Props {
  transaction?: string;
}

export default function Sign(props: Props) {
  const { transaction } = props;
  const { accounts } = useAccounts();

  if (!transaction) return;

  const data = transaction
    ? Buffer.from(transaction, 'base64').toString()
    : null;
  const tx = JSON.parse(data ?? '{}');

  const credentialId = accounts[0]?.devices[0]['credential-id'] || '';
  const onSign = async () => {
    console.log(tx);
    const res = await startAuthentication({
      challenge: tx.hash,
      rpId: window.location.hostname,
      allowCredentials: [{ id: credentialId, type: 'public-key' }],
    });

    const signedTx = addSignatures(tx, {
      ...getSig(res.response),
      pubKey: accounts[0]?.devices[0]?.guard.keys[0] || '',
    });

    window.parent.postMessage(
      {
        source: 'kadena-spirekey',
        name: 'signed-transaction',
        payload: { transaction: signedTx },
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
