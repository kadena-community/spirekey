import {
  gasStation,
  genesisPrivateKey,
  genesisPubKey,
} from '@/utils/constants';
import { getWebAuthnPubkeyFormat } from '@/utils/get-webauthn-pubkey-format';
import { l1Client } from '@/utils/shared/client';
import { getNewWebauthnKey } from '@/utils/webauthnKey';
import { ApolloContextValue, gql, useMutation } from '@apollo/client';
import {
  addSignatures,
  createTransactionBuilder,
  ITransactionDescriptor,
} from '@kadena/client';
import { sign } from '@kadena/cryptography-utils';
import { ChainId, ICommand } from '@kadena/types';
import { getAccountNameQuery } from './account-name';

type CreateAccountVariables = {
  networkId: string;
  publicKey: string;
  secretKey: string;
  alias: string;
  domain: string;
  color: string;
};
export const createAccount = async (
  _: any,
  {
    networkId,
    publicKey,
    secretKey,
    alias,
    color,
    domain,
  }: CreateAccountVariables,
  { client }: ApolloContextValue,
) => {
  if (!client) throw new Error('No client available');
  const {
    publicKey: passKey,
    deviceType,
    credentialId,
  } = await getNewWebauthnKey(alias);
  const account = {
    networkId,
    credentialId,
    deviceType,
    alias,
    color,
    domain,
    credentialPubkey: publicKey,
  };
  const {
    data: { name: accountName, guard },
  } = await client.query({
    query: getAccountNameQuery,
    variables: {
      hdWalletKey: publicKey,
      passKey,
      networkId,
    },
  });
  const pendingTxs = await registerAccounts({
    ...account,
    accountName,
    publicKey,
    secretKey,
  });
  return {
    accountName,
    guard,
    networkId,
    balance: '0.0',
    alias,
    chainIds: Array(20)
      .fill(1)
      .map((_, i) => i.toString()) as ChainId[],
    minApprovals: 1,
    minRegistrationApprovals: 1,
    devices: [
      {
        color,
        deviceType,
        domain,
        guard: {
          keys: [getWebAuthnPubkeyFormat(publicKey)],
          pred: 'keys-any',
        },
        'credential-id': credentialId,
      },
    ],
    txQueue: pendingTxs,
  };
};
const createAccountMutation = gql`
  mutation CreateAccount(
    $networkId: String
    $publicKey: String
    $secretKey: String
    $alias: String
    $domain: String
    $color: String
  ) {
    createAccount(
      networkId: $networkId
      publicKey: $publicKey
      secretKey: $secretKey
      alias: $alias
      domain: $domain
      color: $color
    ) @client
  }
`;
export const useCreateAccount = () => {
  const [mutate] = useMutation(createAccountMutation);
  const createAccount = async (variables: CreateAccountVariables) => {
    const { data } = await mutate({ variables });
    if (!data?.createAccount) throw new Error('Account creation failed');
    return data.createAccount;
  };
  return {
    createAccount,
  };
};

type AccountRegistration = {
  accountName: string;
  alias: string;
  color: string;
  deviceType: string;
  domain: string;
  credentialId: string;
  credentialPubkey: string;
  networkId: string;
  chainId?: ChainId;
};
const registerAccounts = async ({
  accountName,
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  networkId,
  publicKey,
  secretKey,
}: Omit<AccountRegistration, 'alias'> & {
  publicKey: string;
  secretKey: string;
}) => {
  const txDescriptions = await Promise.all(
    Array(20)
      .fill(1)
      .map((_, i) =>
        registerAccountOnChain({
          accountName,
          color,
          deviceType,
          domain,
          credentialId,
          credentialPubkey,
          networkId,
          chainId: i.toString() as ChainId,
          publicKey,
          secretKey,
        }),
      ),
  );
  return txDescriptions; // now can be registered on the account txQueue
};

const registerAccountOnChain = async ({
  color,
  deviceType,
  domain,
  credentialId,
  credentialPubkey,
  networkId,
  publicKey,
  secretKey,
  chainId = process.env.CHAIN_ID,
}: Omit<AccountRegistration, 'alias'> & {
  publicKey: string;
  secretKey: string;
}): Promise<ITransactionDescriptor> => {
  const tx = createTransactionBuilder()
    .execution(
      `
    (let* (
      (ns-name (ns.create-principal-namespace (read-keyset 'ns-keyset)))
      (ks-ref-name (format "{}.{}" [ns-name 'kadena]))
    )
      (define-namespace
        ns-name
        (read-keyset 'ns-keyset )
        (read-keyset 'ns-keyset )
      )
      (namespace ns-name)
      (define-keyset ks-ref-name
        (read-keyset 'ns-keyset)
      )
      (let (
        (account (create-principal (keyset-ref-guard ks-ref-name)))
      )
        (coin.create-account
          account
          (keyset-ref-guard ks-ref-name)
        )
        (kadena.spirekey.add-device-pair
          account
          coin
          { 'guard          :  (read-keyset 'spirekey-keyset)
          , 'credential-id  :  "${credentialId}"
          , 'domain         :  "${domain}"
          , 'device-type    :  "${deviceType}"
          , 'color          :  "${color}"
          }
        )
      )
    ) 
  `,
    )
    .addData('ns-keyset', {
      keys: [getWebAuthnPubkeyFormat(credentialPubkey), publicKey],
      pred: 'keys-any',
    })
    .addData('spirekey-keyset', {
      keys: [getWebAuthnPubkeyFormat(credentialPubkey)],
      pred: 'keys-any',
    })
    // Sign unrestricted with the temp pubkey
    .addSigner({ pubKey: publicKey, scheme: 'ED25519' })
    .addSigner({ pubKey: genesisPubKey, scheme: 'ED25519' }, (withCap) => [
      withCap('coin.GAS'),
      withCap(`kadena.spirekey.GAS_PAYER`, gasStation, { int: 1 }, 1),
    ])
    .setMeta({
      chainId,
      gasLimit: 1800,
      gasPrice: 0.0000001,
      senderAccount: gasStation,
    })
    .setNetworkId(networkId)
    .createTransaction();

  const signedTx = [
    { publicKey, secretKey },
    { publicKey: genesisPubKey, secretKey: genesisPrivateKey },
  ].reduce((unsignedTx, keyPair) => {
    return addSignatures(
      unsignedTx,
      sign(unsignedTx.cmd, keyPair) as { sig: string },
    );
  }, tx) as ICommand;
  return await l1Client.submit(signedTx);
};
