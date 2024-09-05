'use client';

import { useSettings } from '@/context/SettingsContext';
import { useRecoverAccount } from '@/resolvers/recover-account';
import { Button, Heading, Stack, Text } from '@kadena/kode-ui';
import {
  CardContentBlock,
  CardFixedContainer,
  CardFooterGroup,
} from '@kadena/kode-ui/patterns';
import { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';
import { useRouter } from 'next/navigation';
import { Radio, RadioGroup } from 'react-aria-components';
import { NetworkDevnet } from '../icons/NetworkDevnet';
import { NetworkMainnet } from '../icons/NetworkMainnet';
import { NetworkTestnet } from '../icons/NetworkTestnet';
import * as styles from './styles.css';

const _query = `query recover($filter: String) {
  events(
    qualifiedEventName: "kadena.spirekey.ADD_DEVICE"
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
  const router = useRouter();
  const onConnect = (account: Account) => {
    if (props.onComplete) return props.onComplete(account);
    router.push('/');
  };
  const onCancel = () => {
    if (props.onCancel) return props.onCancel();
    router.push('/');
  };
  const { recoverAccount } = useRecoverAccount();
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const searchParams = new URLSearchParams(location.search);
    const network =
      (data.get('network') as string) ||
      searchParams.get('networkId') ||
      'mainnet01';
    const account = await recoverAccount(network);
    onConnect(account);
    // Redirect back to home screen, but publish the connect event first
  };
  const { devMode } = useSettings();
  return (
    <CardFixedContainer>
      <form onSubmit={onSubmit}>
        {devMode && (
          <CardContentBlock
            title="Recover"
            description="by selecting a network first"
          >
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
          </CardContentBlock>
        )}
        {!devMode && (
          <CardContentBlock
            title="Recover"
            description="by selecting a passkey"
          >
            <Heading>Select Account Passkey</Heading>
            <Text>
              Please select the passkey you used to create an account.
            </Text>
          </CardContentBlock>
        )}
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
