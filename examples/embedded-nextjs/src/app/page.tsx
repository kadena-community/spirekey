'use client';

import {
  connect,
  initSpireKey,
  onAccountConnected,
  sign,
  type Account,
} from '@kadena-spirekey/sdk';
import { createTransactionBuilder } from '@kadena/client';
import { Button, NumberField, Stack, TextField } from '@kadena/react-ui';
import { useEffect, useState } from 'react';
const ns = 'n_eef68e581f767dd66c4d4c39ed922be944ede505';
export default function Home() {
  const [account, setAccount] = useState<Account>();
  const [receiver, setReceiver] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    initSpireKey({ hostUrl: 'http://localhost:1337' });

    onAccountConnected((account) => {
      setAccount(account);
    });
  }, []);

  const signTransaction = async () => {
    if (!account) throw new Error('No account connected');
    if (!receiver) throw new Error('No receiver defined');
    const tx = createTransactionBuilder()
      .execution(
        `(${ns}.webauthn-wallet.transfer
        "${account.accountName}"
        "${receiver}"
      )`,
      )
      .setMeta({
        senderAccount: account.accountName,
        chainId: account.chainIds[0],
      });

    // Note: tx is an instance that is being mutated
    account.devices.flatMap((d) =>
      d.guard.keys.map((k) =>
        tx.addSigner(
          {
            pubKey: k,
            scheme: /^WEBAUTHN-/.test(k) ? 'WebAuthn' : 'ED25519',
          },
          (withCap) => [
            withCap(
              `${ns}.webauthn-wallet.TRANSFER`,
              account.accountName,
              receiver,
              { decimal: amount.toFixed(8) },
            ),
            withCap(
              `${ns}.webauthn-wallet.GAS_PAYER`,
              account.accountName,
              { int: '1' },
              { decimal: '1' },
            ),
            withCap(`${ns}.webauthn-wallet.GAS`, account.accountName),
          ],
        ),
      ),
    );
    tx.setNetworkId('development');
    sign([tx.createTransaction()]);
  };

  return (
    <main>
      {!account && <button onClick={() => connect()}>Connect</button>}
      {account && (
        <Stack flexDirection="column" gap="md" margin="md">
          Connected as {account.alias} ({account.accountName}){' '}
          <TextField
            type="text"
            value={receiver}
            onValueChange={setReceiver}
            label="receiver"
          />
          <NumberField
            value={amount}
            minValue={0}
            step={0.1}
            onValueChange={setAmount}
            label="amount"
          />
          <Button variant="primary" onClick={signTransaction}>
            Sign
          </Button>
        </Stack>
      )}
    </main>
  );
}
