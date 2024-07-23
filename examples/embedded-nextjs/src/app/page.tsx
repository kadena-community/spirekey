'use client';

import {
  createClient,
  createTransactionBuilder,
  ICommand,
  IUnsignedCommand,
  type ChainId,
} from '@kadena/client';
import {
  Button,
  NumberField,
  Select,
  SelectItem,
  Stack,
  TextareaField,
  TextField,
} from '@kadena/kode-ui';
import {
  connect,
  initSpireKey,
  sign,
  type Account,
} from '@kadena/spirekey-sdk';
import { useEffect, useState } from 'react';
const ns = 'n_eef68e581f767dd66c4d4c39ed922be944ede505';

const useLocalState = (
  key: string,
  defaultValue: string,
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    const localValue = localStorage.getItem(key);
    if (localValue) setValue(localValue);
  }, []);
  const setLocalValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };
  return [value, setLocalValue];
};

const getRAccountTransfer = ({
  account,
  receiver,
  amount,
  chainId,
}: {
  account: Account;
  receiver: string;
  amount: number;
  chainId: ChainId;
}) => {
  const tx = createTransactionBuilder()
    .execution(
      `
    (coin.transfer "${account}" "${receiver}" ${amount})
  `,
    )
    .setMeta({
      senderAccount: account.accountName,
      chainId,
    });

  account.devices.flatMap((d) =>
    d.guard.keys.map((k) =>
      tx.addSigner(
        {
          pubKey: k,
          scheme: /^WEBAUTHN-/.test(k) ? 'WebAuthn' : 'ED25519',
        },
        (withCap) => [
          withCap(`coin.TRANSFER`, account.accountName, receiver, {
            decimal: amount.toFixed(8),
          }),
          withCap(`coin.GAS`),
        ],
      ),
    ),
  );
  return tx;
};
const getTransferTx = ({
  account,
  receiver,
  amount,
  chainId,
}: {
  account: Account;
  receiver: string;
  amount: number;
  chainId: ChainId;
}) => {
  if (account.accountName.startsWith('r:'))
    return getRAccountTransfer({
      account,
      receiver,
      amount,
      chainId,
    });
  return getTransferTxLegacy({
    account,
    receiver,
    amount,
    chainId,
  });
};

const getTransferTxLegacy = ({
  account,
  receiver,
  amount,
  chainId,
}: {
  account: Account;
  receiver: string;
  amount: number;
  chainId: ChainId;
}) => {
  const tx = createTransactionBuilder()
    .execution(
      `(${ns}.webauthn-wallet.transfer
        "${account.accountName}"
        "${receiver}"
        ${amount.toFixed(8)}
      )`,
    )
    .setMeta({
      senderAccount: account.accountName,
      chainId,
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
            { decimal: '1.0' },
          ),
          withCap(`${ns}.webauthn-wallet.GAS`, account.accountName),
        ],
      ),
    ),
  );
  return tx;
};

const client = createClient(({ chainId, networkId }) => {
  if (networkId === 'mainnet01')
    return `https://api.chainweb.com/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
  if (networkId === 'testnet04')
    return `https://api.testnet.chainweb.com/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
  return `http://localhost:8080/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
});

export default function Home() {
  const [account, setAccount] = useState<Account>();
  const [receiver, setReceiver] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [txs, setTxs] = useState<(IUnsignedCommand | ICommand)[]>([]);
  const [result, setResult] = useState('');

  const [wallet, setWallet] = useLocalState(
    'wallet',
    'https://spirekey.kadena.io/',
  );
  const [networkId, setNetworkId] = useLocalState('networkId', 'testnet04');
  const [chainId, setChainId] = useLocalState('chainId', '14');

  useEffect(() => {
    initSpireKey({
      hostUrl: wallet,
    });
  }, [wallet]);

  const signTransaction = async () => {
    if (!account) throw new Error('No account connected');
    if (!receiver) throw new Error('No receiver defined');
    try {
      const tx = getTransferTx({
        amount,
        receiver,
        account,
        chainId: chainId as ChainId,
      });
      tx.setNetworkId(networkId);
      const { transactions, isReady } = await sign(
        [tx.createTransaction()],
        [
          {
            accountName: account.accountName,
            networkId: account.networkId,
            chainIds: account.chainIds,
            requestedFungibles: [
              {
                fungible: 'coin',
                amount: amount + 0.1, // add 0.1 to account for gas fees
              },
            ],
          },
        ],
      );
      setTxs(transactions);
      setIsReady(false);
      await isReady();
      setIsReady(true);
      transactions.map(async (tx) => {
        const res = await client.local(tx);
        console.log('Preflight result', res);
        const txDescriptor = await client.submit(tx as ICommand);
        const txRes = await client.listen(txDescriptor);
        setResult(JSON.stringify(txRes, null, 2));
      });
    } catch (e) {
      console.warn('User canceled signin', e);
    }
  };
  const onConnect = async () => {
    try {
      const account = await connect(networkId, chainId as ChainId);
      setAccount(account);
      setAccount(await account.isReady());
      setIsReady(true);
    } catch (e) {
      console.warn('User canceled', e);
    }
  };

  return (
    <main>
      <Select
        label="Wallet"
        onSelectionChange={(w) => setWallet(w as string)}
        selectedKey={wallet}
      >
        <SelectItem key="https://spirekey.kadena.io/">SpireKey</SelectItem>
        <SelectItem key="http://localhost:1337/">Local</SelectItem>
      </Select>
      <Select
        label="Network"
        onSelectionChange={(n) => setNetworkId(n as string)}
        selectedKey={networkId}
      >
        <SelectItem key="mainnet01">Mainnet</SelectItem>
        <SelectItem key="testnet04">Testnet</SelectItem>
        <SelectItem key="development">Devnet</SelectItem>
      </Select>
      <Select
        label="Chain"
        onSelectionChange={(c) => setChainId(c as ChainId)}
        selectedKey={chainId}
      >
        {Array(20)
          .fill(1)
          .map((_, i) => (
            <SelectItem key={i}>{i.toString()}</SelectItem>
          ))}
      </Select>
      {!account && <button onClick={onConnect}>Connect</button>}
      {account && (
        <Stack flexDirection="column" gap="md" margin="md">
          Connected as {account.alias} ({account.accountName}) (
          {isReady ? 'Minted' : 'Mining...'})
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
          <Button variant="primary" onPress={signTransaction}>
            Sign
          </Button>
        </Stack>
      )}
      {!result && !!txs?.length && JSON.stringify(txs)}
      {result && <TextareaField label="result" value={result} rows={20} />}
    </main>
  );
}
