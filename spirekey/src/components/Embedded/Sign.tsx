'use client';

import type {
  Account,
  Device,
  OptimalTransactionsAccount,
} from '@kadena/spirekey-types';
import { startAuthentication } from '@simplewebauthn/browser';
import { useEffect } from 'react';

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
import { ICommandPayload, IUnsignedCommand } from '@kadena/types';
import { LayoutSurface } from '../LayoutSurface/LayoutSurface';

import { Permissions } from '@/components/Permissions/Permissions';
import { getOptimalTransactions } from '@/utils/auto-transfers';
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
  const { accounts } = useAccounts();
  if (!transaction) return;

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

    publishEvent('signed', {
      // TODO: add accounts with the additional txs
      [tx.hash]: [
        {
          ...getSignature(res.response),
          pubKey: getPubkey(accounts, credentialId),
        },
      ],
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

  return (
    <LayoutSurface title="Permissions" subtitle={getSubtitle(caps.size)}>
      {plumbingSteps.map(({ title, caps, tx }) => (
        <Stack flexDirection="column" gap="sm">
          <ContentHeader heading={title} icon={<MonoCAccount />} />
          {[...caps.entries()].map(([module, capabilities]) => (
            <Accordion>
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
                // find a robust way to determine the key to use
                // or pass it through during connect
                const credentialId =
                  txAccounts.accounts[0]?.devices[0]['credential-id'];
                if (!credentialId)
                  throw new Error('No credential found to sign with');
                const res = await startAuthentication({
                  challenge: tx.hash,
                  rpId: window.location.hostname,
                  allowCredentials: credentialId
                    ? [{ id: credentialId, type: 'public-key' }]
                    : undefined,
                });
                const signedTx = addSignatures(tx, getSignature(res.response));
                console.warn(
                  'DEBUGPRINT[17]: Sign.tsx:174: signedTx=',
                  signedTx,
                );
              }}
            >
              Sign
            </Button>
          </Stack>
        </Stack>
      ))}

      {[...caps.entries()].map(([module, capabilities]) => (
        <Permissions module={module} capabilities={capabilities} key={module} />
      ))}
      <Stack gap="md" justifyContent="space-between">
        <Button variant="outlined" onPress={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onPress={onSign} isDisabled>
          Sign
        </Button>
      </Stack>
    </LayoutSurface>
  );
}
