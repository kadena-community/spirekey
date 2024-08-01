import { useLocalState } from '@/hooks/useLocalState';
import {
  CardContainer,
  CardContentBlock,
  CardFooter,
} from '@/steps/CardPattern/CardPattern';
import { l1Client } from '@/utils/shared/client';
import { ChainId, createTransactionBuilder, ICommand } from '@kadena/client';
import {
  Button,
  NumberField,
  ProductIcon,
  Stack,
  TextField,
} from '@kadena/kode-ui';
import { Account, Device, sign } from '@kadena/spirekey-sdk';
import { useState } from 'react';
import { ExampleStepper } from './ExampleStepper';

const ns = 'n_eef68e581f767dd66c4d4c39ed922be944ede505';
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

const isCoinAccountExisting = async ({
  accountName,
  networkId,
  chainId,
}: {
  accountName: string;
  networkId: string;
  chainId: ChainId;
}) => {
  const tx = createTransactionBuilder()
    .execution(`(coin.details "${accountName}")`)
    .setMeta({ chainId })
    .setNetworkId(networkId)
    .createTransaction();
  const res = await l1Client.local(tx, {
    preflight: false,
    signatureVerification: false,
  });
  return res.result.status === 'success';
};

export const TransferStep = ({
  setResult,
  account,
}: {
  setResult: (result: string) => void;
  account: Account;
}) => {
  const [networkId] = useLocalState('networkId', 'testnet04');
  const [chainId] = useLocalState('chainId', '14');
  const [receiver, setReceiver] = useLocalState('receiver', '');
  const [amount, setAmount] = useLocalState('amount', '0.0');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [receiverError, setReceiverError] = useState('');
  const signTransaction = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!account) throw new Error('No account connected');
    if (!receiver) throw new Error('No receiver defined');
    try {
      setIsLoading(true);
      if (
        !(await isCoinAccountExisting({
          accountName: receiver,
          networkId,
          chainId: chainId as ChainId,
        }))
      ) {
        setReceiverError('Account does not exist');
        throw new Error('Account does not exist');
      }
      setReceiverError('');
      const tx = getTransferTx({
        amount: parseFloat(amount),
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
                amount: parseFloat(amount) + 0.1, // add 0.1 to account for gas fees
              },
            ],
          },
        ],
      );
      await isReady();
      await Promise.all(
        transactions.map(async (tx) => {
          const res = await l1Client.local(tx);
          console.log('Preflight result', res);
          const txDescriptor = await l1Client.submit(tx as ICommand);
          const txRes = await l1Client.listen(txDescriptor);
          setResult(JSON.stringify(txRes, null, 2));
        }),
      );
    } catch (e) {
      if (e instanceof Error && e.message === 'Account does not exist') throw e;
      console.warn('User canceled signin', e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form autoComplete="on" onSubmit={signTransaction}>
      <CardContainer hasPadding>
        <CardContentBlock
          visual={<ProductIcon.QuickStart size="xl" />}
          title={isLoading ? `Step 4: Sign` : `Step 3: Transfer`}
          description={
            <>
              <p>
                Transfer KDA to another account. Your KDA might be spread across
                many chains on Kadena, but SpireKey will take care of converging
                the funds to perform your desired transaction.
              </p>
              <ExampleStepper step={isLoading ? 3 : 2} />
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
              label="Receiver"
              isInvalid={!!receiverError}
              errorMessage={receiverError}
            />
            <NumberField
              value={parseFloat(amount)}
              minValue={0}
              step={0.1}
              onValueChange={(a) => setAmount(a.toFixed(8))}
              label="Amount"
            />
          </Stack>
        </CardContentBlock>
      </CardContainer>
      <CardFooter>
        <Button
          isLoading={isLoading}
          variant="primary"
          isCompact={false}
          type="submit"
        >
          Sign
        </Button>
      </CardFooter>
    </form>
  );
};
