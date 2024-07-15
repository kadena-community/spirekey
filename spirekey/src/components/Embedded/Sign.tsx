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
  ISigner,
  IUnsignedCommand,
} from '@kadena/types';
import { LayoutSurface } from '../LayoutSurface/LayoutSurface';

import { Permissions } from '@/components/Permissions/Permissions';
import { getOptimalTransactions } from '@/utils/auto-transfers';
import { l1Client } from '@/utils/shared/client';
import { addSignatures } from '@kadena/client';
import { MonoCAccount } from '@kadena/kode-icons/system';
import useSWR from 'swr';

interface Props {
  transaction?: string;
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
  const { transaction, accounts: signAccountsString } = props;
  const { accounts, setAccount } = useAccounts();
  if (!transaction) return;

  const [signedPlumbingTxs, setSignedPlumbingTxs] = useState<ICommand[]>();
  const data = transaction
    ? Buffer.from(transaction, 'base64').toString()
    : null;
  const tx: IUnsignedCommand = JSON.parse(data ?? '{}');

  const txAccounts = getAccountsForTx(accounts)(tx);
  const { signers }: ICommandPayload = JSON.parse(tx.cmd);

  const signAccounts: OptimalTransactionsAccount[] = JSON.parse(
    signAccountsString || '[]',
  );
  const { data: plumbingTxs } = useSWR(
    signAccounts.map(
      (account) =>
        account.accountName +
        account.chainIds.join(',') +
        account.networkId +
        account.requestedFungibles?.join(','),
    ),
    async () => {
      const txs = (
        await Promise.all(
          signAccounts.flatMap((account) =>
            account.requestedFungibles?.flatMap(({ amount }) =>
              getOptimalTransactions(account, '2', amount),
            ),
          ),
        )
      ).flatMap((x) => x);

      return txs;
    },
  );

  const onSign = async () => {
    // TODO: get credential id by pubkey
    const credentialId = accounts[0]?.devices[0]['credential-id'];

    const res = await startAuthentication({
      challenge: tx.hash,
      rpId: window.location.hostname,
      allowCredentials: credentialId
        ? [{ id: credentialId, type: 'public-key' }]
        : undefined,
    });

    if (!signedPlumbingTxs)
      publishEvent('signed', {
        // TODO: add accounts with the additional txs
        [tx.hash]: [
          {
            ...getSignature(res.response),
            pubKey: getPubkey(accounts, credentialId),
          },
        ],
      });

    const txs = await l1Client.submit(signedPlumbingTxs!);
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
    console.warn('DEBUGPRINT[19]: Sign.tsx:143: txs=', txs);
    setSignedPlumbingTxs(txs);
  };

  return (
    <LayoutSurface title="Permissions" subtitle={getSubtitle(caps.size)}>
      <SignPlumbingTxs
        plumbingSteps={plumbingSteps}
        credentialId={txAccounts.accounts[0]?.devices[0]['credential-id']}
        onCancel={onCancel}
        onCompleted={onCompletedPlumbingTxs}
      />

      {[...caps.entries()].map(([module, capabilities]) => (
        <Permissions module={module} capabilities={capabilities} key={module} />
      ))}
      <Stack gap="md" justifyContent="space-between">
        <Button variant="outlined" onPress={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onPress={onSign}
          isDisabled={signedPlumbingTxs === undefined}
        >
          Sign
        </Button>
      </Stack>
    </LayoutSurface>
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

  if (!credentialId)
    return <div>No valid credentials found in this wallet to sign with</div>;
  return (
    <>
      {steps.map(({ title, caps, tx, signed }) => (
        <Stack flexDirection="column" gap="sm" key={tx.hash}>
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
