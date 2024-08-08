'use client';

import { SpireKeyKdacolorLogoGreen } from '@kadena/kode-icons/product';
import { Button, Stack } from '@kadena/kode-ui';
import { token } from '@kadena/kode-ui/styles';
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

export default function Recover() {
  const router = useRouter();
  const onCancel = () => router.push('/');
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.warn('DEBUGPRINT[1]: Recover.tsx:22: event=', event);
    const data = new FormData(event.target as HTMLFormElement);
    const network = data.get('network');
    console.warn("DEBUGPRINT[2]: Recover.tsx:24: network=", network)
  };
  return (
    <CardContainer>
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
          <Stack flexDirection="row" gap="md">
            <input
              className={styles.networkInput}
              aria-label="Mainnet"
              type="radio"
              name="network"
              value="mainnet01"
              id="network-mainnet"
              defaultChecked
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
