import { deviceColors } from '@/styles/shared/tokens.css';
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
import { accountName } from './account-name';
import { accountQuery, useAccount } from './accounts';
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
  const { setAccount } = useAccount();
  const addDevice = async (networkId: string, accountName: string) => {
    const { data } = await mutate({
      variables: {
        networkId,
        accountName,
        chainId: '0',
      },
    });
    if (!data?.addDevice) throw new Error('Could not add device');
    const newAccount: Account = data.createWallet;
    setAccount(newAccount);
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
  const {
    credentialId,
    publicKey: passKey,
    deviceType,
  } = await getNewWebauthnKey(getRootkeyPasskeyName(networkId!));
  const {
    data: { account },
  } = await client.query({
    query: accountQuery,
    variables: {
      accountName,
      networkId,
    },
  });
  const txs = await Promise.all(
    Array(20)
      .fill(0)
      .map((_, i) => i.toString())
      .map((chainId) =>
        addDeviceOnChain({
          account,
          publicKey: getWebAuthnPubkeyFormat(passKey),
          credentialId,
          managerPublicKey: publicKey,
          managerSecretKey: secretKey,
          domain: window.location.hostname,
          deviceType,
          color: deviceColors.darkGreen,
          chainId: chainId as ChainId,
        }),
      ),
  );
  const newAccount = {
    ...account,
    txQueue: [...account.txQueue, ...txs],
  };
  return newAccount;
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
    .createTransaction();
  const signWithManager = signWithKeyPair({
    publicKey: managerPublicKey,
    secretKey: managerSecretKey,
  });
  const signedTx = signWithManager(tx);
  const res = await l1Client.local(signedTx, {
    preflight: true,
    signatureVerification: true,
  });
  if (res.result.status !== 'success') {
    console.error('Error while adding new device', res);
    throw new Error('Could not add device');
  }
  // return await l1Client.submit(signedTx as ICommand);
};
