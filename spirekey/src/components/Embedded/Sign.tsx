'use client';

import type {
  Account,
  Device,
  OptimalTransactionsAccount,
} from '@kadena/spirekey-types';
import { startAuthentication } from '@simplewebauthn/browser';
import { useEffect, useState } from 'react';

import { useAccounts } from '@/context/AccountsContext';
import { getSignature } from '@/utils/getSignature';

import { getAccountsForTx, getPermissions } from '@/utils/consent';
import { publishEvent } from '@/utils/publishEvent';
import {
  Accordion,
  AccordionItem,
  Button,
  ContentHeader,
  Stack,
} from '@kadena/kode-ui';
import {
  ICap,
  ICommand,
  ICommandPayload,
  IUnsignedCommand,
} from '@kadena/types';

import { Permissions } from '@/components/Permissions/Permissions';
import { getOptimalTransactions } from '@/utils/auto-transfers';
import { l1Client } from '@/utils/shared/client';
import { addSignatures } from '@kadena/client';
import { MonoCAccount } from '@kadena/kode-icons/system';

import {
  CardContainer,
  CardFooter,
  SpireKeyCardContentBlock,
} from '@/components/CardPattern/CardPattern';

interface Props {
  transactions?: string;
  accounts?: string;
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
  const { transactions, accounts: signAccountsString } = props;
  const { accounts, setAccount } = useAccounts();
  if (!transactions) throw new Error('No transactions provided');

  const [signedPlumbingTxs, setSignedPlumbingTxs] = useState<ICommand[]>();
  const unsingedTxs: IUnsignedCommand[] = JSON.parse(transactions);
  if (!unsingedTxs.length) throw new Error('No valid transactions provided');

  // for now only support one tx provided
  const [tx] = unsingedTxs;
  if (!tx) throw new Error('No valid transaction provided');

  const txAccounts = getAccountsForTx(accounts)(tx);
  const { signers, meta }: ICommandPayload = JSON.parse(tx.cmd);

  const signAccounts: OptimalTransactionsAccount[] = JSON.parse(
    signAccountsString || '[]',
  );

  const [plumbingTxs, setPlumbingTxs] = useState<IUnsignedCommand[]>();
  useEffect(() => {
    Promise.all(
      signAccounts.flatMap((account) =>
        account.requestedFungibles?.flatMap(({ amount }) =>
          getOptimalTransactions(account, meta.chainId, amount),
        ),
      ),
    ).then((allPlumbingTxs) => {
      setPlumbingTxs(allPlumbingTxs.flatMap((txs) => txs).filter((x) => !!x));
    });
  }, []);

  useEffect(() => {
    const cancel = () => publishEvent('canceled:sign');
    window.addEventListener('beforeunload', cancel);

    return () => {
      window.removeEventListener('beforeunload', cancel);
    };
  }, []);
  const onSign = async () => {
    const credentialId = txAccounts.accounts[0].devices[0]['credential-id'];

    const res = await startAuthentication({
      challenge: tx.hash,
      rpId: window.location.hostname,
      allowCredentials: credentialId
        ? [{ id: credentialId, type: 'public-key' }]
        : undefined,
    });

    if (!signedPlumbingTxs)
      publishEvent('signed', {
        accounts: signAccounts
          .map((a) =>
            accounts.find(
              (acc) =>
                acc.networkId === a.networkId &&
                acc.accountName === a.accountName,
            ),
          )
          .filter((x) => !!x),
        tx: {
          [tx.hash]: [
            {
              ...getSignature(res.response),
              pubKey: getPubkey(accounts, credentialId),
            },
          ],
        },
      });

    const txs = await Promise.all(
      signedPlumbingTxs!.map((tx) => l1Client.submit(tx)),
    );
    const accs = signAccounts.map((sAcc) => {
      const account = accounts.find(
        (acc) =>
          acc.accountName === sAcc.accountName &&
          acc.networkId === sAcc.networkId,
      );
      if (!account) throw new Error('Account is not found');
      const newAccount = { ...account, txQueue: [...account.txQueue, ...txs] };
      setAccount(newAccount);
      return newAccount;
    });

    publishEvent('signed', {
      accounts: accs,
      tx: {
        [tx.hash]: [
          {
            ...getSignature(res.response),
            pubKey: getPubkey(accounts, credentialId),
          },
        ],
      },
    });
  };

