import { deviceColors } from '@/styles/shared/tokens.css';
import { getWebAuthnPubkeyFormat } from '@/utils/get-webauthn-pubkey-format';
import { getHostname } from '@/utils/getHostname';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { ApolloContextValue, gql, useLazyQuery } from '@apollo/client';
import { createTransactionBuilder } from '@kadena/client';
import { Account } from '@kadena/spirekey-types';
import { ChainId } from '@kadena/types';
import { accountQuery } from './accounts';

type AddDeviceVariable = {
  networkId: string;
  chainId: ChainId;
  accountName: string;
};
const addDeviceQuery = gql`
  query AddDeviceTxs(
    $networkId: String!
    $chainId: String!
    $accountName: String!
  ) {
    addDeviceTxs(
      networkId: $networkId
      chainId: $chainId
      accountName: $accountName
    ) @client
  }
`;
export const useAddDevice = () => {
  const [execute] = useLazyQuery(addDeviceQuery);
  const getAddDeviceTxs = async (networkId: string, accountName: string) => {
    const { data, error } = await execute({
      variables: {
        networkId,
        accountName,
      },
    });
    if (error) throw error;
    if (!data?.addDeviceTxs) throw new Error('Could not add device');
    const txs = data.addDeviceTxs;
    return txs;
  };
  return { getAddDeviceTxs };
};

export const addDeviceTxs = async (
  _: any,
  { networkId, accountName }: AddDeviceVariable,
  { client }: ApolloContextValue,
) => {
  if (!client) throw new Error('No client available');
  const {
    data: { account },
  } = await client.query({
    query: accountQuery,
    variables: {
      accountName,
      networkId,
    },
  });
  const {
    credentialId,
    publicKey: passKey,
    deviceType,
  } = await getNewWebauthnKey(account.alias);
  const txs = await Promise.all(
    Array(20)
      .fill(0)
      .map((_, i) => i.toString())
      .map((chainId) =>
        addDeviceOnChain({
          account,
          publicKey: getWebAuthnPubkeyFormat(passKey),
          credentialId,
          domain: `${window.location.protocol}//${getHostname()}`,
          deviceType,
          color: deviceColors.darkGreen,
          chainId: chainId as ChainId,
        }),
      ),
  );
  return txs;
};

const addDeviceOnChain = async ({
  account,
  publicKey,
  credentialId,
  domain,
  deviceType,
  color,
  chainId,
}: {
  account: Account;
  publicKey: string;
  credentialId: string;
  domain: string;
  deviceType: string;
  color: string;
  chainId: ChainId;
}) => {
  const guard: any = account.guard;
  if (!guard.keysetref || !account.keyset)
    throw new Error('No keysetref found');
  const [managerPublicKey] = account.keyset.keys.filter(
    (k) => !k.startsWith('WEBAUTHN'),
  );
  const { ksn, ns } = guard.keysetref;
  const tx = createTransactionBuilder()
    .execution(
      `(namespace "${ns}")
      (define-keyset "${ns}.${ksn}" (read-keyset 'kadena-keyset))
      (kadena.spirekey.add-device-pair
        "${account.accountName}"
        coin
        { 'guard          :  (read-keyset 'spirekey-keyset)
        , 'credential-id  :  "${credentialId}"
        , 'domain         :  "${domain}"
        , 'device-type    :  "${deviceType}"
        , 'color          :  "${color}"
        }
      )`.trim(),
    )
    .setMeta({
      chainId,
      senderAccount: account.accountName,
      gasLimit: 20_000,
      gasPrice: 0.000_000_1,
    })
    .addData('kadena-keyset', {
      keys: [...account.keyset.keys, publicKey],
      pred: 'keys-any',
    })
    .addData('spirekey-keyset', {
      keys: [publicKey],
      pred: 'keys-any',
    })
    .setNetworkId(account.networkId)
    .addSigner({ pubKey: managerPublicKey, scheme: 'ED25519' })
    .createTransaction();
  return tx;
};
