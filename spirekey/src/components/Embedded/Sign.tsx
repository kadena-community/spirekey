'use client';

import { startAuthentication } from '@simplewebauthn/browser';

import { Button } from '@/components/shared/Button/Button';
import { Account, Device, useAccounts } from '@/context/AccountsContext';
import { getSignature } from '@/utils/getSignature';

interface Props {
  transaction?: string;
}

// @TODO get from other package?
const getPubkey = (
  accounts: Account[],
  credentialId: Device['credential-id'],
) => {
  for (const account of accounts) {
    for (const device of account.devices) {
      if (credentialId === device['credential-id']) {
        return device.guard.keys[0];
      }
    }
  }
  throw new Error('No public key found');
};

export default function Sign(props: Props) {
  const { transaction } = props;
  const { accounts } = useAccounts();
  if (!transaction) return;

  const data = transaction
    ? Buffer.from(transaction, 'base64').toString()
    : null;
  const tx = JSON.parse(data ?? '{}');

  const onSign = async () => {
    const credentialId = accounts[0]?.devices[0]['credential-id'];

    const res = await startAuthentication({
      challenge: tx.hash,
      rpId: window.location.hostname,
      allowCredentials: credentialId
        ? [{ id: credentialId, type: 'public-key' }]
        : undefined,
    });

    window.parent.postMessage(
      {
        source: 'kadena-spirekey',
        name: 'all-transaction-signatures',
        payload: {
          signatures: {
            [tx.hash]: {
              ...getSignature(res.response),
              pubKey: getPubkey(accounts, credentialId),
            },
          },
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
