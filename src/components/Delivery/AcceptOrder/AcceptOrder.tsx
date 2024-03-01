import { ButtonLink } from '@/components/ButtonLink/ButtonLink';
import { Capability } from '@/components/Capability/Capability';
import { Surface } from '@/components/Surface/Surface';
import { Account, useAccounts } from '@/context/AccountsContext';
import { getDeviceByPublicKey } from '@/utils/getDeviceByPublicKey';
import { getTranslations } from '@/utils/getTranslationBundle';
import { getSmartContractMeta } from '@/utils/smartContractMeta';
import { Box, Heading, Stack, SystemIcon } from '@kadena/react-ui';
import { ICap, ISigner } from '@kadena/types';
import Image from 'next/image';
import { products } from '../mock/products';
import * as styles from './AcceptOrder.css';

interface Props {
  signers: ISigner[];
  signingLink: string;
  account: any;
  order: any;
}

export function AcceptOrder({ signers, signingLink, account, order }: Props) {
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

  const pubkeysForTx = account.credentials.flatMap(
    (credential: any) => credential.publicKey,
  );

  const merchantCaps = signers
    .filter((signer: { pubKey: string }) =>
      pubkeysForTx.includes(signer.pubKey),
    )
    .map((signer) => ({
      signer,
      account: accounts.find((account) =>
        account.devices.some((device) =>
          device.guard.keys.includes(signer.pubKey),
        ),
      ),
    }))
    .filter((signer) => !!signer.account && !!signer.signer)
    .map(({ signer, account }) => {
      const capabilities = signer.clist?.filter((capability: ICap) =>
        capability.name.includes('CREATE_ORDER_LINE'),
      );
      return {
        signer,
        account,
        capabilities,
      };
    });

  console.log(order);

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
        {merchantCaps.flatMap(
          (m) =>
            m.capabilities?.map((c) => (
              <Capability
                key={c.name + c.args.join(',')}
                capability={c}
                metaData={getSmartContractMeta()}
                translations={getTranslations(order.customTranslations || {})}
                type="granter"
              />
            )) || [],
        )}
      </Surface>
    </>
  );
}
