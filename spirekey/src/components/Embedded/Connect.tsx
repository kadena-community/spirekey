'use client';

import { Account, useAccounts } from '@/context/AccountsContext';
import { useEffect } from 'react';
import { Button } from '../shared/Button/Button';

export default function Connect() {
  const { accounts } = useAccounts();

  useEffect(() => {
    window.addEventListener('message', (event) => {
      console.log(
        'Message received from the parent: ' +
          JSON.stringify(event.data, null, 2),
      );
    });
  }, []);

  const connect = (account: Account) => {
    window.parent.postMessage(
      {
        source: 'kadena-spirekey',
        name: 'account',
        payload: {
          account,
        },
      },
      '*',
    );
  };

  return (
    <>
      {accounts.map((account) => (
        <div key={account.accountName}>
          <div>
            <strong>{account.alias}</strong>
            <br /> {account.accountName}
          </div>
          <br />
          <Button
            variant="primary"
            onPress={() => connect(account)}
            style={{ marginBlockEnd: '10px' }}
          >
            Connect
          </Button>
          <hr />
        </div>
      ))}
    </>
  );
}
