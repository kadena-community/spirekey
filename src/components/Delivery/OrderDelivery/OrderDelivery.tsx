import { Order } from '@/app/v1/example/delivery/useDelivery';
import { Order as OrderComponent } from '@/components/Order/Order';
import { Surface } from '@/components/Surface/Surface';
import { Account, useAccounts } from '@/context/AccountsContext';
import { getDeviceByPublicKey } from '@/utils/getDeviceByPublicKey';
import { Heading, Stack, SystemIcon, maskValue } from '@kadena/react-ui';
import { ICap, ISigner } from '@kadena/types';
import * as styles from './OrderDelivery.css';

interface Props {
  signers: ISigner[];
  order: Order;
  transaction?: any;
  account: any;
  message: any;
}

export function OrderDelivery({ signers, order, account, message }: Props) {
  const { accounts } = useAccounts();

  const publicKeys: string[] = signers.map((s: { pubKey: string }) => s.pubKey);

  const devices = publicKeys
    .filter((key) =>
      accounts.some((account: Account) =>
        account.devices.some((device) => device.guard.keys.includes(key)),
      ),
    )
    .map((publicKey) => getDeviceByPublicKey(accounts, publicKey));

  const availablePublicKeys = devices.reduce((keys: string[], device) => {
    return [...keys, ...(device?.guard.keys || [])];
  }, []);

  const currentSigners = signers.filter((signer) =>
    availablePublicKeys.includes(signer.pubKey),
  );

  const capabilitiesToSign = currentSigners.reduce(
    (capabilities: ICap[], signer: ISigner) => {
      return availablePublicKeys.includes(signer.pubKey)
        ? [...capabilities, ...(signer.clist || [])]
        : capabilities;
    },
    [],
  );

  const transferCapability = capabilitiesToSign.find((capability) =>
    capability.name.includes('webauthn-wallet.TRANSFER'),
  );

  return (
    <>
      <Surface>
        <Stack justifyContent="space-between" alignItems="flex-start">
          <Stack flexDirection="column" marginBlockEnd="md">
            <Heading variant="h5" color="emphasize">
              Order with value: ${' '}
              {Number(
                (transferCapability?.args[2] as { decimal: number })?.decimal,
              ).toFixed(2)}
            </Heading>
            <Heading variant="h6" color="emphasize">
              Courier: {maskValue(order.courier)}
            </Heading>
          </Stack>
          {order.status === 'IN_TRANSIT' && (
            <SystemIcon.Loading size="lg" className={styles.loader} />
          )}
          {order.status === 'DELIVERED' && <SystemIcon.Check size="lg" />}
        </Stack>
        <OrderComponent order={message} account={account} signers={signers} />
      </Surface>
    </>
  );
}
