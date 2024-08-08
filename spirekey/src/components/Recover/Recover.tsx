'use client';

import { useAccounts } from '@/context/AccountsContext';
import { getRAccountFromChain } from '@/utils/shared/account';
import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { Button, Stack } from '@kadena/kode-ui';
import { token } from '@kadena/kode-ui/styles';
import { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';
import { startAuthentication } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import {
  CardContainer,
  CardContentBlock,
  CardFooter,
} from '../CardPattern/CardPattern';
import { NetworkDevnet } from '../icons/NetworkDevnet';
import { NetworkMainnet } from '../icons/NetworkMainnet';
import { NetworkTestnet } from '../icons/NetworkTestnet';
import * as styles from './styles.css';

const query = `query recover($filter: String) {
  events(
    qualifiedEventName: "${process.env.NAMESPACE}.spirekey.ADD_DEVICE"
    parametersFilter: $filter
    first: 1
  ) {
    totalCount
    edges {
      cursor
      node {
        chainId
        parameters
      }
    }
  }
}`;
type RecoverProps = {
  networkId?: string;
  chainId?: ChainId;
  onComplete?: (account: Account) => void;
  onCancel?: () => void;
};
export default function Recover(props: RecoverProps) {
  const { setAccount, accounts } = useAccounts();
  const router = useRouter();
  const onConnect = (account: Account) => {
    if (props.onComplete) return props.onComplete(account);
    router.push('/');
  };
  const onCancel = () => {
    if (props.onCancel) return props.onCancel();
    router.push('/');
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const network = data.get('network');
    if (!network) throw new Error('No network selected');
    const { id } = await startAuthentication({
      challenge: 'recoverchallenge',
      rpId: window.location.hostname,
    });
    const res = await fetch(`http://localhost:8080/graphql`, {
      method: 'POST',
      headers: {
        accept:
          'application/graphql-response+json, application/json, multipart/mixed',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        extensions: {},
        operationName: 'recover',
        query,
        variables: {
          filter: `{\"array_contains\":\"${id}\"}`,
        },
      }),
    });
    const info = (await res.json())?.data?.events?.edges?.[0]?.node?.parameters;
    if (!info) throw new Error('No account found');

    const params: string[] = JSON.parse(info);
    const account = params.find((x) => x.startsWith('r:'));
    const recoveredAccount = await getRAccountFromChain({
      networkId: network as string,
      chainId: Math.floor(Math.random() * 20).toString() as ChainId,
      accountName: account!,
    });
    if (!recoveredAccount) throw new Error('Account not found');
    const networkAccounts = accounts.filter((a) => a.networkId === network);

    const updatedAccount = {
      ...recoveredAccount,
      alias: `SpireKey Account ${networkAccounts.length + 1} (${network})`,
      chainIds: Array(20)
        .fill(0)
        .map((_, i) => i.toString()) as ChainId[],
    };
    setAccount(updatedAccount);
    onConnect(updatedAccount);
    // Redirect back to home screen, but publish the connect event first
  };
  return (
    <CardContainer>
      <form onSubmit={onSubmit}>
        <CardContentBlock
          title="Recover"
          description="by selecting a network irst"
          visual={
            <SpireKeyKdacolorLogoGreen
              aria-label="SpireKey"
              fontSize={token('typography.fontSize.9xl')}
            />
          }
        >
          <Stack flexDirection="row" gap="md">
            <input
              className={styles.networkInput}
              aria-label="Mainnet"
              type="radio"
              name="network"
              value="mainnet01"
              id="network-mainnet"
              defaultChecked={!props.networkId || props.networkId === 'mainnet01'}
            />
            <label htmlFor="network-mainnet" className={styles.networkLabel}>
              <NetworkMainnet />
              <Stack as="span" className={styles.networkLabelText}>
                Mainnet
              </Stack>
            </label>
            <input
              className={styles.networkInput}
              aria-label="Testnet"
              type="radio"
              name="network"
              value="testnet04"
              id="network-testnet"
              defaultChecked={props.networkId === 'testnet04'}
            />
            <label htmlFor="network-testnet" className={styles.networkLabel}>
              <NetworkTestnet />
              <Stack as="span" className={styles.networkLabelText}>
                Testnet
              </Stack>
            </label>
            <input
              className={styles.networkInput}
              aria-label="Devnet"
              type="radio"
              name="network"
              value="development"
              defaultChecked={props.networkId === 'development'}
              id="network-devnet"
            />
            <label htmlFor="network-devnet" className={styles.networkLabel}>
              <NetworkDevnet />
              <Stack as="span" className={styles.networkLabelText}>
                Devnet
              </Stack>
            </label>
          </Stack>
        </CardContentBlock>
        <CardFooter>
          <Button variant="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Next</Button>
        </CardFooter>
      </form>
    </CardContainer>
  );
}
