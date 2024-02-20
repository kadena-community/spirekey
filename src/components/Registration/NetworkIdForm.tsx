import { NetworkDevnet } from '@/components/icons/NetworkDevnet';
import { NetworkMainnet } from '@/components/icons/NetworkMainnet';
import { NetworkTestnet } from '@/components/icons/NetworkTestnet';
import { getDevnetNetworkId } from '@/utils/getDevnetNetworkId';
import { getNetworkDisplayName } from '@/utils/getNetworkDisplayName';
import { Text } from '@kadena/react-ui';
import { AnimatePresence, motion } from 'framer-motion';
import { SurfaceCard } from '../SurfaceCard/SurfaceCard';
import { FormData, FormUtils } from './Registration';
import { descriptionEmphasis, item, itemContainer } from './styles.css';

type Props = Pick<FormData, 'networkId'> & FormUtils;

const getDescription = (networkId: string) => {
  const dev = ' For development purposes only';
  const main = ' WebAuthn wallets are not yet supported on Mainnet';

  return (
    <Text>
      <Text className={descriptionEmphasis}>
        {getNetworkDisplayName(networkId)}
      </Text>{' '}
      selected.
      {['testnet04', getDevnetNetworkId()].includes(networkId) ? dev : main}
    </Text>
  );
};

export function NetworkIdForm({ networkId, updateFields, direction }: Props) {
  const xPositionMultiplier = direction === 'forward' ? 1 : -1;

  return (
    <AnimatePresence>
      <motion.div
        key="register-step-network-id"
        initial={{ x: 300 * xPositionMultiplier, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300 * xPositionMultiplier, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SurfaceCard title="Network" description={getDescription(networkId)}>
          <div className={itemContainer}>
            <div>
              <input
                aria-label="Mainnet"
                type="radio"
                value="mainnet01"
                id="network-mainnet"
                name="networkId"
                checked={networkId === 'mainnet01'}
                onChange={(event) =>
                  updateFields({ networkId: event.target.value })
                }
              />
              <label htmlFor="network-mainnet" className={item}>
                <NetworkMainnet />
              </label>
            </div>
            <div>
              <input
                aria-label="Testnet"
                type="radio"
                value="testnet04"
                id="network-testnet"
                name="networkId"
                checked={networkId === 'testnet04'}
                onChange={(event) =>
                  updateFields({ networkId: event.target.value })
                }
              />
              <label htmlFor="network-testnet" className={item}>
                <NetworkTestnet />
              </label>
            </div>
            <div>
              <input
                aria-label="Devnet"
                type="radio"
                value={getDevnetNetworkId()}
                id="network-devnet"
                name="networkId"
                checked={networkId === getDevnetNetworkId()}
                onChange={(event) =>
                  updateFields({ networkId: event.target.value })
                }
              />
              <label htmlFor="network-devnet" className={item}>
                <NetworkDevnet />
              </label>
            </div>
          </div>
        </SurfaceCard>
      </motion.div>
    </AnimatePresence>
  );
}
