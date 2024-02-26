import { useDelivery } from '@/app/v1/example/delivery/useDelivery';
import { useLoggedInAccount } from '@/app/v1/example/delivery/useLoggedInAccount';
import { Button } from '@/components/Button/Button';
import { Surface } from '@/components/Surface/Surface';
import { Account, useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { getDeviceByPublicKey } from '@/utils/getDeviceByPublicKey';
import { Box, Heading, Stack, SystemIcon, Text } from '@kadena/react-ui';
import { ChainId, ICap, ISigner } from '@kadena/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { products } from '../mock/products';
import * as styles from './AcceptedOrder.css';

interface Props {
  signers: ISigner[];
  orderId: string;
}

export function AcceptedOrder({ signers, orderId }: Props) {
  const { accounts } = useAccounts();
  const { account } = useLoggedInAccount();
  const router = useRouter();
  const { getReturnUrl } = useReturnUrl();

  const { markOrderAsReady } = useDelivery({
    chainId: process.env.CHAIN_ID as ChainId,
    networkId: process.env.DAPP_NETWORK_ID!,
  });

  const markAsReady = (orderId: string) => async () => {
    if (!account) return;
    const tx = await markOrderAsReady({
      orderId,
      merchantAccount: account?.accountName,
      merchantPublicKey: account?.credentials[0].publicKey,
    });
    router.push(
      `${process.env.WALLET_URL}/sign?transaction=${Buffer.from(
        JSON.stringify(tx),
      ).toString('base64')}&returnUrl=${getReturnUrl(
        '/v1/example/delivery/merchant',
      )}`,
    );
  };

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
        <Stack
          justifyContent="space-between"
          alignItems="center"
          marginBlockEnd="md"
        >
          <Heading variant="h5" color="emphasize">
            Order with value: ${' '}
            {Number(
              (transferCapability?.args[2] as { decimal: number }).decimal,
            ).toFixed(2)}
          </Heading>
          <Button variant="primary" onPress={markAsReady(orderId)}>
            Ready
          </Button>
        </Stack>
        <Stack flexDirection="column" gap="md">
          {orderLineCapabilities.map((capability, i) => (
            <Stack alignItems="center" gap="sm" key={i}>
              <Image
                className={styles.productImage}
                src={
                  products.find((product) =>
                    capability.args[1].toString().includes(product.name),
                  )?.image || ''
                }
                alt={capability.args[1].toString()}
              />
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
                  (capability.args[2] as { decimal: number }).decimal,
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
            {(deliveryCapability?.args[2] as { decimal: number })?.decimal && (
              <Heading
                variant="h6"
                as="h4"
                style={{ flexGrow: 1, textAlign: 'end' }}
              >
                ${' '}
                {Number(
                  (deliveryCapability?.args[2] as { decimal: number }).decimal,
                ).toFixed(2)}
              </Heading>
            )}
          </Stack>
        </Stack>
      </Surface>
    </>
  );
}
