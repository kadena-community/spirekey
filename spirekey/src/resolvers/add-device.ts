import {
  gasStation,
  genesisPrivateKey,
  genesisPubKey,
} from '@/utils/constants';
import { getWebAuthnPubkeyFormat } from '@/utils/get-webauthn-pubkey-format';
import { getRootkeyPasskeyName } from '@/utils/getNetworkDisplayName';
import { l1Client } from '@/utils/shared/client';
import { signWithKeyPair } from '@/utils/signSubmitListen';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { ApolloContextValue, gql, useMutation } from '@apollo/client';
import { createTransactionBuilder } from '@kadena/client';
import { Account } from '@kadena/spirekey-types';
import { ChainId, ICommand } from '@kadena/types';
import { accountQuery } from './accounts';
import { connectWalletQuery } from './connect-wallet';

type AddDeviceVariable = {
  networkId: string;
  chainId: ChainId;
  accountName: string;
};
const getAddDeviceMutation = gql`
  mutation AddDevice(
    $networkId: String!
    $chainId: String!
    $accountName: String!
  ) {
    addDevice(
      networkId: $networkId
      chainId: $chainId
      accountName: $accountName
    ) @client
  }
`;
export const useAddDevice = () => {
  const [mutate] = useMutation(getAddDeviceMutation);
  const addDevice = async (networkId: string, accountName: string) => {
    const { data } = await mutate({
      variables: {
        networkId,
        accountName,
        chainId: '0',
      },
    });
    if (!data?.addDevice) throw new Error('Could not add device');
    return data.createWallet;
  };
  return { addDevice };
};

export const addDevice = async (
  _: any,
  { networkId, chainId, accountName }: AddDeviceVariable,
  { client }: ApolloContextValue,
) => {
  if (!client) throw new Error('No client available');
  const {
    data: {
      connectWallet: { publicKey, secretKey },
    },
  } = await client.query({
    query: connectWalletQuery,
    variables: { networkId },
  });
  const { credentialId, publicKey: passKey } = await getNewWebauthnKey(
    getRootkeyPasskeyName(networkId!),
  );
  const {
    data: { account },
  } = await client.query({
    query: accountQuery,
    variables: {
      accountName,
      networkId,
    },
  });
  console.warn('DEBUGPRINT[3]: add-device.ts:87: account=', account);
  await addDeviceOnChain({
    account,
    publicKey: getWebAuthnPubkeyFormat(passKey),
    credentialId,
    managerPublicKey: publicKey,
    managerSecretKey: secretKey,
    domain: window.location.hostname,
    deviceType: 'webauthn',
    color: '#000000',
    chainId: '0',
  });
};

const addDeviceOnChain = async ({
  account,
  publicKey,
  managerPublicKey,
  managerSecretKey,
  credentialId,
  domain,
  deviceType,
  color,
  chainId,
}: {
  account: Account;
  publicKey: string;
  managerPublicKey: string;
  managerSecretKey: string;
  credentialId: string;
  domain: string;
  deviceType: string;
  color: string;
  chainId: ChainId;
}) => {
  const guard: any = account.guard;
  if (!guard.keysetref) throw new Error('No keysetref found');
  const { ksn, ns } = guard.keysetref;
  const tx = createTransactionBuilder()
    .execution(
      `(let (
        (ns-name "${ns}")
        (ks-ref-name "${ns}.${ksn}")
      )
      (namespace ns-name)
      (define-keyset ks-ref-name (read-keyset 'kadena-keyset))
      (kadena.spirekey.add-device-pair
        "${account.accountName}"
        coin
        { 'guard          :  (read-keyset 'spirekey-keyset)
        , 'credential-id  :  "${credentialId}"
        , 'domain         :  "${domain}"
        , 'device-type    :  "${deviceType}"
        , 'color          :  "${color}"
        }
      ))`.trim(),
    )
    .setMeta({
      chainId,
      senderAccount: gasStation,
      gasLimit: 1800,
      gasPrice: 0.000_000_1,
    })
    .addData('kadena-keyset', {
      keys: [
        managerPublicKey,
        ...account.devices.flatMap((d) => d.guard.keys),
        publicKey,
      ],
      pred: 'keys-any',
    })
    .addData('spirekey-keyset', {
      keys: [publicKey],
      pred: 'keys-any',
    })
    .setNetworkId(account.networkId)
    .addSigner({ pubKey: managerPublicKey, scheme: 'ED25519' })
    .addSigner({ pubKey: genesisPubKey, scheme: 'ED25519' }, (withCap) => [
      withCap(
        'kadena.spirekey.GAS_PAYER',
        account.accountName,
        { int: '1' },
        { decimal: '1' },
      ),
    ])
    .createTransaction();
  const signWithManager = signWithKeyPair({
    publicKey: managerPublicKey,
    secretKey: managerSecretKey,
  });
  const signWithGenesis = signWithKeyPair({
    publicKey: genesisPubKey,
    secretKey: genesisPrivateKey,
  });
  const signedTx = signWithManager(signWithGenesis(tx));
  const res = await l1Client.local(signedTx, {
    preflight: true,
    signatureVerification: true,
  });
  if (res.result.status !== 'success') {
    console.error('Error while adding new device', res);
    throw new Error('Could not add device');
  }
  return await l1Client.submit(signedTx as ICommand);
};
