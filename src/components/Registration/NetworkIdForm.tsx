import { Text } from "@kadena/react-ui";
import { SurfaceCard } from "../SurfaceCard/SurfaceCard";
import { NetworkDevnet } from '@/components/icons/NetworkDevnet';
import { NetworkMainnet } from '@/components/icons/NetworkMainnet';
import { NetworkTestnet } from '@/components/icons/NetworkTestnet';
import { getNetworkDisplayName } from "@/utils/getNetworkDisplayName";
import { descriptionEmphasis, item, itemContainer } from "./steps.css";
import { FormData, FormMethods } from "./Registration";

type Props = Pick<FormData, 'networkId'> & FormMethods;

const getDescription = (networkId: string) => {
  const dev = ' For development purposes only';
  const main = ' WebAuthn wallets are not yet supported on Mainnet';

  return (
    <Text>
      <Text className={descriptionEmphasis}>
        {getNetworkDisplayName(networkId)}
      </Text>{' '}
      selected.
      {['testnet04', 'fast-development'].includes(networkId)
        ? dev
        : main}
    </Text>
  );
};

export function NetworkIdForm({networkId, updateFields}: Props) {
  return (
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
            onChange={event => updateFields({networkId: event.target.value})}
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
            onChange={event => updateFields({networkId: event.target.value})}
          />
          <label htmlFor="network-testnet" className={item}>
            <NetworkTestnet />
          </label>
        </div>
        <div>
          <input
            aria-label="Devnet"
            type="radio"
            value="fast-development"
            id="network-devnet"
            name="networkId"
            checked={networkId === 'fast-development'}
            onChange={event => updateFields({networkId: event.target.value})}
          />
          <label htmlFor="network-devnet" className={item}>
            <NetworkDevnet />
          </label>
        </div>
      </div>
    </SurfaceCard>
  )
}