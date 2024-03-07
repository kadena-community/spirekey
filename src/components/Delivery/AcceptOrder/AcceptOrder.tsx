import { LoginAccount } from '@/components/AccountButton';
import { ButtonLink } from '@/components/ButtonLink/ButtonLink';
import { Order } from '@/components/Order/Order';
import { Surface } from '@/components/Surface/Surface';
import { Heading, Stack } from '@kadena/react-ui';
import { ICap, ISigner } from '@kadena/types';

interface Props {
  signers: ISigner[];
  signingLink: string;
  account: LoginAccount;
  order: any;
}

export function AcceptOrder({ signers, signingLink, account, order }: Props) {
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
          <ButtonLink variant="primary" href={signingLink}>
            Accept
          </ButtonLink>
        </Stack>
        <Order order={order} signers={signers} account={account} />
      </Surface>
    </>
  );
}
