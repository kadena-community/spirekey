import { useDelivery } from '@/app/v1/example/delivery/useDelivery';
import { useLoggedInAccount } from '@/app/v1/example/delivery/useLoggedInAccount';
import { Button } from '@/components/Button/Button';
import { Order } from '@/components/Order/Order';
import { Surface } from '@/components/Surface/Surface';
import { Account, useAccounts } from '@/context/AccountsContext';
import { useReturnUrl } from '@/hooks/useReturnUrl';
import { getDeviceByPublicKey } from '@/utils/getDeviceByPublicKey';
import { Heading, Stack, SystemIcon, Text } from '@kadena/react-ui';
import { ChainId, ICap, ISigner } from '@kadena/types';
import { useRouter } from 'next/navigation';

interface Props {
  signers: ISigner[];
  orderId: string;
  account: any;
  order: any;
}

export function AcceptedOrder({
  signers,
  orderId,
  order,
  account: loggedInAccount,
}: Props) {
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
        <Order signers={signers} account={loggedInAccount} order={order} />
      </Surface>
    </>
  );
}
