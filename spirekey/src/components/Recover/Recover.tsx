'use client';

import { useAccounts } from '@/context/AccountsContext';
import { useSettings } from '@/context/SettingsContext';
import { getGraphClient } from '@/utils/graphql';
import { getAccountFromChains } from '@/utils/shared/account';
import { Button, Stack } from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { token } from '@kadena/kode-ui/styles';
import { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';
import { startAuthentication } from '@simplewebauthn/browser';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from 'react-aria-components';
import SpireKeyKdacolorLogoGreen from '../icons/KdaLogoGreen';
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
    const network = (data.get('network') as string) || 'mainnet01';
    const { id } = await startAuthentication({
      challenge: 'recoverchallenge',
      rpId: window.location.hostname,
    });
    const res = await getGraphClient(network, query, {
      filter: `{\"array_contains\":\"${id}\"}`,
    });
    const info = res?.events?.edges?.[0]?.node?.parameters;
    if (!info) throw new Error('No account found');

    const params: string[] = JSON.parse(info);
    const account = params.find((x) => x.startsWith('r:'));
    const recoveredAccount = await getAccountFromChains({
      networkId: network,
      chainIds: Array(20)
        .fill(0)
        .map((_, i) => i.toString()) as ChainId[],
      accountName: account!,
    });
    if (!recoveredAccount) throw new Error('Account not found');
    const networkAccounts = accounts.filter((a) => a.networkId === network);

    const updatedAccount = {
      ...recoveredAccount,
      alias: `SpireKey Account ${networkAccounts.length + 1} (${network})`,
    };
    setAccount(updatedAccount);
    onConnect(updatedAccount);
    // Redirect back to home screen, but publish the connect event first
  };
  const { devMode } = useSettings();
  return (
    <CardFixedContainer>
      <form onSubmit={onSubmit}>
        <CardContentBlock
          title="Recover"
          description="by selecting a network first"
          visual={
            <SpireKeyKdacolorLogoGreen
              aria-label="SpireKey"
              fontSize={token('typography.fontSize.9xl')}
            />
          }
        >
          {devMode && (
            <RadioGroup name="network">
              <Stack flexDirection="row" gap="md">
                <Radio value="mainnet01" className={styles.networkLabel}>
                  <NetworkMainnet />
                  <Stack as="span" className={styles.networkLabelText}>
                    Mainnet
                  </Stack>
                </Radio>
                <Radio value="testnet04" className={styles.networkLabel}>
                  <NetworkTestnet />
                  <Stack as="span" className={styles.networkLabelText}>
                    Testnet
                  </Stack>
                </Radio>
                <Radio value="development" className={styles.networkLabel}>
                  <NetworkDevnet />
                  <Stack as="span" className={styles.networkLabelText}>
                    Devnet
                  </Stack>
                </Radio>
              </Stack>
            </RadioGroup>
          )}
        </CardContentBlock>
        <CardFooterGroup>
          <Button variant="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Next</Button>
        </CardFooterGroup>
      </form>
    </CardFixedContainer>
  );
}
