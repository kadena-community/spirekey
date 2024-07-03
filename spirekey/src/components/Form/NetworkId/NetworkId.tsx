import { SurfaceCard } from '@/components/SurfaceCard/SurfaceCard';
import { NetworkDevnet } from '@/components/icons/NetworkDevnet';
import { NetworkMainnet } from '@/components/icons/NetworkMainnet';
import { NetworkTestnet } from '@/components/icons/NetworkTestnet';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { getDevnetNetworkId } from '@/utils/shared/getDevnetNetworkId';
import { Box, Text } from '@kadena/kode-ui';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import * as styles from './styles.css';

const getDescription = (networkId: string) => {
  const dev = ' For development purposes only';

  return (
    <Text>
      <Text className={styles.descriptionEmphasis}>
        {getNetworkDisplayName(networkId)}
      </Text>{' '}
      selected.
      {['testnet04', 'fast-development', 'development'].includes(networkId)
        ? dev
        : ''}
    </Text>
  );
};

interface Props<T extends FieldValues> {
  networkId: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export default function NetworkId<T extends FieldValues>({
  register,
  networkId,
  name,
  error,
}: Props<T>) {
  return (
    <SurfaceCard
      title="Network"
      description={
        <>
          {getDescription(networkId)}
          {error && <Box style={{ color: 'red' }}>{error.message}</Box>}
        </>
      }
    >
      <div className={styles.itemContainer}>
        <div>
          <input
            {...register(name, {
              required: 'Please select a network',
            })}
            aria-label="Mainnet"
            type="radio"
            value="mainnet01"
            id="network-mainnet"
          />
          <label htmlFor="network-mainnet" className={styles.item}>
            <NetworkMainnet />
            <span>Mainnet</span>
          </label>
        </div>
        <div>
          <input
            {...register(name, {
              required: 'Please select a network',
            })}
            aria-label="Testnet"
            type="radio"
            value="testnet04"
            id="network-testnet"
          />
          <label htmlFor="network-testnet" className={styles.item}>
            <NetworkTestnet />
            <span>Testnet</span>
          </label>
        </div>
        <div>
          <input
            {...register(name, {
              required: 'Please select a network',
            })}
            aria-label="Devnet"
            type="radio"
            value={getDevnetNetworkId()}
            id="network-devnet"
          />
          <label htmlFor="network-devnet" className={styles.item}>
            <NetworkDevnet />
            <span>Devnet</span>
          </label>
        </div>
      </div>
    </SurfaceCard>
  );
}
