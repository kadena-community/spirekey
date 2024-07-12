'use client';

import type { Account, Device } from '@kadena/spirekey-types';
import { startAuthentication } from '@simplewebauthn/browser';

import { useAccounts } from '@/context/AccountsContext';
import { getSignature } from '@/utils/getSignature';

import { getAccountsForTx } from '@/utils/consent';
import { publishEvent } from '@/utils/publishEvent';
import { Button, Stack } from '@kadena/kode-ui';
import {
  ChainId,
  ICommand,
  ICommandPayload,
  IUnsignedCommand,
} from '@kadena/types';
import { LayoutSurface } from '../LayoutSurface/LayoutSurface';

import { Permissions } from '@/components/Permissions/Permissions';
import { getAccountFromChain } from '@/utils/shared/account';
import { l1Client } from '@/utils/shared/client';
import {
  addSignatures,
  createTransactionBuilder,
  ITransactionDescriptor,
} from '@kadena/client';
import { useEffect } from 'react';
import useSWR from 'swr';

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
type Reserves = {
  current: number;
  reserves: { chainId: string; balance: number }[];
};
type PlumbingTxBuilder = {
  required: number;
  txs: Promise<ITransactionDescriptor>[];
};
const getMinCost = (requested: number, available: number) => {
  if (available > requested) return requested;
  return available;
};
const submitPlumbingTransfer = async ({
  account,
  source,
  target,
  amount,
  credentials,
}: {
  account: Account;
  source: ChainId;
  target: ChainId;
  amount: number;
  credentials: {
    pubKey: string;
    credentialId: string;
  }[];
}) => {
  const module = `${process.env.NAMESPACE}.webauthn-wallet`;
  const cmd = createTransactionBuilder({
    meta: {
      sender: account.accountName,
      chainId: source,
      gasLimit: 1500,
      gasPrice: 1e-8,
    },
  }).execution(
    `(${module}.transfer-crosschain
    "${account.accountName}"
    "${account.accountName}"
    (${module}.get-wallet-guard 
      "${account.accountName}"
    )
    "${target}"
    ${amount.toFixed(8)}
  )`,
  );
  // extract the caps for display
  for (const credential of credentials) {
    cmd.addSigner(
      { pubKey: credential.pubKey, scheme: 'WebAuthn' },
      (withCap) => [
        withCap(
          `${module}.TRANSFER`,
          account.accountName,
          account.accountName,
          { decimal: amount.toFixed(8) },
        ),
        withCap(
          `${module}.TRANSFER_XCHAIN`,
          account.accountName,
          account.accountName,
          amount,
          target,
        ),
        withCap(`${module}.GAS`, account.accountName),
        withCap(`${module}.GAS_PAYER`, account.accountName, { int: 1 }, 1),
      ],
    );
  }

  const tx = cmd.setNetworkId(account.networkId).createTransaction();

  const signedTx = await credentials.reduce(async (t, credential) => {
    const tx = await t;
    const res = await startAuthentication({
      challenge: tx.hash,
      rpId: window.location.hostname,
      allowCredentials: [{ id: credential.credentialId, type: 'public-key' }],
    });

    return addSignatures(tx, {
      pubKey: credential.pubKey,
      sig: JSON.stringify(getSignature(res.response)),
    });
  }, Promise.resolve(tx));
  await l1Client.local(signedTx, {
    preflight: false,
    signatureVerification: false,
  });
  return l1Client.submit(signedTx as ICommand);
};
const getCapsWithCredentials = (
  signers: ICommandPayload['signers'],
  accounts: Account[],
) =>
  signers
    .map((s) => {
      const credentialId = accounts.reduce((foundCredential, a) => {
        if (foundCredential) return foundCredential;
        return a.devices.reduce((c, d) => {
          if (d.guard.keys.includes(s.pubKey)) return d['credential-id'];
          return c;
        }, '');
      }, '');
      if (!credentialId) return null;
      return {
        ...s,
        credentialId,
      };
    })
    .filter((x) => !!x);
export default function Sign(props: Props) {
  const { transaction } = props;
  const { accounts } = useAccounts();
  if (!transaction) return;

  const data = transaction
    ? Buffer.from(transaction, 'base64').toString()
    : null;
  const tx: IUnsignedCommand = JSON.parse(data ?? '{}');

  const cost = 10.1;
  const txAccounts = getAccountsForTx(accounts)(tx);
  const { signers, meta }: ICommandPayload = JSON.parse(tx.cmd);

  const capsWithCredentials = getCapsWithCredentials(signers, accounts);
  const onSignPlumbing = async (
    account: Account,
    cost: number,
    requestChainId: ChainId,
  ) => {
    // TODO: create crosschain tx
    // find a suitable source chain, or multiple if not enough on one chain
    // determine correct target chain, i.e. chain of tx requested for signing
    // now all info is present and prep the first step of the defpact
    // add the plumbing tx's to the accounts
    const { reserves, current = 0 } = (
      await Promise.all(
        account.chainIds.map(async (chainId) => {
          const acc = await getAccountFromChain({
            chainId,
            accountName: account.accountName,
            networkId: account.networkId,
          });
          if (!acc) return null;
          const { balance } = acc;
          return { balance: parseFloat(balance), chainId };
        }),
      )
    )
      .filter((x) => !!x)
      .reduce(
        (m: Reserves, { chainId, balance }) => {
          if (chainId === requestChainId) return { ...m, current: balance };
          return { ...m, reserves: [...m.reserves, { chainId, balance }] };
        },
        { reserves: [], current: 0 },
      );
    const required = cost - current;
    if (required <= 0) return;
    reserves
      .sort((a, b) => a.balance - b.balance)
      .reduce(
        (r: PlumbingTxBuilder, { chainId, balance }) => {
          if (r.required <= 0) return r;
          const amount = getMinCost(r.required, balance);
          const tx = submitPlumbingTransfer({
            account,
            source: chainId as ChainId,
            target: requestChainId,
            // determine min required transfer
            amount,
            credentials: capsWithCredentials.map(
              ({ credentialId, pubKey }) => ({ credentialId, pubKey }),
            ),
          });
          return {
            required: r.required - amount,
            txs: [...r.txs, tx],
          };
        },
        { txs: [], required },
      );
  };

  useEffect(() => {
    txAccounts.accounts.map((a) => onSignPlumbing(a, cost, meta.chainId));
  }, []);

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
  const caps = signers
    .filter((s) => keys.includes(s.pubKey))
    .flatMap((s) => s.clist)
    .reduce((caps, cap) => {
      const module = cap?.name.replace(/\.(?:.(?!\.))+$/, '') || '';
      const moduleCaps = caps.get(module) || [];
      caps.set(module, [...moduleCaps, cap]);
      return caps;
    }, new Map());

  const getSubtitle = (size: number) => {
    if (size > 1) return `asked for the following ${caps.size} modules`;
    return 'asked for the following module';
  };

  return (
    <LayoutSurface title="Permissions" subtitle={getSubtitle(caps.size)}>
      {[...caps.entries()].map(([module, capabilities]) => (
        <Permissions module={module} capabilities={capabilities} key={module} />
      ))}
      <Stack gap="md" justifyContent="space-between">
        <Button variant="outlined" onPress={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onPress={onSign}>
          Sign
        </Button>
      </Stack>
    </LayoutSurface>
  );
}
