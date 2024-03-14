import { ConnectAccount } from '@/app/v1/example/delivery/components/AccountButton';
import { Order as OrderComponent } from '@/app/v1/example/delivery/components/Order/Order';
import { Order } from '@/app/v1/example/delivery/useDelivery';
import { Surface } from '@/components/Surface/Surface';
import { Heading, Stack, SystemIcon, maskValue } from '@kadena/react-ui';
import { ICap, ISigner } from '@kadena/types';
import * as styles from './OrderDelivery.css';

interface Props {
  signers: ISigner[];
  order: Order;
  transaction?: any;
  account: ConnectAccount;
  message: any;
}

export function OrderDelivery({ signers, order, account, message }: Props) {
  const availablePublicKeys =
    account.credentials.map((credential) => credential.publicKey) || [];

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
