import { Order, useDelivery } from '@/app/v1/example/delivery/useDelivery';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink';
import { Surface } from '@/components/Surface/Surface';
import { Account, useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { getDeviceByPublicKey } from '@/utils/getDeviceByPublicKey';
import { getTranslations } from '@/utils/getTranslationBundle';
import { getSmartContractMeta } from '@/utils/smartContractMeta';
import { Box, Heading, Stack, SystemIcon, Text } from '@kadena/react-ui';
import { ChainId, ICap, ISigner } from '@kadena/types';
import Image from 'next/image';
import { products } from '../mock/products';
import * as styles from './ReadyForDelivery.css';

interface Props {
  signers: ISigner[];
  order: Order;
  transaction?: any;
}

export function ReadyForDelivery({ signers, order, transaction }: Props) {
  const { accounts } = useAccounts();
  const { getReturnUrl } = useReturnUrl();

  const { orders, markOrderAsReady, saveDelivery, updateOrders } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.DAPP_NETWORK_ID!,
  });

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

  const orderLineCapabilities = capabilitiesToSign.filter((capability) => {
    return (
      capability.name.includes('delivery.CREATE_ORDER_LINE') &&
      !capability.args.some((arg) => arg.toString() === 'Delivery')
    );
  });
  const deliveryCapability = capabilitiesToSign.find((capability) => {
    return (
      capability.name.includes('delivery.CREATE_ORDER_LINE') &&
      capability.args.some((arg) => arg.toString() === 'Delivery')
    );
  });
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
              Courier: {order.courier}
            </Heading>
          </Stack>
          {!transaction && (
            <SystemIcon.Loading size="lg" className={styles.loader} />
          )}
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
        <Stack flexDirection="column" gap="md">
          {orderLineCapabilities.map((capability, i) => (
            <Stack alignItems="center" gap="sm" key={i}>
              {products.find((product) =>
                capability.args[1].toString().includes(product.name),
              )?.image && (
                <Image
                  className={styles.productImage}
                  src={
                    products.find((product) =>
                      capability.args[1].toString().includes(product.name),
                    )?.image || ''
                  }
                  alt={capability.args[1].toString()}
                />
              )}
              <Box>
                <Heading variant="h6" as="h4">
                  {capability.args[1].toString()}
                </Heading>
              </Box>
              <Heading
                variant="h6"
                as="h4"
                style={{ flexGrow: 1, textAlign: 'end' }}
              >
                ${' '}
                {Number(
                  (capability.args[4] as { decimal: number }).decimal,
                ).toFixed(2)}
              </Heading>
            </Stack>
          ))}
          <Stack alignItems="center" gap="sm">
            <SystemIcon.MapMarker
              size="xl"
              style={{ marginInlineStart: '0.25rem' }}
            />
            <Box style={{ marginInlineStart: '0.5rem' }}>
              <Heading variant="h6" as="h4">
                Delivery
              </Heading>
            </Box>
            {(deliveryCapability?.args[4] as { decimal: number })?.decimal && (
              <Heading
                variant="h6"
                as="h4"
                style={{ flexGrow: 1, textAlign: 'end' }}
              >
                ${' '}
                {Number(
                  (deliveryCapability?.args[4] as { decimal: number })
                    ?.decimal || '0',
                ).toFixed(2)}
              </Heading>
            )}
          </Stack>
        </Stack>
      </Surface>
    </>
  );
}
