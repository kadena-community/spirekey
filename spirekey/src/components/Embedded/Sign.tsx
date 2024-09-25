'use client';

import { Permissions } from '@/components/Permissions/Permissions';
import { SpireKeyCardContentBlock } from '@/components/SpireKeyCardContentBlock';
import { useErrors } from '@/context/shared/ErrorContext/ErrorContext';
import { useNotifications } from '@/context/shared/NotificationsContext';
import { useAccount, useAccounts } from '@/resolvers/accounts';
import { useAutoTransfers } from '@/resolvers/auto-transfers';
import { getAccountsForTx, getPermissions } from '@/utils/consent';
import { getSignature } from '@/utils/getSignature';
import { publishEvent } from '@/utils/publishEvent';
import { l1Client } from '@/utils/shared/client';
import { Button } from '@kadena/kode-ui';
import { CardFixedContainer, CardFooterGroup } from '@kadena/kode-ui/patterns';
import type {
  Account,
  Device,
  OptimalTransactionsAccount,
} from '@kadena/spirekey-types';
import { ICommand, ICommandPayload, IUnsignedCommand } from '@kadena/types';
import { startAuthentication } from '@simplewebauthn/browser';
import { useEffect, useState } from 'react';
import { MainLoader } from '../MainLoader/MainLoader';
import { SignPlumbingTxs } from './components/SignPlumbingTxs/SignPlumbingTxs';

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
  const { accounts, loading } = useAccounts();
  const { setAccount } = useAccount();
  const { errorMessage, setErrorMessage } = useErrors();
  const { addNotification } = useNotifications();

  if (!transactions) throw new Error('No transactions provided');

  const [signedPlumbingTxs, setSignedPlumbingTxs] = useState<ICommand[]>();
  const unsingedTxs: IUnsignedCommand[] = JSON.parse(transactions);

  if (!unsingedTxs.length) {
    console.error({ error: 'No valid transactions provided' });
    setErrorMessage('No valid transactions provided');
  }

  // for now only support one tx provided
  const [tx] = unsingedTxs;
  if (!tx) {
    setErrorMessage('No valid transaction provided');
    console.error({ error: errorMessage });
  }

  const txAccounts = getAccountsForTx(accounts)(tx);
  const { signers, meta }: ICommandPayload = JSON.parse(tx.cmd);

  const signAccounts: OptimalTransactionsAccount[] = JSON.parse(
    signAccountsString || '[]',
  );

  const [plumbingTxs, setPlumbingTxs] = useState<IUnsignedCommand[]>();
  const { getAutoTransfers } = useAutoTransfers();

  useEffect(() => {
    Promise.all(
      signAccounts.flatMap((account) =>
        getAutoTransfers(
          account.networkId,
          account.accountName,
          account.requestedFungibles?.map(({ amount, fungible, target }) => ({
            amount,
            fungible,
            target: target || meta.chainId,
          })),
        ),
      ),
    )
      .then((allPlumbingTxs) => {
        setPlumbingTxs(allPlumbingTxs.flatMap((txs) => txs).filter((x) => !!x));
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error({ errorMessage: errorMessage, error });
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
      //TODO should be in try catch Error handling
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

    try {
      const txs = await Promise.all(
        signedPlumbingTxs!.map((tx) => l1Client.submit(tx)),
      );

      const accs = signAccounts.map((sAcc) => {
        const account = accounts.find(
          (acc) =>
            acc.accountName === sAcc.accountName &&
            acc.networkId === sAcc.networkId,
        );
        if (!account) {
          addNotification({
            variant: 'error',
            title: 'Account is not found',
          });
          throw new Error('Account is not found');
        }
        const newAccount = {
          ...account,
          txQueue: [...account.txQueue, ...txs],
        };
        setAccount(newAccount);
        return newAccount;
      });

      //TODO should be in try catch Error handling
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
    } catch (e: any) {
      addNotification({
        variant: 'error',
        title: 'There was a problem with the signing',
        message: e.message ?? '',
      });
    }
  };

  const onCancel = () => publishEvent('canceled:sign');

  const keys = txAccounts.accounts.flatMap((a) =>
    a.devices.flatMap((d) => d.guard.keys),
  );

  const plumbingKeys = txAccounts.accounts.flatMap(
    (a) => a.keyset?.keys.filter((k) => !k.startsWith('WEBAUTHN')) || [],
  );
  const plumbingSteps =
    plumbingTxs
      ?.map((tx, i) => {
        if (!tx) return null;
        const cmd: ICommandPayload = JSON.parse(tx.cmd);
        return {
          title: `Step ${i + 1}`,
          caps: getPermissions(plumbingKeys, cmd.signers),
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
    console.log({ txs });
    setSignedPlumbingTxs(txs);
  };
  const isReadyForSigning = () => {
    if (!plumbingTxs?.length) return true;
    return signedPlumbingTxs;
  };

  if (loading) {
    return <MainLoader />;
  }

  return (
    <CardFixedContainer>
      <SpireKeyCardContentBlock
        title="Permissions"
        description={getSubtitle(caps.size)}
      >
        <SignPlumbingTxs
          plumbingSteps={plumbingSteps}
          credentialId={txAccounts.accounts[0]?.devices[0]['credential-id']}
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
      <CardFooterGroup>
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
      </CardFooterGroup>
    </CardFixedContainer>
  );
}
