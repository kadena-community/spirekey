'use client';

import {
  createClient,
  createTransactionBuilder,
  ICommand,
  type ChainId,
} from '@kadena/client';
import { MonoContactless } from '@kadena/kode-icons/system';
import {
  Accordion,
  AccordionItem,
  Avatar,
  Badge,
  Button,
  Card,
  ContentHeader,
  Heading,
  maskValue,
  NumberField,
  ProductIcon,
  Select,
  SelectItem,
  Stack,
  TextareaField,
  TextField,
} from '@kadena/kode-ui';
import { token } from '@kadena/kode-ui/styles';
import {
  connect,
  initSpireKey,
  sign,
  type Account,
  type Device,
} from '@kadena/spirekey-sdk';
import { useEffect, useState } from 'react';
import {
  CardContainer,
  CardContentBlock,
  CardFooter,
} from './CardPattern/CardPattern';
import { Step, Stepper } from './Stepper/Stepper';
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
    (coin.transfer "${account.accountName}" "${receiver}" ${amount.toFixed(8)})
  `,
    )
    .setMeta({
      senderAccount: account.accountName,
      chainId,
    });

  account.devices.flatMap((d: Device) =>
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      useRAccount: true,
    });
  }, [wallet]);

  const signTransaction = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!account) throw new Error('No account connected');
    if (!receiver) throw new Error('No receiver defined');
    try {
      setIsLoading(true);
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
      await isReady();
      transactions.map(async (tx) => {
        const res = await client.local(tx);
        console.log('Preflight result', res);
        const txDescriptor = await client.submit(tx as ICommand);
        const txRes = await client.listen(txDescriptor);
        setResult(JSON.stringify(txRes, null, 2));
      });
    } catch (e) {
      console.warn('User canceled signin', e);
    } finally {
      setIsLoading(false);
    }
  };
  const onConnect = async () => {
    try {
      setIsLoading(true);
      const account = await connect(networkId, chainId as ChainId);
      setAccount(account);
      setAccount(await account.isReady());
    } catch (e) {
      console.warn('User canceled', e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Stack
      padding="md"
      marginInline="auto"
      flexDirection="column"
      gap="md"
      as="main"
      maxWidth="content.maxWidth"
    >
      {!account && (
        <CardContainer>
          <CardContentBlock
            visual={<ProductIcon.QuickStart size="xl" />}
            title="Step 1: Connect your account"
            description={
              <Stepper>
                <Step>Step 1</Step>
                <Step active>Step 2</Step>
                <Step>Step 3</Step>
              </Stepper>
            }
          >
            <Stack flexDirection="column" gap="md">
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
              <Accordion>
                <AccordionItem title="Advanced settings">
                  <>
                    <Select
                      label="Wallet"
                      onSelectionChange={(w) => setWallet(w as string)}
                      selectedKey={wallet}
                    >
                      <SelectItem key="https://spirekey.kadena.io/">
                        SpireKey
                      </SelectItem>
                      <SelectItem key="http://localhost:1337/">
                        Local
                      </SelectItem>
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
                  </>
                </AccordionItem>
              </Accordion>
            </Stack>
          </CardContentBlock>
          <CardFooter>
            <Button isLoading={isLoading} onPress={onConnect}>
              Connect
            </Button>
          </CardFooter>
        </CardContainer>
      )}
      {account && (
        <CardContainer>
          <form autoComplete="on" onSubmit={signTransaction}>
            <CardContentBlock
              visual={<ProductIcon.QuickStart size="xl" />}
              title={`Step 2: Transfer`}
              description={
                <>
                  <p>
                    Transfer KDA to another account. Your KDA might be spread
                    across many chains on Kadena, but SpireKey will take care of
                    converging the funds to perform your desired transaction.
                  </p>
                  <Stepper>
                    <Step>Step 1: Connect</Step>
                    <Step active>Step 2: Fund</Step>
                    <Step>Step 3: Transfer</Step>
                    <Step>Step 4: Sign</Step>
                    <Step>Step 5: Confirm</Step>
                  </Stepper>
                </>
              }
            >
              <Stack flexDirection="column" gap="md">
                <TextField
                  value={account.accountName}
                  name="sender"
                  type="text"
                  label={`Sender: ${account.balance} (KDA)`}
                  isReadOnly
                  disabled
                />
                <TextField
                  type="text"
                  value={receiver}
                  onValueChange={setReceiver}
                  name="receiver"
                  label="receiver"
                />
                <NumberField
                  value={amount}
                  minValue={0}
                  step={0.1}
                  onValueChange={setAmount}
                  label="amount"
                />
              </Stack>
            </CardContentBlock>
            {!result && (
              <CardFooter>
                <Button isLoading={isLoading} variant="primary" type="submit">
                  Sign
                </Button>
              </CardFooter>
            )}
          </form>
          {result && (
            <CardContentBlock
              title="Result"
              description={`You have succesfully transfered ${amount.toFixed(8)}KDA to ${maskValue(receiver)}`}
            >
              <Stack flexDirection="column" gap="md">
                <Accordion>
                  <AccordionItem title="View details">
                    <TextareaField label="details" value={result} rows={20} />
                  </AccordionItem>
                </Accordion>
              </Stack>
            </CardContentBlock>
          )}
        </CardContainer>
      )}
    </Stack>
  );
}
