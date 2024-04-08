import { ConnectAccount } from '@/app/(examples)/v1/example/delivery/components/AccountButton';
import { Order } from '@/app/(examples)/v1/example/delivery/components/Order/Order';
import { useDelivery } from '@/app/(examples)/v1/example/delivery/useDelivery';
import { Surface } from '@/components/Surface/Surface';
import { Button } from '@/components/shared/Button/Button';
import { useReturnUrl } from '@/hooks/shared/useReturnUrl';
import { Heading, Stack, SystemIcon, Text } from '@kadena/react-ui';
import { ChainId, ICap, ISigner } from '@kadena/types';
import { useRouter } from 'next/navigation';

interface Props {
  signers: ISigner[];
  orderId: string;
  account: ConnectAccount;
  order: any;
}

export function AcceptedOrder({ signers, orderId, order, account }: Props) {
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
        <Stack
          justifyContent="space-between"
          alignItems="center"
          marginBlockEnd="md"
        >
          <Heading variant="h5" color="emphasize">
            Order with value: ${' '}
            {Number(
              (transferCapability?.args[2] as { decimal: number })?.decimal,
            ).toFixed(2)}
          </Heading>
          <Button variant="primary" onPress={markAsReady(orderId)}>
            Ready
          </Button>
        </Stack>
        <Order signers={signers} account={account} order={order} />
      </Surface>
    </>
  );
}