  const onCancel = () => publishEvent('canceled:sign');

  const keys = txAccounts.accounts.flatMap((a) =>
    a.devices.flatMap((d) => d.guard.keys),
  );
  const plumbingSteps =
    plumbingTxs
      ?.map((tx, i) => {
        if (!tx) return null;
        const cmd: ICommandPayload = JSON.parse(tx.cmd);
        return {
          title: `Step ${i + 1}`,
          caps: getPermissions(keys, cmd.signers),
          tx,
        };
      })
      .filter((x) => !!x) || [];
  const caps = getPermissions(keys, signers);

  const getSubtitle = (size: number) => {
    if (size > 1) return `asked for the following ${caps.size} modules`;
    return 'asked for the following module';
  };
  const onCompletedPlumbingTxs = (txs: ICommand[]) => {
    setSignedPlumbingTxs(txs);
  };
  const isReadyForSigning = () => {
    if (!plumbingTxs?.length) return true;
    return signedPlumbingTxs;
  };
  return (
    <CardContainer>
      <SpireKeyCardContentBlock
        title="Permissions"
        description={getSubtitle(caps.size)}
      >
        <SignPlumbingTxs
          plumbingSteps={plumbingSteps}
          credentialId={txAccounts.accounts[0]?.devices[0]['credential-id']}
          onCancel={onCancel}
          onCompleted={onCompletedPlumbingTxs}
        />
        {[...caps.entries()].map(([module, capabilities]) => (
          <Permissions
            module={module}
            capabilities={capabilities}
            key={module}
          />
        ))}
      </SpireKeyCardContentBlock>
      <CardFooter>
        <Button variant="outlined" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onPress={onSign}
          isDisabled={!isReadyForSigning()}
        >
          Sign
        </Button>
      </CardFooter>
    </CardContainer>
  );
}

type PlumbingTxStep = {
  title: string;
  caps: Map<string, ICap[]>;
  tx: IUnsignedCommand;
  signed?: boolean;
};
type SignPlumbingTxsProps = {
  plumbingSteps: PlumbingTxStep[];
  credentialId?: string;
  onCancel: () => void;
  onCompleted: (txs: ICommand[]) => void;
};
const SignPlumbingTxs = ({
  plumbingSteps,
  credentialId,
  onCompleted,
  onCancel,
}: SignPlumbingTxsProps) => {
  const [steps, setSteps] = useState(plumbingSteps);

  useEffect(() => {
    setSteps(plumbingSteps);
  }, [plumbingSteps.map((s) => s.tx.hash).join(',') || '']);

  if (!credentialId)
    return <div>No valid credentials found in this wallet to sign with</div>;
  return (
    <>
      {steps.map(({ title, caps, tx, signed }) => (
        <Stack flexDirection="column" gap="sm" marginBlock="md" key={tx.hash}>
          <ContentHeader heading={title} icon={<MonoCAccount />} />
          {[...caps.entries()].map(([module, capabilities]) => (
            <Accordion
              key={
                module + capabilities.map((c) => JSON.stringify(c)).join(',')
              }
            >
              <AccordionItem title={`Details: ${title}`}>
                <Permissions
                  module={module}
                  capabilities={capabilities}
                  key={module}
                />
              </AccordionItem>
            </Accordion>
          ))}
          <Stack gap="md" justifyContent="space-between">
            <Button variant="outlined" onPress={onCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onPress={async () => {
                const res = await startAuthentication({
                  challenge: tx.hash,
                  rpId: window.location.hostname,
                  allowCredentials: credentialId
                    ? [{ id: credentialId, type: 'public-key' }]
                    : undefined,
                });
                const signedTx = addSignatures(tx, getSignature(res.response));
                const newSteps = steps.map((step) => {
                  if (step.tx.hash !== tx.hash) return step;
                  return { ...step, tx: signedTx, signed: true };
                });
                setSteps(newSteps);
                if (newSteps.every((step) => step.signed))
                  onCompleted(newSteps.map(({ tx }) => tx) as ICommand[]);
              }}
              isDisabled={signed}
            >
              Sign
            </Button>
          </Stack>
        </Stack>
      ))}
    </>
  );
};
