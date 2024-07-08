import { MonoLoading } from '@kadena/kode-icons/system';
import { Heading, Stack } from '@kadena/kode-ui';
import { ICap, ISigner } from '@kadena/types';

import { ConnectAccount } from '@/app/(examples)/v1/example/delivery/components/AccountButton';
import { Order as OrderComponent } from '@/app/(examples)/v1/example/delivery/components/Order/Order';
import { Order } from '@/app/(examples)/v1/example/delivery/useDelivery';
import { Surface } from '@/components/Surface/Surface';
import { ButtonLink } from '@/components/shared/ButtonLink/ButtonLink';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { getTranslations } from '@/utils/shared/getTranslationBundle';
import { getSmartContractMeta } from '@/utils/shared/smartContractMeta';

import * as styles from './ReadyForDelivery.css';

interface Props {
  signers: ISigner[];
  order: Order;
  transaction?: any;
  account: ConnectAccount;
  message: any;
}

export function ReadyForDelivery({
  signers,
  order,
  transaction,
  account,
  message,
}: Props) {
  const { getReturnUrl } = useReturnUrl();

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
            <Heading variant="h5">
              Order with value: ${' '}
              {Number(
                (transferCapability?.args[2] as { decimal: number })?.decimal,
              ).toFixed(2)}
            </Heading>
            <Heading variant="h6">Courier: {order.courier}</Heading>
          </Stack>
          {!transaction && <MonoLoading className={styles.loader} />}
          {transaction && (
            <ButtonLink
              href={`${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
                JSON.stringify(transaction),
              ).toString('base64')}&returnUrl=${getReturnUrl(
                '/v1/example/delivery/merchant',
              )}&meta=${Buffer.from(
                JSON.stringify(getSmartContractMeta()),
              ).toString('base64')}&translations=${Buffer.from(
                JSON.stringify(getTranslations()),
              ).toString('base64')}`}
            >
              Hand off
            </ButtonLink>
          )}
        </Stack>
        <OrderComponent order={message} signers={signers} account={account} />
      </Surface>
    </>
  );
}
